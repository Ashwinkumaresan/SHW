import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"

export const Login = () => {
    const [invalid, setInvalid] = useState(false)
        const [formData, setFormData] = useState({
            username: "",
            password: "",
        });
        const navigate = useNavigate(); // Ensure it's inside the component

    
        // Handle input changes
        const handleChange = (e) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        };
    

        const handleSubmit = async (e) => {
            e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/login/", formData, {
            headers: { "Content-Type": "application/json" },
            });

            console.log("Response Data:", response.data); // Check what is returned
            alert("Data sent successfully!");

            if (response.status === 200) { // Check if request was successful
            console.log("Redirecting to:", response.data.redirect);
            navigate(response.data.redirect); // Navigate to profile
            } else {
            setError(response.data.error || "Something went wrong.");
            console.error("Error:", response.data.error);
            }
        } catch (error) {
            console.error("Error sending data:", error);
            setInvalid(true)
        }

            
                
            
            // const handleSubmit = async (e) => {
            //     e.preventDefault();
              
            //     try {
            //       const response = await fetch("http://127.0.0.1:8000/api/login/", {
            //         method: "POST",
            //         headers: {
            //           "Content-Type": "application/json",
            //         },
            //         body: JSON.stringify({ username, password }),
            //       });
              
            //       const data = await response.json();
            //       console.log("Response Data:", data);  // Debugging line
            //       console.log("Response Data:", data);  // Debugging line
            //       console.log("Response Data:", response.data.Login);  // Debugging line
              
            //       if (response.data.Login == "success") {
            //         console.log("Redirecting to:", data.redirect);  // Debugging line
            //         navigate("/profile");
            //       } else {
            //         setError(data.error);
            //         console.error("Error:", data.error);  // Debugging line
            //       }
            //     } catch (error) {
            //       console.error("Fetch error:", error);
            //       setError("Something went wrong.");
            //     }
            //     finally{
            //         console.log("finished")
            //     }
            // }

        };
        
    
        return (
            <>
            <div className="login">
                <div className="row">
                    <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 text-center pt-5">
                        <img src="logo.svg" className='text-center' alt="" />
                        <h2 className='text-center playwritter fs-2 p-0 m-1 fw-bolder'>Connet with doctors</h2>
                        <p className='text-center px-3 m-1 mb-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, illum.</p>
                        <h2>Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="pt-2 ps-5 pe-5 d-flex flex-column align-items-center">   
                                {
                                    invalid && 
                                    <p className=' alert alert-danger m-2 p-1 ' style={{width:"100%"}}>Invalid username or password</p>
                                } 
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

