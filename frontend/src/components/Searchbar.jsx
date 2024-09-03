import { IoIosSearch } from "react-icons/io";

export const Searchbar=()=>{
    return <div className="w-[90%] mx-auto my-1  bg-slate-300 rounded-md px-2 py-1 flex gap-x-2 items-center border-r-2">
        <div > <IoIosSearch /> </div>
        <div className="w-full"><input className="bg-transparent outline-none text-sm w-[100%]" placeholder="search" type="text" /> </div>
        
    </div>
}