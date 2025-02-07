import React from 'react'
import { NavLink } from "react-router";
import "./Navbar.css"

export const Navbar = () => {
  return (
    <>
          <nav class="navbar navbar-expand-lg nav_bar" >
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
    <NavLink to="/login" end>
      <button className='btn btn-primary px-4 rounded-pill'>Login</button>
    </NavLink>
  </div>
</nav>
    </>
  )
}
