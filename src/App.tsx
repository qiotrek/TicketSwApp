import MyCard from './Components/CustomCard';
import DownloadCVHook from './Hooks/CVDownload';
import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import { useEffect, useState } from 'react';
import gmailIcon from "../assets/gmail_icon.svg";
import { Turn as Hamburger } from 'hamburger-react'
import Carousel from './Components/CarouselElement';

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
    const imageData = [
      { id: 1, image: 'https://via.placeholder.com/150' },
      { id: 2, image: 'https://via.placeholder.com/150' },
      { id: 3, image: 'https://via.placeholder.com/150' },
      // Dodaj więcej danych obrazków
    ];
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
             <Hamburger size={25} color='rgb(239 68 68)' duration={0.8} toggled={isOpen} toggle={setOpen} />
          </button>
        </div>
        {/* End of Burger menu */}

        {/* List of links */}
        <div className={`md:flex ${isMenuOpen ? "flex" : "hidden"} md:items-center md:w-auto w-full`}>
          <div className="md:flex flex-col md:flex-row md:ml-auto">
          <button className="hover:scale-105 m-4 text-red-500 font-bold cursor-pointer" onClick={()=>handleClickScroll("aboutMe")}>{texts["AboutMe"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("aboutProject")}>{texts["AboutProject"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("")}>{texts["MySkills"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("aboutMe")}>{texts["ProfessionalExperience"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("contactCard")}>{texts["Contact"]}</button>
          </div>
        </div>
        {/* End of List of links */}
      </nav>

      
      <div id="bg" className="min-h-screen gap-64 relative top-14 items-center bg-cover justify-center " >
      {/* O MNIE */}   
      <div id='aboutMe' className="flex relative z-5 max-h-[80%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
          <div className={`flex flex-col  gap-3 bg-[#111d42] my-auto p-5 w-[90%] h-96 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
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
                  <div className=' max-h-32 max-w-32  flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'
                  onClick={()=>setLinkedinHovered(!isLinkedinHovered)}>
                    <img className=' rounded-full  object-fill  w-[100%] h-[100%]'  alt="Linkedin icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Linkedin_circle.svg/512px-Linkedin_circle.svg.png"></img>
                  </div>
                  {  !isLinkedinHovered &&         
                    <span className='text-red-500 font-bold'>Linkedin</span>
                  }
                  {  isLinkedinHovered &&         
                    <span className='text-red-500 font-bold'><a href='https://www.linkedin.com/in/piotr-płaziński-2178a917b/' target='_blank'>Przejdź do profilu</a></span>
                  }
                </div>
                <div id="mail" className='w-[30%] p-5 grow text-center'>
                <div className='max-h-32 max-w-32 flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'
                 onClick={()=>setEmailHovered(!isEmailHovered)}>
                  <img className=' object-cover-full rounded-full  w-[100%] h-[100%] ' alt="Gmail icon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Deus_Gmail.png/512px-Deus_Gmail.png"></img>
                  </div>
                  <span className='text-red-500 font-bold'>
                  {  !isEmailHovered &&         
                    <span className='text-red-500 font-bold'>E-Mail</span>
                  }
                  {  isEmailHovered &&         
                    <span className='text-red-500 font-bold'>piotrplazinski@gmail.com</span>
                  }
                  </span>
                </div>
                <div id="phone" className='w-[30%] p-5 grow text-center'>
                  <div className='max-h-32 max-w-32  flex justify-center border-4 border-[#fcbb71] rounded-full items-center cursor-pointer hover:opacity-70'
                    onClick={()=>setPhoneHovered(!isPhoneHovered)}>
                    <img className='object-cover rounded-full w-[100%] h-[100%] ' alt="Pictograms-nps-emergency telephone-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Pictograms-nps-emergency_telephone-2.svg/64px-Pictograms-nps-emergency_telephone-2.svg.png"></img>
                  </div>
                  {  !isPhoneHovered &&         
                    <span className='text-red-500 font-bold'>Telefon</span>
                  }
                  {  isPhoneHovered &&         
                    <span className='text-red-500 font-bold'>667897546</span>
                  }
                </div>
              </div>
          </div>
      
        </div>
       
      
        <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-8">Image Carousel</h1>
      <Carousel data={imageData} />
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
