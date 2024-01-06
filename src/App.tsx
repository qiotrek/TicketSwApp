import React, { useEffect, useState } from 'react';
import MyCard from './Components/CustomCard';
import DownloadCVModal from './Components/DownloadCV';
import './App.css';

function App() {
  const textHow= "Projekt został wykonany za pomocą biblioteki React z wykorzystaniem frameworka Tailwind CSS";
  const titleHow="JAK?";

   const textWhy= "Na początku projekt tworzyłem dla własnego rozwinięcia umiejętności w zakresie React'a, natomiast z czasem zacząłem przeobrażać to w swoją wizytówkę.";
   const titleWhy="DLACZEGO?";
   const textHowMany= "Całkowita praca nad projektem zajęła mi..";//coś o tym że  był tworzony po godzinach i w wolnej chwili
   const titleHowMany="ILE?";
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const [isHovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col overflow-hidden">
       <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>
          <div className="relative left-0 py-2 inline-block text-left">
            <div
              className="relative ml-6 bg-[#111d42] p-1  border-solid rounded-2xl justify-center"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
            <svg className="w-8 h-8 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
            </svg>
              <span className="size-5 font-bold text-lg text-zinc-500">
                {isHovered && <DownloadCVModal />}
              </span>
            </div>
          </div>
          <div>
            <button className="m-4 text-white hover:cursor-pointer">O mnie</button>
            <button className="m-4 text-white hover:cursor-pointer">Moje Umiejętności</button>
            <button className="m-4 text-white hover:cursor-pointer">Doświadczenie zawodowe</button>
          </div>
        </nav>

      
      <div id="bgImage" className="min-h-screen relative top-14 items-center bg-cover justify-center " style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>

        <div className='flex flex-row m-10 mt-14 gap-4 max-sm:flex-col'>
        <MyCard title={titleHow} text={textHow}></MyCard>
        <MyCard title={titleWhy} text={textWhy}></MyCard>
        <MyCard title={titleHowMany} text={textHowMany}></MyCard>
        </div>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa Oto Moja Strona StartowaOto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-blue-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
        <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>

      </div>
    </div>
  );
}

export default App;
