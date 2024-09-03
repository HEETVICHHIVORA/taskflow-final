import {Sidebar} from "../components/Sidebar"
import { Appbar } from "../components/Appbar";


 const Homepage=()=>{
    return (
    <div className="w-screen h-screen overflow-x-hidden">
        <Appbar/>
    <Sidebar></Sidebar>
    </div>)
    
}

export default Homepage;