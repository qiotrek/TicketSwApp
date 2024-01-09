import { useEffect, useState } from "react";
import texts from "../assets/texts.json"

type Language = 'pl' | 'en';

export default function LanguageChange({language}:any){

    useEffect(()=>{
        SetLanguage(language);
    },[language]);

    const SetLanguage =(lang:Language)=>{
        let langTexts=null;
        let actualLangImage=document.getElementById("actualLangImage") as HTMLImageElement;
        if(actualLangImage&&lang==="en")
        {
            actualLangImage.src=require('../assets/gb.svg').default;
        }
        else{
            actualLangImage.src= require('../assets/pl.svg').default;
        }

        langTexts = texts.Texts[lang];
        let jsonString = JSON.stringify(langTexts);
        localStorage.setItem('lang', lang);
        localStorage.setItem('textsContent', jsonString);
        if(language!=null &&lang!=language){
            window.location.reload();
        }
        
    }

    const [isHovered, setHovered] = useState(false);
    return(

            <div className="fixed bottom-5 right-5 my-auto "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>

                <div className="size-auto fixed bottom-36 right-16 font-bold text-lg  text-zinc-500">
                    {isHovered && 
                        <div className="fixed flex flex-col gap-2 mx-auto  w-[5%] h-[12%] border-solid rounded-lg shadow-lg z-10 shadow-transparent justify-center content-center">

                                <button onClick={()=>SetLanguage("pl")}>
                                    <img className="my-auto cursor-pointer hover:opacity-70 h-10 w-10 rounded-full" src={require('../assets/pl.svg').default} alt="" />   
                                </button>                             
              
                            {/* <div className="border-t w-[70%] border-gray-700"></div> */}
                            
                                <button onClick={()=>SetLanguage("en")}>
                                    <img className="my-auto cursor-pointer hover:opacity-70 h-10 w-10 rounded-full" src={require('../assets/gb.svg').default} alt="" />   
                                </button>                             
                
                        </div>
                    }
                </div>
                <img id="actualLangImage"  className="my-auto cursor-pointer hover:opacity-70 h-10 w-10 rounded-full" src={require('../assets/pl.svg').default} alt="" />
              
            </div>
            
    )
}