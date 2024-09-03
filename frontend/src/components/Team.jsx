export const Team =({group})=>{
    return <div className="w-full  px-3 hover:bg-slate-100 transition duration-200 cursor-pointer">
         <div className="flex p-2 border-b-2">
            <div className="bg-blue-200 rounded-full w-[12%] justify-center items-center mr-2 hidden lg:flex">
                   
            </div>
            <div>
                <p className="">
                    {group.name}
                </p>
                <p>
                    this is the last chat short . 
                </p>
            </div>
         </div>
    </div>
}