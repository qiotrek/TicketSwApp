import React from "react";

function MyCard({title,text}:any){
return (

    <div className='flex flex-col ml-6 bg-[#111d42] top-[10%] p-5 gap-3 w-[30%] h-[60%] border-solid rounded-2xl justify-center'> 
        <h1 className="size-auto  font-bold mibold text-center text-zinc-500">{title}</h1>
        <div className="border-t border-gray-500"></div>
        <span className="size-auto mt-3  font-bold text-lg text-zinc-500">{text}</span>
    </div>

)

}

export default MyCard