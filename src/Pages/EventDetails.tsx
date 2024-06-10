import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
  const [eventId, setEventId] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<any>(null);

  useEffect(() => {
    const queryParameters = new URLSearchParams(window.location.search);
    const id = queryParameters.get("id") || "";
    setEventId(id);

    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=25WSDviZs0G8VqZFpMioycIKFcDqMlTA`);
          const data = await response.json();
          setEventDetails(data);
          console.log(data);
        } catch (err) {
          console.error('Error fetching data:', err);
        }
      };

      fetchEventDetails();
    }
  }, []);

  if (!eventId) {
    return <div className="mt-40">No Event ID provided</div>;
  }

  if (!eventDetails) {
    return <div className="mt-40">Loading event details...</div>;
  }

  return (
    <div className='flex flex-col  mt-20'>
        <div className='flex items-center justify-center'><span className="text-2xl font-bold text-gray-900 dark:text-white">{eventDetails.name}</span></div>
        <div className="flex flex-row flex-1">
        <div id="eventInfo" className='flex-1 h-screen  flex flex-col '>
        {/* <img classNameName="mx-auto mt-6 h-auto max-w-xl rounded-lg" src={eventDetails.images[1].url} alt={eventDetails.name}/> */}
            

        <div className="w-full max-w-2xl mx-auto mt-10 max-h-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <img className="p-8 rounded-lg" src={eventDetails.images[1].url} alt={eventDetails.name}  />
        
            <div className="px-5 pb-5">
                
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{eventDetails.dates.start.localDate} - {eventDetails.dates.start.localTime}</h5>
                
                
                <div className="flex items-center mt-4 justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{eventDetails.priceRanges[0].min} - {eventDetails.priceRanges[0].max} PLN</span>
                    <a href={eventDetails.url} target="_blank" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Przejdź do sprzedawcy</a>
                </div>
            </div>
        </div>

            
            
        </div>
        <div id='eventsActions' className='flex-1'></div>
        
        </div>
    </div>
  );
}
