import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Profile.css"
import axios from 'axios';

export const Profile = () => {
  const navigate = useNavigate(); // Ensure it's inside the component
  
  const [medicalId, setMedicalId] = useState("medical id")
  const [username, setUsername] = useState("medical id")
  const [gender, setGender] = useState("medical id")
  const [age, setAge] = useState("medical id")
  const [dob, setDob] = useState("medical id")
  const [phoneno, setPhoneNo] = useState("medical id")
  const [qrcode, setQrcode] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [location, setLocation] = useState("")
  const [link, setLink] = useState("")
  const [startstop, setStartStop] = useState()

  const token = localStorage.getItem("access_token")
  const fetchData = async (e) => {
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
      const qr = `http://127.0.0.1:8000/${data.QRCode}`
      const profil_pic = `http://127.0.0.1:8000/${data.ProfilePic}`
      console.log(data)
      console.log(data.User)
      console.log(data.Gender)
      setMedicalId(data.QRCode)
      setMedicalId(data.MedicalID)
      setUsername(data.User)
      setGender(data.Gender)
      setAge(data.Age)
      setDob(data.DateOfBirth)
      setPhoneNo(data.PhoneNumber)
      setQrcode(qr)
      setLocation(data.Country)
      setProfilePic(profil_pic)
      setLink(data.Link)
      // if(data.Link){
      //   setLink(data.Link)
      // }
      // else{
      //   alert("There is no meeting")
      // }
    }
    catch(error){
      console.log(error)
      }
  }

  useEffect(()=>{
    fetchData()
    // startMerting()
  },[])

  const startMerting = async (e) => {
    try{
      const res = await fetch('http://127.0.0.1:8000/profile/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await res.json()
      console.log(data.Link)
      if(!data.Link){
        alert("There is no meeting")
      }
    }
    catch(error){
      console.log(error)
    }
  }
  
  const downloadQR = async () => {
    try {
      const response = await fetch(qrcode);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = `${medicalId}_qr.png`; // Ensures file download instead of opening
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Free up memory
    } catch (error) {
      console.error("Failed to download QR code:", error);
    }
  };
  const logout = () =>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate("/")
  }

    const handleDelete = async (e) => {
      e.preventDefault();
  
      try {
          await axios.delete("http://127.0.0.1:8000/meet/remove", {
              headers: {
                  "Authorization": `Bearer ${localStorage.getItem("access_token")}`,  // Replace with actual token
              }
          });
  
          console.log("Delete request sent successfully");
      } catch (error) {
          console.error("Error deleting data:", error.response ? error.response.data : error);

      }
  };
  


  return (
    <>
    <div className="profile">
      <a href="/" className='back'>
        <button className=' fw-bold' >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="#333" d="M10 22L0 12L10 2l1.775 1.775L3.55 12l8.225 8.225z"/></svg>
        </button>
      </a>
      <div className="container p-md-0 p-3">  
        <div className="row mb-5">
          <div className="col-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 rounded  mt-5">
            <div className="row">
              {/* left bento grid */}
              <div className="col-12 rounded">
                <div className="row card_profiles">
                  <div className="col-12 col-md-6 text-center d-flex align-items-center justify-content-center">
                    <div className="profile_pic p-4 d-flex align-items-center justify-content-center">
                      <img src={profilePic}
                      alt="profile pic" className='img-thumbnail rounded' width={250} height={250}/>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 p-4 d-flex  justify-content-center flex-column ">
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Username:</span> {username}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Gender:</span> {gender}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Age:</span> {age}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Date of Birth:</span>{dob}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Location:</span> {location}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 rounded card_profiles">
                    <div className='d-flex justify-content-between mt-2'>
                      <p className='p-0 m-0 fw-bolder'>Medical record</p>
                      <a href="#">View more</a>
                    </div>
                    <hr />
                    <div className="row p-2">
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid grey"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid grey"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid grey"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid grey"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid grey"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 rounded offset-md-1 mt-5 mt-md-0 text-center card_profiles">
                    <div className='d-flex justify-content-between mt-2'>
                        <p className='p-0 m-0 fw-bolder'>Meeting's</p>
                    </div>
                    <hr />
                    <img src="meeting.png" alt="Fastband" className='img-fluid mb-2'  />
                    {/* { startstop && } */}
                    <div>
                      <a href={link} style={{width:"100%"}} onClick={startMerting}>
                        <button className='btn btn-primary' style={{width:"100%"}}>Start Meeting</button>
                      </a>
                        <button className='btn btn-outline-danger mt-2' onClick={handleDelete} style={{width:"100%"}}>Stop Meeting</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 offset-md-1 mt-5 card_profiles pt-4">
            <div className="row">
              <div className="col-12 py-2 rounded text-center ">
                <p className='h5 fs-4 m-0'><span className='fw-bolder'>Medical id:</span> {medicalId} </p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded p-2 text-center ">
                <img src={qrcode} alt="Qrcode" className='img-fluid' width={350} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded text-center">
                {/* <p className='p-0 m-0 fw-bolder'>Presonal details</p>
                <hr />
                <p className='p-2 m-0 mb-4'><span className='fw-bolder'>Phone number:</span> {phoneno} </p> */}
                {/* <a download='qr_code' target='_blank' href={qrcode} >
                  <button type='button' className='btn btn-outline-primary mb-4' style={{width:"100%"}}>Download</button>
                </a> */}
                <button type='button' onClick={downloadQR} className='btn btn-outline-primary mb-4' style={{width:"100%"}}>Download</button>
                <button className='btn btn-primary mb-4' style={{width:"100%"}}>Edit profile</button>
                <a href="#" onClick={logout}>Log out</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
