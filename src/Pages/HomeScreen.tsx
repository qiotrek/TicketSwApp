import React, { useEffect, useState } from 'react';
import EventComponent from '../Components/EventComponent';
import SearchEventForm from '../Components/SearchEventForm';
import AboutInfo from '../Components/AboutInfo';
import { Carousel } from 'flowbite-react';
import HeaderSlice from '../Components/HeaderSlice';

interface Event {
  id: string;
  name: string;
  images: { url: string }[];
  description: string;
}

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [incomingEvents, setIncomingEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const currentDate = new Date();
      const startSearchingDate = new Date();
      const stopSearchingDate = new Date();

      startSearchingDate.setDate(currentDate.getDate() + 7);
      stopSearchingDate.setDate(currentDate.getDate() + 30);

      try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=25WSDviZs0G8VqZFpMioycIKFcDqMlTA&locale=pl-pl&startDateTime=${getFormattedDate(startSearchingDate)}&endDateTime=${getFormattedDate(stopSearchingDate)}&countryCode=PL`);
        const data = await response.json();
        setIncomingEvents(data._embedded.events);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchEvents();
  }, []);

  const getFormattedDate = (date:any) => {
    return date.toISOString().split('.')[0] + 'Z';
  };

  const handleButtonClick = () => {
    setShowSearchBar(true);
  };

  const groupEvents = (events: Event[], groupSize: number) => {
    let groupedEvents = [];
    for (let i = 0; i < events.length; i += groupSize) {
      groupedEvents.push(events.slice(i, i + groupSize));
    }
    return groupedEvents;
  };

  return (
    <div className='flex flex-col mt-10 flex-1'>
      <div className={`transition-all duration-500 ease-in-out ${showSearchBar ? 'opacity-0 h-0' : 'opacity-100 min-h-[40%]'}`}>
        {!showSearchBar && (
          <AboutInfo handleButtonClick={handleButtonClick} />
        )}
      </div>

      <div className={`transition-all duration-500 ease-in-out ${showSearchBar ? 'opacity-100 h-auto mt-2' : 'opacity-0 h-0'}`}>
        {showSearchBar && (
          <SearchEventForm />
        )}
      </div>

      <div id="incommingEvent" className='flex-1 bg-gray-100 w-screen h-[20%] flex flex-col mt-10 items-center'>
        <div className='mx-auto my-3'>
          <span className='text-lg font-bold text-gray-900 dark:text-white'>Nadchodzące Wydarzenia</span>
        </div>
        <HeaderSlice />

        <div className='w-full max-w-4xl h-96'>
          <Carousel slide={true} pauseOnHover={true} leftControl={false} rightControl={false} className="h-full w-full">
            {incomingEvents.length > 0 ? (
              groupEvents(incomingEvents, 3).map((group, index) => (
                <div key={index} className="flex justify-center items-center h-full gap-4">
                  {group.map(event => (
                    <EventComponent
                      key={event.id}
                      title={event.name}
                      imgSrc={event.images[0].url}
                      description={event.description || 'Brak opisu'}
                      eventId={event.id}
                    />
                  ))}
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <span className='text-lg font-bold text-gray-900 dark:text-white'>Brak nadchodzących wydarzeń</span>
              </div>
            )}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
