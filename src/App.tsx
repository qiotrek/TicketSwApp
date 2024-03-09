import MyCard from './Components/CustomCard';
import DownloadCVHook from './Hooks/CVDownload';
import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import { useEffect, useState } from 'react';
import gmailIcon from "../assets/gmail_icon.svg";

function App() {
  
  let texts:  Record<string, string> = {};
  const lang = localStorage.getItem('lang')??"pl";


    const textsContent = localStorage.getItem('textsContent');

    if (textsContent) {
      texts= JSON.parse(textsContent);
    } 


  return (
    // <div className="flex flex-col overflow-hidden bg-fixed" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>
    <div className="flex flex-col overflow-hidden bg-fixed bg-slate-800" >
       {/* <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}> */}
       <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10 bg-inherit">
          <DownloadCVHook></DownloadCVHook>
          
          <div>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer">{texts["AboutMe"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer">{texts["MySkills"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer">{texts["ProfessionalExperience"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer">{texts["Contact"]}</button>
          </div>
        </nav>

      
      <div id="bg" className="min-h-screen gap-64 relative top-14 items-center bg-cover justify-center " >
        {/* O PROJEKCIE */}
        <div className="relative">
            <div className="flex relative z-5 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-2xl shadow-[#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
              <MyCard title={texts["ProjectInfoHowTitle"]} text={texts["ProjectInfoHowText"]}></MyCard>
              <MyCard title={texts["ProjectInfoWhyTitle"]} text={texts["ProjectInfoWhyText"]}></MyCard>
              <MyCard title={texts["ProjectInfoHowMuchTitle"]} text={texts["ProjectInfoHowMuchText"]}></MyCard>
            </div>
            <div className="absolute inset-0 rotate-180 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-transparent shadow-2xl shadow-[#f8c78f]   top-[-110px]">

            </div>
        </div>
        {/* KONTAKT */}
        <div className="relative">
            <div className="flex relative z-5 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-2xl shadow-[#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
            <div className={`flex flex-col gap-3 bg-[#111d42] my-auto p-5 w-[80%] h-72 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
                <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">Kontakt</h1>
                <div className="border-t border-gray-500 items-center"></div>
                <div className='flex flex-row mx-auto gap-20 items-center justify-center'>
                  <div id="linkedin" className='w-[30%] p-5 grow text-center'>
                    <div className='w-36 h-36  flex justify-center items-center'><img className='cursor-pointer rounded-full border-4 border-[#fcbb71] object-fill hover:opacity-70 w-32 h-32'  alt="Linkedin icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Linkedin_icon.svg/256px-Linkedin_icon.svg.png"></img></div>
                    <span className='text-red-500 font-bold'>Linkedin</span>
                  </div>
                  <div id="mail" className='w-[30%] p-5 grow text-center'>
                  <div className='w-36 h-36 flex justify-center items-center'>
                    <img className='cursor-pointer object-scale-down hover:opacity-70 rounded-full border-4 border-[#fcbb71] w-32 h-32 ' alt="Gmail icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/512px-Gmail_icon_%282020%29.svg.png"></img>
                    </div>
                    <span className='text-red-500 font-bold'>E-Mail</span>
                  </div>
                  <div id="phone" className='w-[30%] p-5 grow text-center'>
                    <div className='w-36 h-36 rounded-full flex justify-center items-center'><img className='cursor-pointer border-4 border-[#fcbb71] hover:opacity-70 rounded-full w-32 h-32 ' alt="Pictograms-nps-emergency telephone-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pictograms-nps-emergency_telephone-2.svg/64px-Pictograms-nps-emergency_telephone-2.svg.png"></img></div>
                    <span className='text-red-500 font-bold '>Telefon</span>
                  </div>
                </div>
            </div>
         
            </div>
            <div className="absolute inset-0 rotate-180 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-transparent shadow-2xl shadow-[#f8c78f]   top-[-110px]">

            </div>
        </div>
        
            <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
            <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
            <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
            <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
            <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
        

          
      </div>
      <LanguageChangeHook language={lang}></LanguageChangeHook>
    </div>
  );
}

export default App;
