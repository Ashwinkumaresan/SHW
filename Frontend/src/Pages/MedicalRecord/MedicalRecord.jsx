import React, { useEffect, useRef, useState } from 'react'
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
// npm install jspdf html2canvas

import "./MedicalRecord.css"

export const MedicalRecord = () => {
    const navigate = useNavigate(); // Ensure it's inside the component

    const [name, setName] = useState("name")
    const [age, setAge] = useState("age")
    const [dob, setDob] = useState("DOB")
    const [address, setAddress] = useState("address")
    const [phone, setPhone] = useState("phone")
    const [gender, setGender] = useState("Male")
    const [country, setCountry] = useState("India")
    const [sympotoms, setSympotoms] = useState("s")
    const [diagnosis, setDiagnosis] = useState("d")
    const [testConducted, setTestConducted] = useState("test conducted")
    const [treatmentPlan, setTreatementPlan] = useState("plan")
    const [aditionalNotes, setADitionalNotes] = useState("aditional plan")
    const contentRef = useRef(null);

    const handleDownload = () => {
      const content = contentRef.current;
      
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png"); // Convert content to an image
        const pdf = new jsPDF("p", "mm", "a4"); // A4 size PDF
  
        // Adjust image size to fit A4
        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("content.pdf"); // Download the file
      });
    };
    const fetchData = async (e) => {
        const token = localStorage.getItem("access_token")
        if(!token){
          navigate("/login");
          return
        }
        try{
          const response = await fetch('http://127.0.0.1:8000/profile/',{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
              },
          })
          const data = await response.json()
          console.log(data)
          setName(data.User)
          setAge(data.Age)
          setDob(data.DateOfBirth)
          setGender(data.Gender)
          setCountry(data.Country)
          setAddress(data.Address)
        }catch(error){
            console.log(error)
        }
        }
        useEffect(() => {
            fetchData()
        },[])

  
    return (
      <div>
        <div ref={contentRef} className='pt-4 ps-4'>
        <h1 class="">Medical Record</h1>
        <hr />
        <p class=" fs-3 m-0 mt-5"><span class = " fw-bold ">Name:</span> {name} </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">DOB:</span> {dob} </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Gender:</span> {gender} </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Age:</span> {age} </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Phone no:</span> {phone} </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Address:</span> {address} </p>
        <p class=" fs-3 m-0 mb-5"><span class = " fw-bold ">Country:</span> {country} </p>
        <hr />
        <h4 class="mt-3 fw-bold">Sympotoms:</h4>
        <p class=" fs-3 m-0 ms-5"> {sympotoms} </p>
        <h4 class="mt-3 fw-bold">Diagnosis:</h4>
        <p class=" fs-3 m-0 ms-5"> {diagnosis} </p>
        <h4 class="mt-3 fw-bold">Tests Conducted:</h4>
        <p class=" fs-3 m-0 ms-5"> {testConducted} </p>
        <h4 class="mt-3 fw-bold">Treatment plan:</h4>
        <p class=" fs-3 m-0 ms-5"> {treatmentPlan} </p>
        <hr />
        <p class=" fs-3 mt-5"><span>Additional notes:</span> {aditionalNotes} </p>        
        </div>
        <div className='d-flex ps-4 mb-4'>
            <button onClick={handleDownload} className='btn btn-primary me-2' style={{ marginTop: "10px", display: "block" }}>
            Download as PDF
            </button>
            <button  className='btn btn-dark' style={{ marginTop: "10px", display: "block" }}>
            Back
            </button>
        </div>
      </div>
    );
  
}
