import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { makeRequestGet, makeRequestPut } from "../Hooks/makeRequest";
import { showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";

export default function AdminPanel()
{
    const {user} =useAuth(); 
    const [propositions, setPropositions] = useState<NewActionProposition[]>([]);
    
    useEffect(() => {
        makeRequestGet('/NewActionsPropositions',  // Adjusted endpoint
            user?.accessToken as string,
            (error, data) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                showSuccessMessage("Dane zostały załadowane");
                setPropositions(data);
            }
        );
    }, [user?.accessToken]);

    interface NewActionProposition {
        id: string;
        name: string;
        eventDate: string;
        intrestedCount: number;
        intrestedEmails: string[];
    }
   
    const handleAccept = (id: string) => {
        //console.log(`Akceptuj: ${id}`);
        const requestBody = {
            id: id
        };
    
        makeRequestPut(`/Admin/Accept?id=${id}`,  
            user?.accessToken as string,
            requestBody,  
            (error, response) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                if(response)
                {
                    showSuccessMessage("Zgłoszenie zostało zaakceptowane");
                }
                else{
                    showErrorMessage("Coś poszło nie tak! Spróbuj ponownie");
                }
             
            }
        );
    };

    const handleReject = (id: string) => {
        const requestBody = {
            id: id
        };
    
    makeRequestPut(`/Admin/Reject?id=${id}`,  
            user?.accessToken as string,
            requestBody,  
            (error, response) => {
                if (error) {
                    showErrorMessage("Wystąpił błąd: " + error.message);
                    return;
                }
                if(response)
                {
                    showSuccessMessage("Zgłoszenie zostało odrzucone");
                }
                else{
                    showErrorMessage("Coś poszło nie tak! Spróbuj ponownie");
                }
             
            }
        );
    };

    return (
        <div className="mt-20 flex flex-row gap-5">
        <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-2xl mx-auto my-4"><strong>Zgłoszenia nowych Akcji</strong></h3>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">ID</th>
                            <th scope="col" className="px-6 py-3 text-center">Nazwa</th>
                            <th scope="col" className="px-6 py-3 text-center">Data Wydarzenia</th>
                            <th scope="col" className="px-6 py-3 text-center">Ilość Zainteresowanych</th>
                            <th scope="col" className="px-6 py-3 text-center">Akcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propositions.map((proposition) => (
                            <tr key={proposition.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                                    {proposition.id}
                                </th>
                                <td className="px-6 py-4 text-center">{proposition.name}</td>
                                <td className="px-6 py-4 text-center">{new Date(proposition.eventDate).toLocaleDateString()}</td>
                                <td className="px-6 py-4 text-center">{proposition.intrestedCount}</td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex flex-col gap-1 justify-center items-center space-x-2">
                                        <button
                                            className="bg-green-500 text-white mx-auto px-2 py-1 rounded"
                                            onClick={() => handleAccept(proposition.id)}
                                        >
                                            Akceptuj
                                        </button>
                                        <button
                                            className="bg-red-500 text-white mx-auto px-2 py-1 rounded"
                                            onClick={() => handleReject(proposition.id)}
                                        >
                                            Odrzuć
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <div className="flex flex-1">
            <div>
                <h2>COŚ INNEGO</h2>
            </div>
        </div>
    </div>
    );
}