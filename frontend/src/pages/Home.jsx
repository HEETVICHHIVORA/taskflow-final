import React from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link to handle navigation
import { useEffect } from "react";

function Home() {
    const location = useLocation();
    const userId = location.state?.id || "User";
    const navigate=useNavigate();
    
    async function checkCookie(){
        try{
            const response=await fetch('http://localhost:4000/alreadyloggedin',{
                method:'GET',
                headers:{
                    "Content-Type": "application/json"
                },
                credentials:"include"
            })

            const res=await response.json();

            if(res.success){
                navigate('/home')
            }
        }
        catch(e){
            console.log(e);
        }
    }

    useEffect(()=>{
        checkCookie();
    },[])

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="#" className="flex items-center space-x-4">
                        <img
                            src="https://logodix.com/logo/652004.jpg"
                            alt="Logo"
                            className="w-14 h-14 rounded-full shadow-lg"
                        />
                        <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold">TaskFlo</span> 
                    </a>
                    <div className="flex space-x-6 md:space-x-8">
                        <Link to="/about" className="hover:text-gray-200 transition duration-300 text-lg">About Us</Link>
                        <Link to="/contact" className="hover:text-gray-200 transition duration-300 text-lg">Contact Us</Link>
                        <Link to="/signup" className="hover:text-gray-200 transition duration-300 text-lg">Signup</Link>
                        <Link to="/login" className="hover:text-gray-200 transition duration-300 text-lg">Login</Link>
                    </div>
                </div>
            </nav>

            <div id="carouselExampleFade" className="carousel slide carousel-fade relative">
                <div className="carousel-inner relative w-full overflow-hidden rounded-lg">
                    <div className="carousel-item active">
                        <img src='https://cdn.pixabay.com/photo/2020/04/19/08/17/watercolor-5062356_640.jpg' className="d-block w-full h-96 object-cover" alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img src='https://img.lovepik.com/background/20211022/large/lovepik-pink-watercolor-background-image_401716466.jpg' className="d-block w-full h-96 object-cover" alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img src='https://static.vecteezy.com/system/resources/previews/001/225/972/original/abstract-watercolor-soft-pink-texture-background-vector.jpg' className="d-block w-full h-96 object-cover" alt="Third slide" />
                    </div>
                </div>
                <button className="carousel-control-prev absolute top-1/2 transform -translate-y-1/2 left-0" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon bg-gray-800 rounded-full p-3" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next absolute top-1/2 transform -translate-y-1/2 right-0" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon bg-gray-800 rounded-full p-3" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}

export default Home;