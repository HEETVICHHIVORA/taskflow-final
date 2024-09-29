import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
import './Home.css'; 

function Home() {
    const location = useLocation();
    const userId = location.state?.id || "User";
    const navigate = useNavigate();
    const { setloader } = useContext(AppContext);
    
    async function checkCookie() {
        setloader(true);
        try {
            const response = await fetch('http://localhost:4000/alreadyloggedin', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const res = await response.json();

            if (res.success) {
                navigate('/home');
            }
        } catch (e) {
            console.log(e);
        }
        setloader(false);
    }

    useEffect(() => {
        checkCookie();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 font-open-sans">
            <nav className="bg-gray-800 text-white shadow-lg">
                <div className="container mx-auto px-5 py-2 flex items-center justify-between">
                    <a href="#" className="flex items-center"> {/* space kam*/}
                        <img
                            src="../public/image.png"
                            alt="Logo"
                            className="w-11 h-11 rounded-full"
                        />
                        <span className="text-3xl md:text-4xl lg:text-4xl font-poppins font-bold">askflo</span>
                    </a>
                    <div className="flex space-x-6 md:space-x-8">
                        <Link to="/about" className="hover:text-teal-400 transition duration-300 text-lg font-semibold">About Us</Link>
                        <Link to="/login" className="hover:text-teal-400 transition duration-300 text-lg font-semibold">Login</Link>
                    </div>
                </div>
            </nav>

            <section className="bg-white animate-fadeIn">
                <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 font-poppins mb-6">
                            Welcome to TaskFlo
                        </h1>
                        <p className="text-lg md:text-xl text-gray-700 mb-8">
                            TaskFlo optimizes your workflows. Empower your team to achieve more together.
                        </p>
                        <Link to="/signup" className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-8 rounded-full text-lg transition duration-300 font-semibold transform hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                    <div className="md:w-1/2 mt-10 md:mt-0">
                        <img src="https://www.linearity.io/blog/content/images/2022/03/62024e4e277c46d3ff2630ea_Corporate-Illustrations-Thumbnail.png" alt="TaskFlo illustration" className="rounded-lg" />
                    </div>
                </div>
            </section>

            <section className="bg-gray-100 py-20 animate-fadeIn">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 font-poppins">
                        About Us
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 transition-transform transform hover:scale-105 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h3>
                            <p className="text-gray-600">
                                We envision seamless collaboration. Our aim is to simplify project management.
                            </p>
                        </div>
                        <div className="text-center p-6 transition-transform transform hover:scale-105 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                            <p className="text-gray-600">
                                We provide the tools to boost productivity and enhance communication.
                            </p>
                        </div>
                        <div className="text-center p-6 transition-transform transform hover:scale-105 bg-white shadow-md rounded-lg">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Values</h3>
                            <p className="text-gray-600">
                                We value innovation, collaboration, and excellence in our solutions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-20 animate-fadeIn">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12 font-poppins">
                        Our Services
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Management</h3>
                            <p className="text-gray-600">
                                Streamline your projects from start to finish with real-time tracking.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Team Collaboration</h3>
                            <p className="text-gray-600">
                                Enhance communication and teamwork on a unified platform.
                            </p>
                        </div>
                        <div className="text-center p-6 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 transform hover:scale-105 shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics & Reporting</h3>
                            <p className="text-gray-600">
                                Make informed decisions with detailed metrics and insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-gray-800 py-20 animate-fadeIn">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 font-poppins">
                        Get in Touch
                    </h2>
                    <p className="text-lg text-gray-300 mb-6">
                        Contact us to learn more.
                    </p>
                    <Link to="/contact" className="bg-teal-600 text-white py-3 px-8 rounded-full text-lg hover:bg-teal-500 transition duration-300 font-semibold">
                        Contact Us
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default Home;
