import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './DoctorCardProfile.css';

export const DoctorsCardProfile = () => {
    const [doctors, setDoctors] = useState([]);
    const backendUrl = "http://127.0.0.1:8000";

    useEffect(() => {
        axios.get(`${backendUrl}/doctor/`)
            .then((response) => {
                console.log("API Response:", response.data);
                setDoctors(response.data.results || response.data); // Handle different response structures
            })
            .catch((error) => {
                console.error("Error fetching doctors:", error);
            });
    }, []);

    return (
        <div className="container">
            <div className="row">
                {doctors.map((doctor, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4 my-3">
                        <div className="card doctor-card shadow-sm p-3">
                            <div style={{width:"300px", height:"250px"}} className='text-center'>
                                <img
                                    src={`${backendUrl}${doctor.profile}`}
                                    alt="Doctor"
                                    className="card-img-top img-fluid"
                                />
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">{doctor.Name || "Doctor Name"}</h5>
                                <p className='m-0 p-0'><strong>Specialization</strong></p>
                                <p className="card-text m-0 p-0">{doctor.Specialization || "Specialization not available."}</p>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item"><strong>License No:</strong> {doctor.LicenseNumber || "N/A"}</li>
                                    <li className="list-group-item"><strong>Degree:</strong> {doctor.Degree || "N/A"}</li>
                                    <li className="list-group-item"><strong>Hospital Name:</strong> {doctor.HospitalName || "N/A"}</li>
                                    <li className="list-group-item"><strong>Location:</strong> {doctor.Location || "N/A"}</li>
                                </ul>
                                <a href={`/doctor/${doctor.LicenseNumber}`}>sdkjgsij</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
