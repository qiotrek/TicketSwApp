import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { makeRequestGet, makeRequestPost, makeRequestPut } from "../Hooks/makeRequest";
import { resolveErrorLoadingMessage, resolveSuccessLoadingMessage, showErrorMessage, showSuccessMessage } from "../Hooks/useAlert";
import { useAuth } from "../context/AuthContext";
import { access } from "fs";
import {ActiveAction, OffertModel} from "../context/Interfaces"
import Modal from "../Modals/Modal";


export default function EventDetails() {
  const [eventId, setEventId] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const [isActionActive, setIsActionActive] = useState<boolean>(false);
  const [activeAction, setActiveAction] = useState<ActiveAction>();
  const {user} =useAuth(); 
  const [showModal,setShowModal] =useState<boolean>(false);
  const [showAddPropositionModal,setShowAddPropositionModal] =useState<boolean>(false);
  const [inputSectorValue, setInputSectorValue] = useState("");
  const [inputPlaceValue, setInputPlaceValue] = useState(0);
  const [mainOffertRef,setMainOffertRef]=useState<string>("");


  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id") || "";
    setEventId(id);

    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=25WSDviZs0G8VqZFpMioycIKFcDqMlTA`
          );
          const data = await response.json();
          setEventDetails(data);
          console.log(data);
        } catch (err) {
          console.error("Error fetching data:", err);
        }
      };

      fetchEventDetails();

      makeRequestGet(`/NewActionsPropositions/IsRequested?id=${id}`,  
        user?.accessToken as string,
        (error, data) => {
            if (error) {
                showErrorMessage("Wystąpił błąd: " + error.message);
                return;
            }
            setIsRequested(data);
        }
      );

      makeRequestGet(`/ActiveActions/GetAction?id=${id}`, 
        user?.accessToken as string,
        (error, data:ActiveAction) => {
            if (error) {
                showErrorMessage("Wystąpił błąd: " + error.message);
                return;
            }
            if(data.id!=null&&data.id==id)
            {
              setIsActionActive(true);
              setActiveAction(data);
            }
        }
      );
    }

  }, [user?.accessToken]);



  if (!eventId) {
    return <div className="mt-40">No Event ID provided</div>;
  }

  if (!eventDetails) {
    return <div className="mt-40">Loading event details...</div>;
  }

 const handleEventSwapStartRequest = () => {
    const dateString = eventDetails.dates.start.localDate;

    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(dateString);
  
    if (!isValidDate) {
        console.error("Invalid date format:", dateString);
        showErrorMessage("Invalid date format.");
        return;
    }

    const requestBody = {
        id: eventId,
        name: eventDetails.name,
        date: dateString,
        img:eventDetails.images[1].url
    };

    makeRequestPut('/NewActionsPropositions',  
        user?.accessToken as string,
        requestBody,  
        (error, response) => {
            if (error) {
                showErrorMessage("Wystąpił błąd: " + error.message);
                return;
            }
            showSuccessMessage("Twoje zgłoszenie zostało wysłane!");
            setIsRequested(true);
        }
    );
};

const actionBar = (
  <div className="flex justify-end">
    <div className="pt-4">
      <button
        type="button"
        onClick={handleAddOffertRequest}
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Zapisz
      </button>
    </div>
  </div>
);
const actionBarproposition = (
  <div className="flex justify-end">
    <div className="pt-4">
      <button
        type="button"
        onClick={handleAddOffertPropositionRequest}
        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Zapisz
      </button>
    </div>
  </div>
);

const handleSectorChange = (event:any) => {
  setInputSectorValue(event.target.value);
};

const handlePlaceChange = (event:any) => {
  setInputPlaceValue(event.target.value);
};

const addActionModal =(

  <Modal 
  onClose={()=> setShowModal(false)}
  actionBar={actionBar}
  modalWidthClass="max-w-xl"
  >
    <div className="flex mb-6">
        <div className="mr-4 flex-1">
          <div className="p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sektor
            </label>
            <input
              name="sector"
              type="text"
              value={inputSectorValue}
              onChange={handleSectorChange}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Wpisz sektor"
              required
            />
          </div>
          <div className="p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Miejsce
            </label>
            <input
              type="number"
              name="percentageRate"
              step="1"
              placeholder="Wpisz miejsce"
              value={inputPlaceValue}
              onChange={handlePlaceChange}
              required
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
      </div>
  </Modal>
);


const addOffertPropositionModal =(

  <Modal 
  onClose={()=> setShowAddPropositionModal(false)}
  actionBar={actionBarproposition}
  modalWidthClass="max-w-xl"
  >      
    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Podaj miejsce za które chcesz się zamienić</h2>
    <div className="flex mb-6">
        <div className="mr-4 flex-1">
          <div className="p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Sektor
            </label>
            <input
              name="sector"
              type="text"
              value={inputSectorValue}
              onChange={handleSectorChange}
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Wpisz sektor"
              required
            />
          </div>
          <div className="p-2">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Miejsce
            </label>
            <input
              type="number"
              name="percentageRate"
              step="1"
              placeholder="Wpisz miejsce"
              value={inputPlaceValue}
              onChange={handlePlaceChange}
              required
              className="mt-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></input>
          </div>
        </div>
      </div>
  </Modal>
);

  function handleAddOffertRequest(): void {

    if(eventId==""||inputSectorValue==""||inputPlaceValue==0)
    {
      showErrorMessage("Wprowadź wszystkie wymagane informacje!");
      return;
    }
    
    const requestBody = {
      id:eventId,
      sector:inputSectorValue,
      place:inputPlaceValue
    };
    makeRequestPut(`/ActiveActions/Offert?id=${eventId}&sector=${inputSectorValue}&place=${inputPlaceValue}`,  
      user?.accessToken as string,
      requestBody,  
      (error, response) => {
          if (error) {
              showErrorMessage("Wystąpił błąd: " + error.message);
              return;
          }
          showSuccessMessage("Twoje ogłoszenie zostało dodane!");
          window.location.href = window.location.href;
      }
    );
  }

  function handleAddOffertPropositionRequest(): void {

    if(eventId==""||inputSectorValue==""||inputPlaceValue==0)
    {
      showErrorMessage("Wprowadź wszystkie wymagane informacje!");
      return;
    }
    
    const requestBody = {
      id:eventId,
      sector:inputSectorValue,
      place:inputPlaceValue
    };
    makeRequestPut(`/ActiveActions/Offert?id=${eventId}&sector=${inputSectorValue}&place=${inputPlaceValue}&mainOffertId=${mainOffertRef}`,  
      user?.accessToken as string,
      requestBody,  
      (error, response) => {
          if (error) {
              showErrorMessage("Wystąpił błąd: " + error.message);
              return;
          }
          showSuccessMessage("Twoje ogłoszenie zostało dodane!");
          window.location.href = window.location.href;
      }
    );
  }

  const addOffertPropositionSet=(id:string)=>{
    setMainOffertRef(id);
    setShowAddPropositionModal(true);
  };
  return (
    <div className="flex flex-col m-2  mt-20">
      <div className="flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {eventDetails.name}
        </span>
      </div>
      <div className="flex flex-row gap-6 flex-1">
        <div id="eventInfo" className="flex-1 h-screen  flex flex-col ">
          {/* <img classNameName="mx-auto mt-6 h-auto max-w-xl rounded-lg" src={eventDetails.images[1].url} alt={eventDetails.name}/> */}

          <div className="w-full max-w-2xl mx-auto mt-10 max-h-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img
              className="p-8 rounded-lg"
              src={eventDetails.images[1].url}
              alt={eventDetails.name}
            />

            <div className="px-5 pb-5">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {eventDetails.dates.start.localDate} -{" "}
                {eventDetails.dates.start.localTime}
              </h5>

              <div className="flex items-center mt-4 justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {eventDetails.priceRanges[0].min} -{" "}
                  {eventDetails.priceRanges[0].max} PLN
                </span>
                <a
                  href={eventDetails.url}
                  target="_blank"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Przejdź do sprzedawcy
                </a>
              </div>
            </div>
          </div>
        </div>
        <div id="eventsActions" className="flex-1">
          <div className="w-full max-w-2xl mx-auto mt-10 max-h-xl bg-white border items-center justify-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className=" flex p-5 items-center justify-center">
            {!isActionActive?(
            !isRequested ?(
              <button id="sendSwapStartRequest"  onClick={handleEventSwapStartRequest} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Zgłoś zainteresowanie wymianą</button>
            ):(
            
                <button
                  type="button"
                  className="text-gray-500 bg-gray-200 cursor-not-allowed font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-600 dark:text-gray-400"
                  disabled
                >
                  Zgłoszenie oczekuje na akceptację
                </button>)
            ):(
              <div className="flex gap-3 flex-col w-full justify-center items-center">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Aktualne Oferty</h2>
                  {activeAction?.offerts.map((offert: OffertModel) => (
                    <div key={offert.id} onClick={()=>addOffertPropositionSet(offert.id)} className="cursor-pointer p-3 border w-full border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Sektor: {offert.sector}</p>
                      <p className="text-sm text-gray-900 dark:text-white">Miejsce: {offert.place}</p>
                      <p className="text-sm text-gray-900 dark:text-white">Propozycje: {offert?.intrestedOfferts.length||0}</p>
                    </div>
                  ))}
                  <button id="addOffert"  onClick={()=>setShowModal(true)} type="button" className="w-40 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Dodaj</button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
      {showModal && addActionModal}
      {showAddPropositionModal && addOffertPropositionModal}
    </div>

  );
}
