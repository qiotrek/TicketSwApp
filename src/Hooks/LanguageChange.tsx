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

            <div className="my-auto "
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}>
                <img id="actualLangImage"  className="my-auto cursor-pointer hover:opacity-70 h-8 w-8 rounded-lg" src={require('../assets/pl.svg').default} alt="" />
                <div className="size-auto font-bold text-lg text-zinc-500">
                    {isHovered && 
                        <div className="fixed bg-[#111d42] mx-auto  w-[5%] h-[12%] border-solid rounded-lg shadow-lg z-10 shadow-transparent justify-center content-center">
                            <li className="flex items-center justify-between py-1 pl-4 pr-5 text-sm leading-6">
                                <button onClick={()=>SetLanguage("pl")}>
                                    <img className="my-auto cursor-pointer hover:opacity-70 h-9 w-9 rounded-lg" src={require('../assets/pl.svg').default} alt="" />   
                                </button>                             
                            </li>
                            <div className="border-t w-[70%] border-gray-700"></div>
                            <li className="flex items-center justify-between py-1 pl-4 pr-5 text-sm leading-6">
                                <button onClick={()=>SetLanguage("en")}>
                                    <img className="my-auto cursor-pointer hover:opacity-70 h-9 w-9 rounded-lg" src={require('../assets/gb.svg').default} alt="" />   
                                </button>                             
                            </li>
                        </div>
                    }
                </div>
            </div>
            
    )
}