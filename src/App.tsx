import MyCard from './Components/CustomCard';
import DownloadCVHook from './Hooks/CVDownload';
import LanguageChangeHook from './Hooks/LanguageChange';
import './App.css';

function App() {

  const textsContent = localStorage.getItem('textsContent');
  const lang = localStorage.getItem('lang')??"pl";
  let texts:  Record<string, string> = {};
  if (textsContent) {
    texts= JSON.parse(textsContent);
  } 

  return (
    <div className="flex flex-col overflow-hidden bg-fixed" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>

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

      
      <div id="bgImage" className="min-h-screen gap-64 relative top-14 items-center bg-cover justify-center " >

        {/* <div className='rotate-180 relative max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-2xl shadow-[#f8c78f] border-3 border-sky-950  gap-10 justify-center content-center max-md:flex-col max-md:gap-3 '> */}
         
        {/* </div> */}
        <div className='flex relative max-h-[70%] min-h-96 flex-row my-96 mt-28 bg-[#213b9be1] shadow-2xl shadow-[#f8c78f] border-8 border-solid border-black border-opacity-5  gap-10 justify-center content-center max-md:flex-col max-md:gap-3 '>
          <MyCard title={texts["ProjectInfoHowTitle"]} text={texts["ProjectInfoHowText"]}></MyCard>
          <MyCard title={texts["ProjectInfoWhyTitle"]} text={texts["ProjectInfoWhyText"]}></MyCard>
          <MyCard title={texts["ProjectInfoHowMuchTitle"]} text={texts["ProjectInfoHowMuchText"]}></MyCard>
        </div>
        
        {/* <div className='relative max-h-[70%] min-h-96 flex-row my-10 mt-14 bg-[#213b9be1] shadow-2xl shadow-[#f8c78f]  gap-10 justify-center content-center max-md:flex-col max-md:gap-3 overflow-hidden'>
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent to-[#f8c78f]"></div>
          <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-transparent to-[#f8c78f]"></div>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-blue-500'>Oto Moja Strona Startowa</h1>
        </div> */}
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
          <h1 className='text-9xl font-bold text-red-500'>Oto Moja Strona StartowaOto Moja Strona StartowaOto Moja Strona Startowa</h1>
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
