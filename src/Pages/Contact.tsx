import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { makeRequestPut } from "../Hooks/makeRequest";
import { showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";

export default function Contact() {
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const {user}=useAuth();

    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (!subject || !message) {
            setError("Wszystkie pola są wymagane.");
            showErrorMessage("Wszystkie pola są wymagane.");
            return;
        }

        const payload :IProblemsAndQuestionsModel = {
            title: subject,
            message: message,
            answer:null
        };

        makeRequestPut(`/UserPanel/Contact`, 
            user?.accessToken as string,
            payload,
            (error, data) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                showSuccessMessage("Zgłoszenie zostało wysłane pomyślnie!");
                setTimeout(() => {
                    window.location.href = "/HomeScreen";
                }, 2000);
            }
          );
    };

    return (
        <div className="flex h-screen justify-center bg-gray-100">
            <div id="drawer-contact" className="p-4 bg-white w-[80%] mb-10 mt-20 dark:bg-gray-800 rounded-lg shadow-lg">
                <h5 id="drawer-label" className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
                    <svg className="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                    Napisz Do Nas
                </h5>

                <form className="mb-6" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Twój Email</label>
                        <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="jankowalski@mail.com"
                            value={user?.email}
                            disabled
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Temat</label>
                        <input
                            type="text"
                            id="subject"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Napisz w czym możemy Ci pomóc"
                            required
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Wiadomość</label>
                        <textarea
                            id="message"
                            rows={4}
                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Twoja wiadomość..."
                            required
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>

                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {success && <p className="text-green-500 mb-4">Zgłoszenie zostało wysłane pomyślnie!</p>}

                    <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 w-full focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block"
                    >
                        Wyślij
                    </button>
                </form>

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <a href="mailto:ticketswapp@mail.com" className="hover:underline">ticketswapp@mail.com</a>
                </p>
            </div>
        </div>
    );
}
