import React from "react";

export default function MyCard({title,text,w=30,h}:any){
return (

    <div className={`flex flex-col gap-3 bg-[#111d42] my-auto p-5 w-[${w}%] h-72 max-h-80 min-h-44 shadow-2xl border-solid rounded-2xl max-md:w-[70%] max-md:mx-auto max-md:my-8 max-md:h-56`}> 
        <h1 className="dictionaryText size-auto font-bold mibold text-center text-zinc-500">{title}</h1>
        <div className="border-t border-gray-500"></div>
        <span className="dictionaryText mt-3 overflow-y-scroll no-scrollbar font-bold text-lg text-zinc-500 ">{text}</span>
    </div>

)

}
