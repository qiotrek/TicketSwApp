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

   const textWhy= "Na początku projekt tworzyłem dla własnego rozwinięcia umiejętności w zakresie React'a, natomiast z czasem zacząłem przeobrażać to w swoją wizytówkę.";
   const titleWhy="DLACZEGO?";
   const textHowMany= "Całkowita praca nad projektem zajęła mi..";//coś o tym że  był tworzony po godzinach i w wolnej chwili
   const titleHowMany="ILE?";

  return (
    <div className="flex flex-col overflow-hidden">
       <nav className="max-h-18 bg-cover fixed flex w-screen gap-8 justify-between px-5 z-10" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>
          <DownloadCVHook></DownloadCVHook>
          <LanguageChangeHook language={lang}></LanguageChangeHook>
          <div>
            <button className="m-4 text-white hover:cursor-pointer">O mnie</button>
            <button className="m-4 text-white hover:cursor-pointer">Moje Umiejętności</button>
            <button className="m-4 text-white hover:cursor-pointer">Doświadczenie zawodowe</button>
          </div>
        </nav>

      
      <div id="bgImage" className="min-h-screen relative top-14 items-center bg-cover justify-center " style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/assets/bg.jpg)` }}>

        <div className='flex flex-row m-10 mt-14 gap-4 max-sm:flex-col'>
        <MyCard title={texts["ProjectInfoHowTitle"]} text={texts["ProjectInfoHowText"]}></MyCard>
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
