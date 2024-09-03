import { Searchbar } from "./Searchbar"
import { Team } from "./Team"

export const Sidebar =()=>{
    return <div className="w-[30%] h-screen">

        <Searchbar></Searchbar>


        <div className="mt-10 w-full border-r-2">
        <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
       <Team></Team>
        </div>

    </div>
       
}