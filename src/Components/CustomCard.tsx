import React from "react";

function MyCard({text}:any){
return (

    <div className='flex flex-col ml-6 bg-[#111d42] top-[10%] p-5 gap-3 w-[30%] h-[60%] border-solid rounded-2xl justify-center'> 
        <span className="size-5  font-bold font-semibold text-lg text-zinc-500">TEST</span>
        <span className="size-5  font-bold font-semibold text-lg text-zinc-500">{text}</span>
    </div>

)

}

export default MyCard