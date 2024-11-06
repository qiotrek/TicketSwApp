import { useEffect, useState } from "react";
import { makeRequestGet, makeRequestPatch, makeRequestPost } from "../Hooks/makeRequest";
import { useAuth } from "../context/AuthContext";
import { showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";
import { ActiveAction } from "../context/Interfaces";
import { Link } from "react-router-dom";

export default function Advertisements() {
    const [activeActions, setActiveActions] = useState<ActiveAction[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]); // Stan ulubionych wydarzeń
    const { user } = useAuth();

    const defaultImage = "https://via.placeholder.com/300x169.png?text=No+Image";

    useEffect(() => {
        // Pobierz aktywne wydarzenia
        makeRequestGet(`/ActiveActions/GetActions`,
            user?.accessToken as string,
            (error, data: ActiveAction[]) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                setActiveActions(data);
            }
        );

        // Pobierz ulubione wydarzenia użytkownika
        makeRequestGet(`/ActiveActions/UserFavorites`, 
            user?.accessToken as string,
            (error, favoriteIds: string[]) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd podczas pobierania ulubionych: " + error.message);
                    return;
                }
                setFavorites(favoriteIds);
            }
        );
    }, [user?.accessToken]);

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
            showSuccessMessage(isFavorite ? "Wydarzenie zostało usunięte z ulubionych" : "Wydarzenie zostało dodane do ulubionych");
        });
    };

    return (
        <div className="mt-20 m-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {activeActions.map(action => {
                    const isFavorite = favorites.includes(action.id); // Sprawdź, czy wydarzenie jest ulubione
                    return (
                        <div key={action.id} className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            {/* Przycisk serca */}
                            <button
                                onClick={() => handleFavoriteClick(action.id)}
                                className={`absolute top-2 right-2 transition ${
                                    isFavorite ? "text-red-500" : "text-gray-500"
                                }`}
                            >
                                {/* Ikona serca */}
                                <i
                                    className={`${
                                        isFavorite ? "fa fa-heart" : "far fa-heart"
                                    } w-8 h-6 fa-2x transition-colors duration-200 ease-in-out hover:text-red-500 hover:fill-current`}
                                ></i>
                            </button>

                            {/* Obrazek wydarzenia */}
                            <a href="#">
                                <img
                                    className="rounded-t-lg object-cover w-full h-48"
                                    src={action.img || defaultImage}
                                    alt={action.name}
                                    onError={(e) => { (e.target as HTMLImageElement).src = defaultImage; }}
                                />
                            </a>

                            <div className="p-5 pb-16">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {action.name}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Data wydarzenia: {action.eventDate ? new Date(action.eventDate).toLocaleDateString() : "TBA"}
                                </p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                    Ilość ofert: {action.offerts.length}
                                </p>
                            </div>

                            {/* Przycisk Sprawdź w prawym dolnym rogu */}
                            <Link to={`/EventDetails?id=${action.id}`}>
                                <button className="absolute bottom-2 right-2 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Sprawdź
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
