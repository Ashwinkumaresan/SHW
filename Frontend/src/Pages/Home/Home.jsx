import React, { useEffect, useState } from 'react'
import "./Home.css"
import axios from "axios"

export const Home = () => {
  const [User, setUser] = useState("hi")

  const user = async () =>{
    await axios.get("http://127.0.0.1:8000/").then(
      (response) => {
        console.log(response.data);
        setUser(response.data.Hello);
      }
    )
  }
  useEffect(()=>{
    user()
  },[])
  return (
    <>
    {/* <!-- Start of hero session  --> */}
    <div className="hero">
        <div className="d-flex flex-column text-center">
            <p className="mt-4 display-4 text-center p-0 m-1 fw-semibold">Choose your doctor</p>
            <p className="text-center playwritter fs-2 p-0 m-1 fw-bolder ">With confidence</p>
            <p className=" text-center p-0 m-1">Find trusted professionals for your health needs</p>
            <div className="row justify-content-center">
                <div className="col">
                    <button  className="btn btn-primary rounded-pill px-5 py-2">Book now</button>
                </div>
            </div>
        </div>
        <div className="container mt-3">
          <div className=" mt-1 row con img_con text-center">
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2 p-0 m-0">
              <img src="doc.svg" alt=""/>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2 p-0 m-0">
              <img src="doc.svg" alt=""/>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2 p-0 m-0">
              <img src="doc.svg" alt=""/>
            </div>
            <div className="col-12 col-md-3 col-lg-3 col-xl-3 col-xxl-3 mb-2 p-0 m-0">
              <img src="doc.svg" alt=""/>
            </div>
          </div>
        </div>
    </div>
    {/* <!-- End of hero session --> */}

    <div className="Reimbursement pt-5" id='res'>
      <div className="d-flex flex-column text-center">
        <p className="mt-4 display-4 text-center p-0 m-1 fw-semibold">Choose your doctor</p>
        <p className="text-center playwritter fs-2 p-0 m-1 fw-bolder ">Reimbursement</p>
        <p className=" text-center p-0 m-1">Access elite doctors and maximize your reimbursement</p>
      </div>
      
      <div className="container">
        <div className="row box_row">
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="for_family pt-5 ps-3 pe-3">
              <h1 className="fs-2 pb-3">For Family</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet, lorem velit feugiat elit, eget blandit arcu odio ut tortor mauris.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="for_individual pt-5 ps-3 pe-3">
              <h1 className="fs-2 pb-3">For Individual</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet, lorem velit feugiat elit, eget blandit arcu odio ut tortor mauris.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="for_advisor pt-5 ps-3 pe-3">
              <h1 className="fs-2 pb-3">For Advisor</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet, lorem velit feugiat elit, eget blandit arcu odio ut tortor mauris.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-4">
            <div className="for_gaurdian pt-5 ps-3 pe-3">
              <h1 className="fs-2 pb-3">For Garudian Control</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet, lorem velit feugiat elit, eget blandit arcu odio ut tortor mauris.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div>
          {/* <div className="col-3">
            <div className="for_individual ps-3 pe-3">
              <h1 className="fs-2 pb-4">For Individual</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="for_advisor pt-4 ps-3 pe-3">
              <h1 className="fs-2 pb-4">For Advisor</h1>
              <hr/>
              <div className="d-flex">
                <p className="fs-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur auctor, justo nec pellentesque aliquet.</p>
                <button className="ms-2 btn btn-light">
                  <img src="button_explore.svg" alt=""/>
                </button>
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* <h1 className="fs-2 pb-3">{User}</h1> */}
    </div>

    {/*  Start of premiun data */}

    <div className="premium">
      <div className="d-flex flex-column text-center premium_data">
        <p className="mt-4 display-4 text-center p-0 m-1 fw-semibold">Premium Data</p>
        <p className="text-center playwritter fs-2 p-0 m-1 fw-bolder ">Platinum</p>
        <p className=" text-center p-0 m-1">Explore a variety of pasta options with detailed descriptions</p>
        <div className="container">
        <div className="row">
          <div className="col-12 premium_img mt-5 mb-5 img-fluid">
            {/* <img src="premium_data.svg" className='img-thumbnail mt-5 mb-5' alt="" /> */}
          </div>
        </div>
        </div>
      </div>
    </div>
    <p>hi</p>

    {/*  End of premiun data */}

    </>
  )
}
