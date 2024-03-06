import { useEffect, useState } from "react";
import texts from "../assets/texts.json"

type Language = 'pl' | 'gb';

export default function LanguageChange({language}:any){

    useEffect(()=>{
        SetLanguage(language);
    },[language]);

    const SetLanguage =(lang:Language)=>{
        let langTexts=null;
        let actualLangImage=document.getElementById("actualLangImage") as HTMLImageElement;
        if(actualLangImage&&lang==="gb")
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

            <div className="fixed flex flex-col bottom-6 gap-2 right-6 my-auto "
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
                
            {isHovered&&
                <div className="flex flex-col gap-2 my-auto">
                    <button onClick={() => SetLanguage(language=="pl"?"gb":"pl")}>
                        <img className="cursor-pointer hover:opacity-70 h-10 w-10 rounded-full" src={language=="gb"?require('../assets/pl.svg').default:require('../assets/gb.svg').default} alt="" />
                    </button>
                </div>
            }
                <div>
                    <img id="actualLangImage" className="m-auto cursor-pointer border-2 border-[#f8c78f] hover:opacity-70 h-10 w-10 rounded-full" src={require('../assets/'+(language=="pl"?'pl':'gb')+'.svg').default} alt="" />
                </div>
            </div>
            
    )
}