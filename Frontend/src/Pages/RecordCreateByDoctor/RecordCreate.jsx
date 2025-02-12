import axios from "axios";
import { useState } from "react";
import "./RecordCreate.css";

export const RecordCreate = () => {
    const [formData, setFormData] = useState({
        Symptoms: "",
        Diagnosis: "",
        TestsConducted: "",
        TreatmentPlan: "",
        AdditionalNotes: "",
        MedicalID: "",
        SensitiveInformation: "",
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
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
            });

            alert("Data submitted successfully!");
            console.log(response.data);

            // If the response includes tokens, update localStorage
            if (response.data.access && response.data.refresh) {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
            }

        } catch (error) {
            console.error("Error submitting data:", error.response?.data || error.message);
            alert("Error submitting data");
        }
    };

    return (
        <>
            <div className="recordupper d-flex justify-content-center align-items-center">
                <h1 className="fw-bold display-3">Record Create</h1>
            </div>
            <div className="container recordCreate mt-5 mb-5 p-3">
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "User Profile", name: "MedicalID" },
                        { label: "Symptoms", name: "Symptoms" },
                        { label: "Diagnosis", name: "Diagnosis" },
                        { label: "Tests Conducted", name: "TestsConducted" },
                        { label: "Treatment Plan", name: "TreatmentPlan" },
                        { label: "Sensitive Information", name: "SensitiveInformation" },
                        { label: "Additional Notes", name: "AdditionalNotes" },
                    ].map(({ label, name }) => (
                        <div key={name} className="mb-3">
                            <label>{label}</label>
                            <input
                                type="text"
                                name={name}
                                placeholder={label}
                                value={formData[name]}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    ))}
                    <button type="submit" className="btn btn-primary w-100">
                        Submit
                    </button>
                </form>
            </div>
        </>
    );
};
