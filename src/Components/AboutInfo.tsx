import React from 'react';

interface AboutInfoProps {
  handleButtonClick: () => void;
}

const AboutInfo: React.FC<AboutInfoProps> = ({ handleButtonClick }) => {
  return (
    <div id="aboutInfo" className={`text-center bg-center bg-[url('https://www.shutterstock.com/image-photo/people-music-concert-hd-background-600nw-1927593821.jpg')] bg-gray-500 bg-blend-multiply`}>
      <p className="text-lg font-bold pt-6 text-gray-200">
        <span className='text-orange-400'>Witaj!</span>
        <br /> Kupiłeś ostatnio bilety na koncert lub inne wydarzenie
        <br /> ale Twoi znajomi siedzą za daleko?
      </p>
      <p className="text-lg font-normal pt-4 text-gray-200">Trafiłeś w idealne miejsce</p>
      <button
        onClick={handleButtonClick}
        className="my-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Znajdź interesujące Cię wydarzenie
      </button>
    </div>
  );
}

export default AboutInfo;
