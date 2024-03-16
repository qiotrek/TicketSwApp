import MyCard from './Components/CustomCard';
import DownloadCVHook from './Hooks/CVDownload';
import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';
import { useEffect, useState } from 'react';
import { Turn as Hamburger } from 'hamburger-react'
import { Badge, Card, Carousel, Footer } from 'flowbite-react';
import myPhoto from './assets/myPhoto.jpg';
import { HiCheck, HiArrowCircleUp,HiMinusCircle } from 'react-icons/hi';


function App() {
  
  useEffect(() => {
    //handleClickScroll("aboutMe");
  }, []); 
  
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
             <Hamburger size={25} color='rgb(239 68 68)' duration={0.8} toggled={isOpen} toggle={setOpen} />
          </button>
        </div>
        {/* End of Burger menu */}

        {/* List of links */}
        <div className={`md:flex ${isMenuOpen ? "flex" : "hidden"} md:items-center md:w-auto w-full`}>
          <div className="md:flex flex-col md:flex-row md:ml-auto">
          <button className="hover:scale-105  m-4 text-red-500 font-bold rounded-2xl cursor-pointer" onClick={()=>handleClickScroll("aboutMe")}><span className='p-2'>{texts["AboutMe"]}</span></button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("mySkills")}>{texts["MySkills"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("myExperience")}>{texts["ProfessionalExperience"]}</button>
            <button className="hover:scale-105 m-4 text-red-500 font-bold hover:cursor-pointer" onClick={()=>handleClickScroll("contactCard")}>{texts["Contact"]}</button>
          </div>
        </div>
        {/* End of List of links */}
      </nav>

      
      <div id="bg" className="min-h-screen gap-64 relative top-14 items-center bg-cover justify-center " >
        {/* ABOUT */}   
        <div id='aboutMe' className="flex relative z-5 max-h-[80%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
            <div className={`flex flex-col  gap-3 bg-[#111d42] my-auto p-5 w-[90%] h-96 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
                <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">O Mnie</h1>
              <div className="border-t border-gray-500 items-center"></div>
              
              <div className="h-[100%] sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slide={false}>
                  <Card className="h-[100%] w-[70%] grow bg-slate-600 dark:bg-slate-700 flex" imgSrc={myPhoto} horizontal >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span className='text-[#111d42]'>Hej! Mam na imię</span> <span className='text-red-500'>Piotrek</span>
                    </h5>
                    <p className="font-normal  text-gray-300 dark:text-gray-400">
                      Mam 25 lat i aktualnie pracuję jako <span className='text-red-500'>Full-Stack Developer</span>. Ostatnio najwięcej czasu poświęcam na programowanie <span className='text-red-500'> Aplikacji Webowych</span>.
                    </p>
                  </Card>
                  <Card className="h-[100%] w-[60%] bg-slate-600 dark:bg-slate-700 flex">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span className='text-[#111d42]'>Trochę o tym projekcie!</span>
                    </h5>
                    <p className="font-normal  text-gray-300 dark:text-gray-400">
                      {texts["ProjectInfoWhyText"]} {texts["ProjectInfoHowText"]} <span className='text-red-500'>{texts["ProjectInfoHowText_Framework"]}</span>
                    </p>
                  </Card>
                  <Card className="h-[100%] w-[60%] bg-slate-600 dark:bg-slate-700 flex">
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <span className='text-[#111d42]'>Moje Zainteresowania!</span>
                    </h5>
                    <p className="font-normal  text-gray-300 dark:text-gray-400">
                    
                    </p>
                  </Card>
                </Carousel>
              </div>
                
            </div>
        </div>
       
        {/* MOJE UMIEJĘTNOŚCI */}   
        <div id='mySkills' className="flex relative z-5 max-h-[90%] min-h-[60%] flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
            <div className={`flex flex-col  gap-3 bg-[#111d42] m-8 p-5 w-[90%] h-96 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
                <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">Moje Umiejętności</h1>
              <div className="border-t border-gray-500 items-center"></div>
              <Carousel>
                <div className="h-[100%] w-[70%]  flex">
                  <div className='m-auto flex flex-wrap w-[50%] gap-1'>
                    <Badge size="l" color="success" icon={HiCheck}>HTML</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>JS</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>TS</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>CSS</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>Tailwind</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>JQuery</Badge>
                    <Badge size="l" color="warning" icon={HiMinusCircle}>FLUTTER</Badge>
                    <Badge size="l" color="purple" icon={HiArrowCircleUp}>REACT</Badge>
                  </div>
                  <div className='m-auto w-[50%] flex justify-center items-center'>
                    <p className='text-5xl font-bold'>
                      <span className="bg-gradient-to-r from-[#213b9b] to-red-500 text-transparent bg-clip-text">FRONTEND</span>
                    </p>
                  </div>
                </div>
                <div className="h-[100%] w-[70%] flex gap-1">
                  <div className='m-auto flex flex-wrap w-[50%] gap-1'>
                    <Badge size="l" color="success" icon={HiCheck}>.NET Core</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>.NET Framework</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>Entity Framework</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>REST API</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>FIRESTORE</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>SQL</Badge>
                  </div> 
                  <div className=' m-auto w-[50%] flex items-center justify-center'>
                    <p className='text-5xl font-bold'>
                      <span className="bg-gradient-to-r from-[#213b9b] to-red-500 text-transparent bg-clip-text">BACKEND</span>
                    </p>
                  </div>
                </div>
                <div className="h-[100%] w-[70%]  flex">
                  <div className='m-auto flex flex-wrap w-[50%] gap-1'>
                    <Badge size="l" color="success" icon={HiCheck}>GIT</Badge>
                    <Badge size="l" color="purple" icon={HiArrowCircleUp}>GCP</Badge>
                    <Badge size="l" color="success" icon={HiCheck}>AppSheet</Badge>
                    <Badge size="l" color="purple" icon={HiArrowCircleUp}>Google Script</Badge>
                  </div>
                  <div className=' m-auto w-[50%] flex items-center justify-center'>
                    <p className='text-5xl font-bold'>
                      <span className="bg-gradient-to-r from-[#213b9b] to-red-500 text-transparent bg-clip-text">INNE</span>
                    </p>
                  </div>
                </div>
              </Carousel>
                        
              <Footer.LinkGroup  className='bg-[#111d42] gap-1 justify-center flex '>         
                  <Badge color="success" icon={HiCheck}>Dobrze Znane</Badge>
                  <Badge color="warning" icon={HiMinusCircle}>Znam Podstawy</Badge>
                  <Badge color="purple" icon={HiArrowCircleUp}>Uczę Się Aktualnie</Badge>
              </Footer.LinkGroup>    
            </div>
            
        </div>

        {/* DOŚWIACZENIE ZAWODOWE */}   
        <div id='myExperience' className="flex relative z-5 max-h-[80%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-[0px_0px_70px_#f8c78f] border-8 border-solid border-black border-opacity-5 gap-10 justify-center content-center max-md:flex-col max-md:gap-3 ">
          <div className={`flex flex-col  gap-3 bg-[#111d42] my-auto p-5 w-[90%] h-96 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
              <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">Doświadczenie Zawodowe</h1>
            <div className="border-t border-gray-500 items-center"></div>
            
              <div className='flex gap-3 w-[100%] h-[100%]'>
                <div className='bg-slate-200 w-1/3 h-100%'> Użyć TIMELINE</div>
                <div className='bg-slate-200 w-1/3 h-100%'></div>
                <div className='bg-slate-200 w-1/3 h-100%'></div>
              </div>
              
          </div>
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
       
      
       

      
        
      <div className="mb-16 h-56 sm:h-64 xl:h-80 2xl:h-96">
       
      </div> 

          
      </div>
      <LanguageChangeHook language={lang}></LanguageChangeHook>
    </div>
  );
}

export default App;
