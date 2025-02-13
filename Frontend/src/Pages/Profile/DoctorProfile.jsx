import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import "./Profile.css"

export const DoctorProfile = () => {
  const navigate = useNavigate(); // Ensure it's inside the component
  
  const [medicalId, setMedicalId] = useState("medical id")
  const [username, setUsername] = useState("medical id")
  const [gender, setGender] = useState("medical id")
  const [age, setAge] = useState("medical id")
  const [deg, setDeg] = useState("")
  const [hospitalName, setHospitalName] = useState("medical id")
  const [phoneno, setPhoneNo] = useState("medical id")
  const [specialization, setSpecialization] = useState("")
  const [profilePic, setProfilePic] = useState("")
  const [location, setLocation] = useState("Location")

  const fetchData = async (e) => {
    const token = localStorage.getItem("access_token")
    if(!token){
      navigate("/doctorlogin");
      return
    }
    try{
      const response = await fetch('http://127.0.0.1:8000/profile/doctor/',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          },
      })
      const data = await response.json()
      const profil_pic = `http://127.0.0.1:8000/${data.profile}`
      console.log(data)
      setHospitalName(data.HospitalName)
      setMedicalId(data.LicenseNumber)
      setDeg(data.Degree)
      setSpecialization(data.Specialization)
      setGender(data.gender)
      setUsername(data.userName)
      setProfilePic(profil_pic)
      setLocation(data.Location)
      // console.log(data.User)
      // console.log(data.Gender)
      // setMedicalId(data.MedicalID)
      // setGender(data.Gender)
      // setAge(data.Age)
      // setDob(data.DateOfBirth)
      // setPhoneNo(data.PhoneNumber)
      // setQrcode(qr)
    }
    catch(error){
      console.log(error)
      }
  }

  useEffect(()=>{
    fetchData()
  },[])
  
  //   try {
  //     const response = await fetch(qrcode);
  //     const blob = await response.blob();
  //     const url = URL.createObjectURL(blob);
  
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${medicalId}_qr.png`; 
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     URL.revokeObjectURL(url); 
  //   } catch (error) {
  //     console.error("Failed to download QR code:", error);
  //   }
  // };

  const logout = () =>{
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    navigate("/")
  }

    const[openPopup, setOpenPopup]=useState(false)
  
    // To stop scrolling while popup open index-168
    if(openPopup)
    {
      document.body.classList.add('active_modal');
    }
    else
    {
      document.body.classList.remove('active_modal');
    }
    function Scroll() {
      window.scrollTo(0, 0);
    }

  return (
    <>

{
      openPopup &&
    <div className="popup_login">
      <button className="X" onClick={()=> setOpenPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></button>
      <div className="container createmeeting">
        <input type="text" className='mb-2 rounded p-2' style={{width:"100%"}} placeholder='Enter the patient id'/>
        <input type="text" className='mb-2 rounded p-2' style={{width:"100%"}} placeholder='Enter the meeting link'/>
        <button className='btn btn-primary' style={{width:"100%"}}>Send</button>
      </div>
    </div>
    }

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
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Degree:</span> {deg}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Gender:</span> {gender}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Hospital name:</span>{hospitalName}</p>
                    <p className='p-2 m-0 fs-5'><span className='fw-bolder'>Specialization:</span>{specialization}</p>
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
                        <p className='p-0 m-0 fw-bolder'>Fastband</p>
                        <a href="#">Edit config</a>
                    </div>
                    <hr />
                    <img src="fastband.png" alt="Fastband" className='img-fluid ' />
                    <p>Fastrack 2.33.45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 offset-md-1 mt-5 card_profiles pt-4 d-flex flex-column justify-content-center">
            <div className="row">
              <div className="col-12 py-2 rounded text-center ">
                <p className='h5 fs-4 m-0'><span className='fw-bolder'>Doctor ID:</span> {medicalId} </p>
                <button className='btn btn-primary mt-2' onClick={() => {[setOpenPopup(true), scroll]}}>Create Meeting</button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded p-2 text-center">
                <div className='p-3 my-2' style={{height:"50vh", border:"2px dashed grey", borderRadius:"4px"}}>
                <img src='blog.png' alt="Qrcode" className='img-fluid' width={350} />
                <a href="/blogwrite">
                  <button className='btn btn-outline-primary mb-4' style={{width:"100%"}}>+Blog</button>
                </a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded text-center">
                {/* <button type='button' className='btn btn-outline-primary mb-4' style={{width:"100%"}}>Download</button> */}
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
