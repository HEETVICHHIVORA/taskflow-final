import { useNavigate } from "react-router-dom";
import {toast} from "react-hot-toast";

function Temp(){
    const navigate=useNavigate();
    async function logout(){
        try{
            const response=await fetch('http://localhost:4000/logout',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:'include'
            })

            const res=await response.json();

            if(res.success){
                toast.success(res.message);
                navigate('/')
            }
        }
        catch(e){
            toast.error(e);
        }
    }

    return <div className="w-screen h-screen flex justify-center gap-x-10 items-center bg-slate-600">
        <h2 className="font-bold text-5xl text-white">Welcome</h2>
        <button className="font-bold text-2xl bg-opacity-20 p-2 rounded-md bg-red-400" onClick={logout}>Log Out</button>
    </div>
}

export default Temp;