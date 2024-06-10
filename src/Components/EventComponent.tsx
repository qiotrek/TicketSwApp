import React from 'react';
import { Link } from 'react-router-dom';

interface EventComponentProps {
  title: string;
  imgSrc: string;
  description: string;
  eventId: string;
}

const EventComponent: React.FC<EventComponentProps> = ({ title, imgSrc, description, eventId }) => {
  return (
    <Link to={`/EventDetails?id=${eventId}`} className="w-full max-w-sm p-2">
      <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full">
        <div className="h-48 overflow-hidden">
          <img className="w-full h-full object-cover" src={imgSrc} alt="Event image" />
        </div>
        <div className="p-4 flex-none">
          <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventComponent;
