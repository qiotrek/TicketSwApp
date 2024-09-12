import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { hideLoadingMessage, resolveErrorLoadingMessage, resolveSuccessLoadingMessage, showErrorMessage, showLoadingMessage } from '../Hooks/useAlert';
import { ToastContainer } from 'react-toastify';
import decodeJwt from '../Hooks/decodeJwt';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSpinner from '../Hooks/useSpinner';
import { makeRequestGet, makeRequestPost } from '../Hooks/makeRequest';
import { getItem } from '../Hooks/useLocalStorage';
import { useAuth } from '../context/AuthContext';
import { RoutingSettings } from '../RoutingSettings';

function Login() {
  const loadingSpinner = useSpinner();
  const [googleClientId, setGoogleClientId] = useState<string | null>(null);
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  useEffect(() => {
    if (user) {
      const prevLocation = getItem('prevLocation');
      if (prevLocation !== null) {
        navigate(prevLocation);
        return;
      }
      const filteredRoutingSettings = RoutingSettings.filter((item) => {
        return item.children.some((child) => child.roles.includes(user?.role as string));
      })
      navigate(filteredRoutingSettings[0].children[0].path);
    } else {
      makeRequestGet('/.authClients', 'login', (error, data) => {
        if (error) {
          showErrorMessage('Wystąpił błąd: ' + error.message);
          setGoogleClientId('');
          return;
        }
        const googleClientId: string = data.filter(function (x: { clientType: string; }) { return x.clientType === "Google"; })[0].clientId;
        setGoogleClientId(googleClientId);
      })
    }
  }, [navigate, user])

  const handleLoginRequest = (credential: string) => {
    const loginLoadingId = showLoadingMessage("Logowanie w trakcie...");
    makeRequestPost('/.auth', 'login', { token: credential, TokenType: 'Google' }, (error, data) => {
      if (error) {
        if (error) {
          if (error.status === 403) {
            hideLoadingMessage(loginLoadingId);
            setShowRegistrationModal(true);
          } else {
            resolveErrorLoadingMessage(loginLoadingId, "Wystąpił błąd: " + error.message);
          }
          return;
        }
      }
      resolveSuccessLoadingMessage(loginLoadingId, "Zalogowano!");
      const { picture } = decodeJwt(credential);
      login({ ...data, picture });
    })
  };

  const handleRegister = (credential: string) => {
    const registerLoadingId = showLoadingMessage("Rejestracja w trakcie...");
    makeRequestPost('/.auth/register', 'register', { token: credential, TokenType: 'Google' }, (error, data) => {
      if (error) {
        resolveErrorLoadingMessage(registerLoadingId, "Wystąpił błąd: " + error.message);
        return;
      }
      resolveSuccessLoadingMessage(registerLoadingId, "Zarejestrowano pomyślnie!");
      const { picture } = decodeJwt(credential);
      login({ ...data, picture });
      setShowRegistrationModal(false);
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          {/* <img className="w-64 mr-2" src={""} alt="logo" /> */}
          TicketSwaap
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">
            <h1
              className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Zaloguj się na swoje konto
            </h1>
            {googleClientId === null && loadingSpinner}
            {googleClientId != null && <GoogleOAuthProvider clientId={googleClientId}>
              <div style={{ textAlign: '-webkit-center' as CanvasTextAlign }}>
                <GoogleLogin
                  logo_alignment='center'
                  type='standard'
                  theme='outline'
                  size='large'
                  onSuccess={credentialResponse => {
                    handleLoginRequest(credentialResponse.credential as string);
                  }}
                  onError={() => {
                    showErrorMessage("Błąd logowania");
                  }}
                />
              </div>
            </GoogleOAuthProvider>
            }
          </div>
        </div>
      </div>
      {showRegistrationModal && (
        <div className="opacity-100 bg-black h-screen w-screen top-0 left-0 fixed z-50 bg-opacity-90 dark:bg-opacity-90 inset-0 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Nie masz jeszcze konta
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Aby utworzyć konto, prosimy o zaakceptowanie regulaminu.
            </p>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="terms"
                className="mr-2"
                checked={termsAccepted}
                onChange={() => setTermsAccepted(!termsAccepted)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-300">
                Akceptuję regulamin
              </label>
            </div>
            <button
              className={`w-full px-4 py-2 text-white font-bold rounded ${termsAccepted ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
              disabled={!termsAccepted}
              onClick={() => handleRegister(googleClientId as string)}
            >
              Zarejestruj
            </button>
            <button
              className="w-full mt-2 px-4 py-2 text-gray-700 dark:text-gray-300 font-bold rounded border border-gray-300"
              onClick={() => setShowRegistrationModal(false)}
            >
              Anuluj
            </button>
          </div>
        </div>
      )}
    </div>
  );

}

export default Login