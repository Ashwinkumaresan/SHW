import React, { useState } from 'react'
import axios from "axios";
import "./Signup.css"

export const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post("http://127.0.0.1:8000/login/", formData, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         });
    //         console.log(response.data);
    //         alert("Data sent successfully!");
    //     } catch (error) {
    //         console.error("Error sending data:", error);
    //         alert("error")
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", formData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(response.data);
            alert("Data sent successfully!");
        } catch (error) {
            console.error("Error sending data:", error);
            alert("Error: " + (error.response?.data?.error || "Unknown error"));
        }
    };
    

    return (
        <>
        <div className="login">
            <div className="row">
                <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center pt-5">
                    <img src="logo.svg" className='text-center' alt="" />
                    <h2 className='text-center playwritter fs-2 p-0 m-1 fw-bolder'>Connet with doctors</h2>
                    <p className='text-center px-3 m-1 mb-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, illum.</p>
                    <h2>Signup</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="pt-4 ps-5 pe-5 d-flex flex-column align-items-center">    
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter Name"
                                value={formData.username}
                                onChange={handleChange}
                                style={{width:"100%"}}
                                className='mb-4 p-2'
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                style={{width:"100%"}}
                                className='mb-4 p-2'
                            />
                            <button type="submit" className='btn btn-primary p-2' style={{width:"100%"}}>Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 pt-5  d-none d-md-block d-lg-block d-xl-block d-xxl-block">
                    <div>
                        <p class="m-0 h1" >Compassion is the soul of medicine –</p>
                        <p class="m-0 h1" > Sign Up and navigate your future!</p>
                        <p class="mt-3 fs-3 playwritter fw-bolder" >Healing is a matter of time</p>
                    </div>
                    <div>
                        <img src="lifesaver.jpg" className='img-fluid rounded' alt="" />
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
