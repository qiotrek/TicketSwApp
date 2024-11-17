import React, { useEffect, useState } from "react";
import { makeRequestDelete, makeRequestGet, makeRequestPatch, makeRequestPost } from "../Hooks/makeRequest";
import { useAuth } from "../context/AuthContext";
import { showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";
import { ActiveAction, OffertModel } from "../context/Interfaces";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modals/Modal";

export default function MyAccount() {
  const { user } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [favActions, setFavActions] = useState<ActiveAction[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showOffertsModal,setShowOffertsModal] =useState<boolean>(false);
  const [offersToSwap,setOffersToSwap] =useState<OffertModel[]>([]);
  const navigate = useNavigate();
  
  const defaultImage = "https://via.placeholder.com/300x169.png?text=No+Image";
  useEffect(() => {
    makeRequestGet(
      `/UserPanel/MyOfferts`,
      user?.accessToken as string,
      (error, data) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        setOffers(data);
      }
    );

    makeRequestGet(
      `/UserPanel/MyNotifications`,
      user?.accessToken as string,
      (error, data) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        setNotifications(data);
      }
    );

    makeRequestGet(`/ActiveActions/UserFavorites`, 
      user?.accessToken as string,
      (error, actionIds: string[]) => {
          if (error) {
              showErrorMessage("Wystąpił błąd podczas pobierania ulubionych: " + error.message);
              return;
          }
          makeRequestPost(`/ActiveActions/GetActionsList`,
            user?.accessToken as string,
            actionIds,
            (error, data: ActiveAction[]) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                setFavorites(actionIds);
                setFavActions(data);
            }
        );
      }
  );
  }, [user]);


  const handleFavoriteClick = (actionId: string) => {
    const isFavorite = favorites.includes(actionId);
    const endpoint =  '/ActiveActions/UserFavorites?actionId='+actionId;
    const requestData = {};

    makeRequestPatch(endpoint,
         user?.accessToken as string,
          requestData, (error, response) => {
        if (error) {
            showErrorMessage("Wystąpił błąd podczas aktualizacji ulubionych: " + error.message);
            return;
        }
        // Aktualizuj stan ulubionych
        setFavorites(prevFavorites => 
            isFavorite ? prevFavorites.filter(id => id !== actionId) : [...prevFavorites, actionId]
        );
        setFavActions((prevFavActions) => prevFavActions.filter((action) => action.id !== actionId));
        showSuccessMessage(isFavorite ? "Wydarzenie zostało usunięte z ulubionych" : "Wydarzenie zostało dodane do ulubionych");
    });
};

  const closeNotification = (id: string) => {
    makeRequestDelete(
      `/UserPanel/MyNotifications?id=${id}`,
      user?.accessToken as string,
      (error) => {
        if (error) {
          showErrorMessage("Wystąpił błąd: " + error.message);
          return;
        }
        setNotifications((prevNotifications) => 
          prevNotifications.filter((notification) => notification.id !== id)
        );
      }
    );
  };


  const actionBar = (
   <div></div>
  );

  const addActionModal =(

    <Modal 
    onClose={()=> setShowOffertsModal(false)}
    actionBar={actionBar}
    modalWidthClass="max-w-xl"
    >
      <div className="flex mb-6">
          <div className="mr-4 flex-1">
          {offersToSwap.map((offert: OffertModel) => (
                    <div key={offert.id} onClick={()=>{}} className="cursor-pointer p-3 border w-full border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Sektor: {offert.sector}</p>
                      <p className="text-sm text-gray-900 dark:text-white">Miejsce: {offert.place}</p>
                      <p className="text-sm text-gray-900 dark:text-white">Propozycje: {offert?.intrestedOfferts.length||0}</p>
                    </div>
                  ))}
          </div>
        </div>
    </Modal>
  );
  
  function showOffertsToSwap(mainOffertId:string)
  {
    makeRequestGet(`/ActiveActions/Offert/${mainOffertId}`, 
      user?.accessToken as string,
      (error, offerts: OffertModel[]) => {
          if (error) {
              showErrorMessage("Wystąpił błąd podczas pobierania ulubionych: " + error.message);
              return;
          }
          if(offerts)
          {
            setOffersToSwap(offerts);
            setShowOffertsModal(true);
          }
          
      });

  }
  
  return (
    <div className="mt-20 flex">
      {/* Sekcja z listą ofert */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Twoje Oferty</h2>
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          {offers.map((offer, index) => (
            <li key={offer.id} className="pb-3 sm:pb-4">
              <div
                className="flex items-center space-x-4 rtl:space-x-reverse cursor-pointer"
                onClick={()=>showOffertsToSwap(offer.id.toString())}
              >
                <div className="flex-1 min-w-0">
                  <p id={offer.eventId} className="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {offer.eventName}
                  </p>
                  <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                    Oferty do zamiany: {offer.intrestedOfferts.filter(x => x).length}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {offer.sector}-{offer.place}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Sekcja z ulubionymi akcjami */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Ulubione wydarzenia</h2>
        {favActions.length === 0 ? (
          <p className="text-gray-500">Brak ulubionych wydarzeń.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {favActions.map((action) => (
              <div
                key={action.id}
                onClick={() => navigate(`/EventDetails?id=${action.id}`)} // Navigate to details on card click
                className="relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
              >
                {/* Heart button to toggle favorite status */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFavoriteClick(action.id);
                  }}
                  className="absolute top-2 right-2 transition text-red-500"
                >
                  <i className="fa fa-heart w-8 h-6 fa-2x transition-colors duration-200 ease-in-out hover:text-red-500 hover:fill-current"></i>
                </button>

                {/* Image and action content */}
                <img
                  className="rounded-t-lg object-cover w-full h-48"
                  src={action.img || defaultImage}
                  alt={action.name}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = defaultImage;
                  }}
                />
                <div className="p-5 pb-16">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{action.name}</h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Data wydarzenia: {action.eventDate ? new Date(action.eventDate).toLocaleDateString() : "TBA"}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Ilość ofert: {action.offerts.length}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sekcja z powiadomieniami */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Aktualne Powiadomienia</h2>
        <ul className="list-disc list-inside">
          {notifications.map(notification => {
            const hasUrl = notification.url && notification.url.trim() !== '';

            return (
              <a
                key={notification.id}
                id={notification.id}
                href={hasUrl ? notification.url : undefined}
                className={`flex items-center w-full max-w-xs p-4 my-3 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 ${
                  hasUrl ? 'cursor-pointer' : ''
                }`}
                role="alert"
                target={hasUrl ? '_blank' : undefined}
                rel={hasUrl ? 'noopener noreferrer' : undefined}
              >
                <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15.147 15.085a7.159 7.159 0 0 1-6.189 3.307A6.713 6.713 0 0 1 3.1 15.444c-2.679-4.513.287-8.737.888-9.548A4.373 4.373 0 0 0 5 1.608c1.287.953 6.445 3.218 5.537 10.5 1.5-1.122 2.706-3.01 2.853-6.14 1.433 1.049 3.993 5.395 1.757 9.117Z"
                    />
                  </svg>
                  <span className="sr-only">Fire icon</span>
                </div>
                <div className="ms-3 text-sm font-normal">
                  <strong className="block">{notification.title}</strong>
                  <span>{notification.message}</span>
                </div>
                <button
                  type="button"
                  className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.preventDefault();
                    closeNotification(notification.id);
                  }}
                  aria-label="Close"
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </a>
            );
          })}
        </ul>
      </div>
      {showOffertsModal && addActionModal}
    </div>
  );
}
