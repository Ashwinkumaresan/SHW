import React, { useEffect, useRef, useState } from 'react'
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
// npm install jspdf html2canvas

import "./MedicalRecord.css"

export const MedicalRecord = ( {word} ) => {
  console.log(word)
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
    const [hospitalName, setHospitalName] = useState("")
    const [doctorName, setDoctorName] = useState("")
    const [qrCode, setQrCode] = useState("")
    const contentRef = useRef(null);

    const handleDownload = () => {
      const content = contentRef.current;
    
      // Force mobile styles before capturing
      content.style.width = window.innerWidth + "px"; 
      content.style.maxWidth = "100%"; 
    
      const isMobile = window.innerWidth <= 768; // Detect mobile screen
      const scaleFactor = isMobile ? 3 : 2; 
    
      // Wait for all images to load before capturing the content
      const images = content.querySelectorAll("img");
      const imagePromises = Array.from(images).map((img) => {
        return new Promise((resolve) => {
          if (img.complete) {
            resolve();
          } else {
            img.onload = resolve;
            img.onerror = resolve;
          }
        });
      });
    
      Promise.all(imagePromises).then(() => {
        html2canvas(content, { 
          scale: scaleFactor, 
          useCORS: true,
          allowTaint: true,
          windowWidth: window.innerWidth, // Ensures proper responsive layout capture
          width: content.scrollWidth, // Captures full width in mobile
        }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png"); 
          const pdf = new jsPDF("p", "mm", "a4"); // A4 size
    
          const pdfWidth = 210; // A4 width in mm
          const pdfHeight = 297; // A4 height in mm
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width; // Scale image to fit width
          let heightLeft = imgHeight;
          let position = 0;
    
          // Add first page
          pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
          heightLeft -= pdfHeight;
    
          // If content is larger than one page, add new pages
          while (heightLeft > 0) {
            position -= pdfHeight; // Move content up for next page
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
          }
    
          // Restore original styles after capture
          content.style.width = "";
          content.style.maxWidth = "";
    
          pdf.save(`${word}.pdf`);
        });
      });
    };
    
    
    const fetchData = async (e) => {
        const token = localStorage.getItem("access_token")
        // if(!token){
        //   navigate("/login");
        //   return
        // }
        try{
          const response = await fetch(`http://127.0.0.1:8000/record/detail/${word}`,{
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}`,
              },
          })
          const data = await response.json()
          const profil_pic = `http://127.0.0.1:8000/${data.QRcode}`
          console.log(data)
          setName(data.Patient_Name)
          setAge(data.Age)
          setDob(data.Date)
          setGender(data.Gender)
          setCountry(data.Country)
          setAddress(data.Address)
          setSympotoms(data.Symptoms)
          setTestConducted(data.TestsConducted)
          setDiagnosis(data.Diagnosis)
          setTreatementPlan(data.TreatmentPlan)
          setADitionalNotes(data.AdditionalNotes)
          setPhone(data.phoneNo)
          setHospitalName(data.HospitalName)
          setDoctorName(data.Doctor)
          setQrCode(profil_pic)
        }catch(error){
            console.log(error)
        }
        }
        useEffect(() => {
            fetchData()
        },[])

  
    return (
      <div className='medical_record'>
        <div ref={contentRef} className='pt-4 ps-4'>
        <h1 class="">Medical Record</h1>
        <hr />
        <div className="row">
          <div className="col-8">
            <p class=" fs-3 m-0 mt-5"><span class = " fw-bold ">Name:</span> {name} </p>
            <p class=" fs-3 m-0"><span class = " fw-bold ">DOB:</span> {dob} </p>
            <p class=" fs-3 m-0"><span class = " fw-bold ">Gender:</span> {gender} </p>
            <p class=" fs-3 m-0"><span class = " fw-bold ">Age:</span> {age} </p>
            <p class=" fs-3 m-0"><span class = " fw-bold ">Phone no:</span> {phone} </p>
            <p class=" fs-3 m-0"><span class = " fw-bold ">Address:</span> {address} </p>
            <p class=" fs-3 m-0 mb-5"><span class = " fw-bold ">Country:</span> {country} </p>
          </div>
          <div className="col">
            <img src={qrCode} alt="" />
          </div>
        </div>
        <hr className='mb-5'/>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Doctor LN:</span> { doctorName } </p>
        <p class=" fs-3 m-0"><span class = " fw-bold ">Hospital name:</span> { hospitalName } </p>
        <hr className='my-5'/>
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
            <a href='/' style={{textDecoration:"none"}}>
              <button  className='btn btn-dark' style={{ marginTop: "10px", display: "block" }}>
              Back
              </button>
            </a>
        </div>
      </div>
    );
  
}
