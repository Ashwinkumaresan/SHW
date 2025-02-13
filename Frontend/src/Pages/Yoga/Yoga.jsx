import React, { useEffect, useState } from "react";
import "./Yoga.css"

export const Yoga = () => {
  const [yogaPose, setYogaPose] = useState(null); // ✅ Stores JSON data
  const [error, setError] = useState(null); // ✅ Handles fetch errors
  const [searchTerm, setSearchTerm] = useState(""); // ✅ Stores the search input

  useEffect(() => {
    fetch("/yoga-api.json") // ✅ Ensure JSON is placed inside the `public/` folder
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Data:", data);
        setYogaPose(data); // Store the fetched data
      })
      .catch((error) => {
        console.error("Error loading JSON:", error);
        setError("Failed to load data. Please try again later.");
      });
  }, []);

  // ✅ Show error message if fetch fails
  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  // ✅ Show loading until data is available
  if (!yogaPose) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  // Filter yoga poses based on the search term (case insensitive)
  const filteredYogaPoses = yogaPose.filter((pose) => {
    const poseName = pose.english_name.toLowerCase() + " " + pose.sanskrit_name.toLowerCase();
    return poseName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container yoga">    
        <div className="p-6 row">
            <div className="row text-center my-5">
                <p className="display-5 playwritter">Mental care</p>
            </div>
        <div className="mb-4 row yoga_input">
            <input
            type="text"
            placeholder="Search Yoga Pose"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            />
        </div>

        {filteredYogaPoses.length === 0 ? (
            <p className="text-center text-gray-500">No yoga poses found.</p>
        ) : (
            filteredYogaPoses.map((pose, index) => (
            <div key={index} className="mb-4 rounded p-3 card_profiles row">
                <h1 className="text-2xl font-bold row">
                {pose.english_name} {pose.sanskrit_name}
                </h1>
                <div className="row">
                    <div className="col-12 col-md-6">
                        <h2 className="text-lg font-semibold mt-4">Target Body Parts:</h2>
                        <ul className="list-disc pl-5">
                        {pose.target_body_parts?.map((part, index) => (
                            <li key={index}>{part}</li>
                        ))}
                        </ul>
                    </div> 
                    <div className="col">
                        <h2 className="text-lg font-semibold mt-4">Benefits:</h2>
                        <ul className="list-disc pl-5">
                        {pose.benefits?.map((benefit, index) => (
                            <li key={index}>{benefit}</li>
                        ))}
                        </ul>
                    </div> 
                </div>    
                <div className="row">
                    <h2 className="text-lg font-semibold mt-4">Procedure:</h2>
                    <ol className="list-decimal pl-5">
                    {pose.procedure?.map((step, index) => (
                        <li key={index} className="mt-1">{step}</li>
                    ))}
                    </ol>
                </div>


                <h2 className="text-lg font-semibold mt-4">Contraindications:</h2>
                <ul className="list-disc pl-5 text-red-500">
                {pose.contraindications?.map((issue, index) => (
                    <li key={index}>{issue}</li>
                ))}
                </ul>

                {/* <p className="text-gray-500 mt-4">
                Created At: {pose.created_at ? new Date(pose.created_at).toLocaleDateString() : "N/A"}
                </p>
                <p className="text-gray-500">
                Updated At: {pose.updated_at ? new Date(pose.updated_at).toLocaleDateString() : "N/A"}
                </p> */}
            </div>
            ))
        )}
        </div>
    </div>
  );
};
