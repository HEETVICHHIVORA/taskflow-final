import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

export const Searchbar=({groups,setgroups})=>{

    const [searchInput,setsearchInput]=useState("");

    async function searchGroups() {
        try {
            const response = await fetch('http://localhost:4000/searchGroups', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prefix: searchInput
                }),
                credentials:'include'
            });

            const result = await response.json();
            if (result.success) {
                setgroups(result.groups);
                console.log("All teams fetched successfully",result.groups);
            } else {
                console.error("Failed to save:", result.message);
            }
        } catch (error) {
            console.error("Error saving audio:", error);
        }
    }
     
    function changeHandler(e){
        setsearchInput(e.target.value);
    }

    useEffect(()=>{
        searchGroups();
    },[searchInput])

    
    return <div className="w-[90%] mx-auto my-1  bg-slate-300 rounded-md px-2 py-1 flex gap-x-2 items-center border-r-2">
        <div > <IoIosSearch /> </div>
        <div className="w-full">
            <input 
            className="bg-transparent outline-none text-sm w-[100%]" placeholder="search" type="text" 
            value={searchInput}
            onInput={changeHandler}/> 
        </div>
    </div>
}