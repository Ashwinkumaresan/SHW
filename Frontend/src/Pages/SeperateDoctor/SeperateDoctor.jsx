import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'  // Import useParams
import { useNavigate } from "react-router-dom";
import "./SeperateDoctor.css"

export const SeperateDoctor = () => {
    const navigate = useNavigate(); // Ensure it's inside the component

      const [doctorln, setDoctorln] = useState("medical id")
      const [username, setUsername] = useState("medical id")
      const [gender, setGender] = useState("medical id")
      const [age, setAge] = useState("medical id")
      const [deg, setDeg] = useState("")
      const [hospitalName, setHospitalName] = useState("medical id")
      const [bio, setBio] = useState("medical id")
      const [specialization, setSpecialization] = useState("")
      const [profilePic, setProfilePic] = useState("")
      const [location, setLocation] = useState("Location")
    const { word2 } = useParams()  // Get the dynamic URL parameter
    console.log("Extracted word2:", word2)

    const token = localStorage.getItem("access_token")
    const fetchData = async () => {
        if(!token){
            navigate("/login");
            return
          }
        try {
            if (!word2) {
                console.warn("word2 is empty or undefined")
                return
            }

            const response = await fetch(`http://127.0.0.1:8000/doctor/${word2}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const text = await response.text()
            if (!text) {
                console.warn("Empty response received")
                return
            }

            const data = JSON.parse(text)
            console.log("Fetched data:", data)
            console.log("Fetched data:", data.Name)
            const profil_pic = `http://127.0.0.1:8000/${data.profile}`
            setDoctorln(data.LicenseNumber)
            setUsername(data.Name)
            setHospitalName(data.HospitalName)
            setLocation(data.Location)
            setDeg(data.Degree)
            setSpecialization(data.Specialization)
            setProfilePic(profil_pic)
        } catch (error) {
            console.error("Fetch error:", error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [word2])

    const [formData, setFormData] = useState({
        Doctor: "",
        Reason: "",
        Date: "",
        Time: "",
    });
        // Handle input change
        const handleChange = (e) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const[openPopup, setOpenPopup]=useState(false)
      
        // To stop scrolling while popup open index-168
        if(openPopup)
        {
          document.body.classList.add('active_modal');
        }
        else
        {
          document.body.classList.remove('active_modal')
        }
        function Scroll() {
          window.scrollTo(0, 0);
        }
        const handleSubmit = async (e) => {
            alert("connected")
        }

    return (
        <>
        {
              openPopup &&
            <div className="popup_login">
              <button className="X" onClick={()=> setOpenPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></button>
              <div className="container createmeeting">
              <form onSubmit={handleSubmit}>
            <input type="text" onChange={handleChange} name="Doctor" value={formData.Doctor} className='mb-2 rounded p-2' style={{width:"100%"}} placeholder='Enter the patient id'/>
            <input type="text" onChange={handleChange} name="Reason" value={formData.Reason} className='mb-2 rounded p-2' style={{width:"100%"}} placeholder='Enter the meeting Reason'/>
            <input type="date" onChange={handleChange} name="Date" value={formData.Date} className='mb-2 rounded p-2' style={{width:"100%"}} />
            <input type="time" onChange={handleChange} name="Time" value={formData.Time} className='mb-2 rounded p-2' style={{width:"100%"}} />
            <button className='btn btn-primary' type='submit' style={{width:"100%"}}>Send</button>
        </form>
              </div>
            </div>
            }
        <div className="seperate">
            <div className="top">
                <div className="image">
                    <img src={profilePic} width={"100%"} alt="profile" />
                </div>
            </div>
            <div className="container p-5">
                <div className="details">
                    <h1 className='fs-1'> {username} </h1>
                    <p className='fs-5 m-0'>Degree: {deg} </p>
                    <p className='fs-5 m-0'>Specilization: {specialization} </p>
                    <p className='fs-5 m-0 p-4'> {bio} </p>
                    <p className='fs-5 m-0'>Lisence number: {doctorln} </p>
                    <p className='fs-5 m-0'>Hospital name: {hospitalName} </p>
                    <p className='fs-5 m-0'>Location:  {location} </p>
                    <button className='btn btn-primary my-3' style={{width:"100%"}} onClick={() => {setOpenPopup(true), Scroll()}}>Book now</button>
                </div>
            </div>
        </div>
        </>
    )
}
