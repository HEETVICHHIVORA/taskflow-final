import {toast} from "react-hot-toast";
import React, { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";


import { useNavigate, Link } from "react-router-dom";
import "../index.css"
function Signup() {
    const navigate = useNavigate();
    
    const {setloader}=useContext(AppContext);


    const [name,setName]=useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee'); // Default role
    const[eye,setEye] = useState(true);
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(password.length<8 ){
            toast.error("Password should be minimum 8 characters")
        }
       else if(password.length>16){
            toast.error("Password should be less than 16 characters")
        }
        else{
            setloader(true)
            try {
                const response = await fetch('http://localhost:4000/signup', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                        role: role
                    }),
                    credentials: "include"
                });
                const res=await response.json();
                console.log(res);
                if (res.success) {
                    navigate("/", { state: { id: email } });
                    toast.success(res.message);
                } else{
                    toast.error(res.message);
                }
            } catch (error) {
                alert("An error occurred. Please try again.");
                console.error(error);
            }
            setloader(false)
        }

        
        
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-semibold mb-6 text-center">Signup</h1>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Username</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="xyz07"
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="xyz@gmail.com"
                            required
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type={eye?"password":"text"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="xyz123@*"
                            required

                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />

                        {eye?<IoMdEye className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(false)
                        }}/>:<IoMdEyeOff className="text-xl absolute right-2 bottom-3" onClick={()=>{
                            setEye(true);
                        }}/>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="developer">Employee</option>
                            <option value="manager">Manager</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">OR</p>
                    <Link to="/login" className="text-blue-500 hover:underline">Login Page</Link>
                </div>
            </div>
        </div>
    );
}

export default Signup;
