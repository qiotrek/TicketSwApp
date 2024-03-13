import MyCard from './Components/CustomCard';
import DownloadCVHook from './Hooks/CVDownload';
import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import { useEffect, useState } from 'react';
import gmailIcon from "../assets/gmail_icon.svg";
import Hamburger from 'hamburger-react';

function App() {
  
  let texts:  Record<string, string> = {};
  const lang = localStorage.getItem('lang')??"pl";
  const [isPhoneHovered, setPhoneHovered] = useState(false);
  const [isEmailHovered, setEmailHovered] = useState(false);
  const [isLinkedinHovered, setLinkedinHovered] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isOpen, setOpen] = useState(false)
    const textsContent = localStorage.getItem('textsContent');

    if (textsContent) {
      texts= JSON.parse(textsContent);
    } 
    const handleClickScroll = (id:string) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth',block:'center' });
      }
    };

  return (
    // <div className="flex flex-col overflow-hidden bg-fixed" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>
    <div className="flex flex-col overflow-hidden bg-fixed bg-slate-800" >
       {/* <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}> */}
       <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10 bg-inherit">
        <DownloadCVHook />
        {/* Burger menu */}
        <div className="flex items-center">
          <button
            className="text-white block md:hidden"
            onClick={() => setMenuOpen(!isMenuOpen)}
          >
             <Hamburger size={25} color='rgb(239 68 68)' toggled={isOpen} toggle={setOpen} />
          </button>
        </div>
        {/* End of Burger menu */}

        {/* List of links */}
        <div className={`md:flex ${isMenuOpen ? "flex" : "hidden"} md:items-center md:w-auto w-full`}>
          <div className="md:flex flex-col md:flex-row md:ml-auto">
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("aboutMe")}>{texts["AboutMe"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("aboutProject")}>{texts["AboutProject"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("")}>{texts["MySkills"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("aboutMe")}>{texts["ProfessionalExperience"]}</button>
            <button className="m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("contactCard")}>{texts["Contact"]}</button>
          </div>
        </div>
        {/* End of List of links */}
      </nav>

      
      <div id="bg" className="min-h-screen gap-64 relative top-14 items-center bg-cover justify-center " >
      {/* O MNIE */}   
      <div id='aboutMe' className="flex relative z-5 max-h-[80%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
          <div className={`flex flex-col gap-3 bg-[#111d42] my-auto p-5 w-[90%] h-96 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
              <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">O Mnie</h1>
            <div className="border-t border-gray-500 items-center"></div>
              <div className='flex gap-3 w-[100%] h-[100%]'>
                <div className='bg-slate-200 w-1/3 h-100%'></div>
                <div className='bg-slate-200 w-1/3 h-100%'></div>
                <div className='bg-slate-200 w-1/3 h-100%'></div>
              </div>
              
          </div>
      </div>

        {/* O PROJEKCIE */}
 
            <div  id='aboutProject'  className="flex relative z-5 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
              <MyCard title={texts["ProjectInfoHowTitle"]} text={texts["ProjectInfoHowText"]}></MyCard>
              <MyCard title={texts["ProjectInfoWhyTitle"]} text={texts["ProjectInfoWhyText"]}></MyCard>
              <MyCard title={texts["ProjectInfoHowMuchTitle"]} text={texts["ProjectInfoHowMuchText"]}></MyCard>
            </div>
       
        {/* KONTAKT */}
      
        <div id='contactCard' className="flex relative z-5 max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
          <div className={`flex flex-col gap-3 bg-[#111d42] my-auto p-5 w-[80%] h-72 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
              <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">Kontakt</h1>
              <div className="border-t border-gray-500 items-center"></div>
              <div className='flex flex-row mx-auto gap-20 items-center justify-center'>
                <div id="linkedin" className='w-[30%] p-5 grow text-center'>
                  <div className=' max-h-32 max-w-32  flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'>
                    <img className=' rounded-full  object-fill  w-[100%] h-[100%]'  alt="Linkedin icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Linkedin_circle.svg/512px-Linkedin_circle.svg.png"></img>
                  </div>
                  <span className='text-red-500 font-bold'>Linkedin</span>
                </div>
                <div id="mail" className='w-[30%] p-5 grow text-center'>
                <div className='max-h-32 max-w-32 flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'>
                  <img className=' object-cover-full rounded-full  w-[100%] h-[100%] ' alt="Gmail icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Deus_Gmail.png/512px-Deus_Gmail.png"></img>
                  </div>
                  <span className='text-red-500 font-bold'>E-Mail</span>
                </div>
                <div id="phone" className='w-[30%] p-5 grow text-center'>
                  <div className='max-h-32 max-w-32  flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'     
                  onMouseEnter={() => setPhoneHovered(true)}
                  onMouseLeave={() => setPhoneHovered(false)}>
                    <img className='object-cover rounded-full w-[100%] h-[100%] ' alt="Pictograms-nps-emergency telephone-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pictograms-nps-emergency_telephone-2.svg/64px-Pictograms-nps-emergency_telephone-2.svg.png"></img>
                  </div>
                  <span className="size-5 font-bold text-lg text-zinc-500">
                      {isPhoneHovered &&
                          <div className="fixed bg-[#111d42] mx-auto mt-1 w-[18%] h-[60px] border-solid rounded-2xl shadow-lg z-10 shadow-transparent ">
                              <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                  <div className="flex w-0 flex-1 items-center">
                                      <svg className="h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                      <path fill-rule="evenodd" d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z" clip-rule="evenodd" />
                                      </svg>
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                          <span className="truncate font-medium text-gray-400">CV.docx</span>
                                          <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                                      </div>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                      <button className="font-medium text-indigo-600 hover:text-indigo-500 " >Pobierz</button>
                                  </div>
                              </li>
                          </div>
                      }
                  </span>
                  <span className='text-red-500 font-bold'>Telefon</span>
                    
                </div>
              </div>
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
