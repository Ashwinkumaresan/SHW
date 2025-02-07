import React, { useEffect, useState } from 'react'
import "./Profile.css"

export const Profile = () => {
  const [medicalId, setMedicalId] = useState("medical id")
  const [username, setUsername] = useState("medical id")
  const [gender, setGender] = useState("medical id")
  const [age, setAge] = useState("medical id")
  const [dob, setDob] = useState("medical id")
  const [phoneno, setPhoneNo] = useState("medical id")

  const fetchData = async (e) => {
    try{
      const response = await fetch('http://127.0.0.1:8000/profile/')
      const data = await response.json()
      console.log(data)
    }
    catch(error){
      console.log(error)
      }
  }
  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
    <div className="profile">
      <div className="container p-md-0 p-3">  
        <div className="row mb-5">
          <div className="col-12 col-md-7 col-lg-7 col-xl-7 col-xxl-7 rounded  mt-5">
            <div className="row">
              {/* left bento grid */}
              <div className="col-12 rounded">
                <div className="row">
                  <div className="col-12 col-md-6 ">
                    <div className="profile_pic p-4">
                      <img src="profile_pic.jpg"
                      alt="profile pic" className='img-thumbnail rounded'/>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 p-4">
                    <p className='p-2 m-0'><span className='fw-bolder'>Medical ID:</span> {medicalId}</p>
                    <p className='p-2 m-0'><span className='fw-bolder'>Username:</span> {username}</p>
                    <p className='p-2 m-0'><span className='fw-bolder'>Gender:</span> {gender}</p>
                    <p className='p-2 m-0'><span className='fw-bolder'>Age:</span> {age}</p>
                    <p className='p-2 m-0'><span className='fw-bolder'>Date of Birth:</span>{age}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 mt-5">
                <div className="row">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 rounded" style={{backgroundColor:"blue", color:"white"}}>
                    <div className='d-flex justify-content-between mt-2'>
                      <p className='p-0 m-0 fw-bolder'>Medical record</p>
                      <a href="#" style={{color:"white"}}>View more</a>
                    </div>
                    <div className="row m-1 my-3"style={{borderTop: "2px solid white"}}></div>
                    <div className="row p-2">
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid white"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid white"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid white"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid white"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                      <div className="col-12 mb-2 rounded" style={{border:"2px solid white"}}>
                        <p className='m-0 my-1'>1. Day one</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-5 rounded offset-md-1 mt-5 mt-md-0 text-center " style={{backgroundColor:"blue", color:"white"}}>
                    <div className='d-flex justify-content-between mt-2'>
                        <p className='p-0 m-0 fw-bolder'>Fastband</p>
                        <a href="#" style={{color:"white"}}>Edit config</a>
                    </div>
                    <div className="row m-1 my-3"style={{borderTop: "2px solid white"}}></div>
                    <img src="fastband.png" alt="Fastband" className='img-fluid ' />
                    <p>Fastrack 2.33.45</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 offset-md-1 mt-5 ">
            <div className="row">
              <div className="col-12 py-2 rounded text-center" style={{backgroundColor:"blue", color:"white"}}>
                <p className='h3 fs-3 m-0'>Location</p>
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded">
                <img src="M1_qr.png" alt="Qrcode" className='img-fluid' />
              </div>
            </div>
            <div className="row">
              <div className="col-12 rounded" style={{border:"2px solid blue"}}>
                <p className='p-0 m-0 fw-bolder'>Presonal details</p>
                <hr />
                <p className='p-2 m-0 mb-4'><span className='fw-bolder'>Phone number:</span> {phoneno} </p>
                <button className='btn btn-primary mb-4' style={{width:"100%"}}>Edit profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
