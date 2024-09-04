import { useEffect, useState } from "react";
import { makeRequestGet } from "../Hooks/makeRequest";
import { useAuth } from "../context/AuthContext";
import { showErrorMessage } from "../Hooks/useAlert";
import { ActiveAction } from "../context/Interfaces";
import { Link } from "react-router-dom";

export default function Advertisements()
{
    const [activeActions, setActiveActions] = useState<ActiveAction[]>([]);
    const {user} =useAuth(); 
    useEffect(() => {

        makeRequestGet(`/ActiveActions/GetActions`, 
            user?.accessToken as string,
            (error, data:ActiveAction[]) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }              
                  setActiveActions(data);                
            }
          );
    },[user?.accessToken])
    return (
        <div className="mt-20 m-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {activeActions.map(action => (
                    <div key={action.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg" src={action.img} alt={action.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{action.name}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Data wydarzenia: {action.eventDate ? new Date(action.eventDate).toLocaleDateString() : "TBA"}
                            </p>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                Ilość ofert: {action.offerts.length}
                            </p>
                            <Link to={`/EventDetails?id=${action.id}`} className="w-full max-w-sm p-2">
                            <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Sprawdź
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}