import axios from "axios";
import { useState } from "react";
import "./RecordCreate.css"

export const RecordCreate = () => {
    const [formData, setFormData] = useState({
        symptoms: "",
        diagnosis: "",
        testsConducted: "",
        treatmentPlan: "",
        additionalNotes: "",
        userProfile: "",
        sensitiveInformation: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/record/create", formData, {
                headers: { "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("access_token") ,
                 },
                
            });

            alert("Data submitted successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Error submitting data");
        }
        const res = await fetch("http://127.0.0.1:8000/record/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          if (!res.ok) throw new Error("Error is backend response");
          const data = await res.json();
              localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
    };

    return (
        <>
        <div className="recordupper d-flex justify-content-center align-items-center ">
            <h1 className="fw-bold display-3">Record Create</h1>
        </div>
        <div className="container recordCreate mt-5 mb-5 p-3">
            <form onSubmit={handleSubmit}>
                <label htmlFor="">User profile</label>
                <input type="text" name="userProfile" placeholder="User Profile" value={formData.userProfile} onChange={handleChange} />
                <label htmlFor="">Symptoms</label>
                <input type="text" name="symptoms" placeholder="Symptoms" value={formData.symptoms} onChange={handleChange} />
                <label htmlFor="">Diagnosis</label>
                <input type="text" name="diagnosis" placeholder="Diagnosis" value={formData.diagnosis} onChange={handleChange} />
                <label htmlFor="">Test conducted</label>
                <input type="text" name="testsConducted" placeholder="Tests Conducted" value={formData.testsConducted} onChange={handleChange} />
                <label htmlFor="">Treatment plan</label>
                <input type="text" name="treatmentPlan" placeholder="Treatment Plan" value={formData.treatmentPlan} onChange={handleChange} />
                <label htmlFor="">Sensitive information</label>
                <input type="text" name="sensitiveInformation" placeholder="Sensitive Information" value={formData.sensitiveInformation} onChange={handleChange} />
                <label htmlFor="">Additional notes</label>
                <input type="text" name="additionalNotes" placeholder="Additional Notes" value={formData.additionalNotes} onChange={handleChange} />
                <button type="submit" className="btn btn-primary" style={{width:"100%"}}>Submit</button>
            </form>
        </div>
        </>
    );
}
