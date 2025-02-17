import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"

export const Navbar = () => {
  const navigate = useNavigate(); // Ensure it's inside the component
  const [button, setButton] = useState("Login")
  const [link, setLink] = useState("/login")
  useEffect(()=>{

    if(localStorage.getItem("access_token")){
      setButton("Profile")
      setLink("/profile")
      setOpenPopup(false)
    }
  },[])

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
  function login(){
    if(!localStorage.getItem("access_token")){
      setOpenPopup(true)
      Scroll()
    }
    else{
      setButton("Profile")
      navigate("/profile");
    }
  }

  return (
    <>
          <nav class="navbar navbar-expand-lg nav_bar " >
  <div class="container">
    <a class="navbar-brand" href="#">
      <img src="logo.svg" alt="logo" width={150} />
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{border:"none", outline:"none", background:"none"}}>
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse nav_center" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#res">Reimbursement</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
    </div>
    <NavLink to={link} end>
    </NavLink>
      <button className='btn btn-primary px-4 rounded-pill' onClick={login}> {button} </button>
  </div>
</nav>
{
      openPopup &&
    <div className="popup_login">
      <button className="X" onClick={()=> setOpenPopup(false)}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"/></svg></button>
      <div className="popup_login_container container">
        <div className="row">
          <div className="col-12 col-md-6"style={{padding:0}}>
            <div className="home_kitchen">
              <p className="business playwritter"></p>
              <h1 className='display-1'>For <span>Users</span></h1>
              <p className="popup_para fs-5">Efficient platform for cloud kitchens to manage orders and connect with customers easily.</p>
              <button className='btn btn-primary'><a href="/login">Login</a> </button>
              <p className='fs-6'>Don't  have account? <span><a href="/kitchen-sign-in" className="sign_up_para">Sign up</a></span></p>
            </div>
          </div>
          <div className="col pt-3" style={{padding:0}}>
            <div className="home_customer">
              <h1 className='display-1'>For <span>Doctors</span></h1>
              <p className="popup_para fs-5">Efficient platform for cloud kitchens to manage orders and connect with customers easily.</p>
                <a href="/doctorlogin" style={{textDecoration:"none", width:"100%"}}>
                  <button className='btn btn-outline-primary'>Login</button>
                </a>
              <p className='fs-6'>Don't  have account? <span><a href="#" className="sign_up_para">Sign up</a></span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    }
    </>
  )
}
