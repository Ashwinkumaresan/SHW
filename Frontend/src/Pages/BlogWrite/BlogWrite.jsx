import axios from "axios";
import { useState } from "react";
import "./BlogWrite.css";
import { useNavigate } from "react-router";

export const BlogWrite = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Author: "",
        Content: "",
        Title: "",
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:8000/blog/create/", formData, {
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
            navigate("/doctorprofile")

        } catch (error) {
            console.error("Error submitting data:", error.response?.data || error.message);
            alert("Error submitting data");
        }
    };

    return (
        <>
            <div className="recordupper d-flex justify-content-center align-items-center">
                <h1 className="fw-bold display-3 playwritter">Create A blog</h1>
            </div>
            <div className="container recordCreate mt-5 mb-5 p-3">
                <form onSubmit={handleSubmit}>
                    {[
                        { label: "Title", name: "Title" },
                        { label: "Author", name: "Author" },
                        { label: "Content", name: "Content" },
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
