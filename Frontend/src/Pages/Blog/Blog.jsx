import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [blogs, setBlogs] = useState([]); // State for storing blog data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Backend API URL
  const backendUrl = "http://127.0.0.1:8000"; // 🔹 Your Django backend URL

  // Fetch blog data from backend
  useEffect(() => {
    axios
      .get(`${backendUrl}/blog/`) // 🔹 Correct API endpoint
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(
    (blog) => blog.Title && blog.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h1 className="playwritter display-4 p-5 text-center fw-medium">Healthy Blog</h1>

      {/* Search Input */}
      <div className="container blog_input">
        <div className="blog text-center row">
          <div className="col-12 p-0 m-0">
            <input
              type="text"
              placeholder="Search for the blog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("Searching for:", searchQuery);
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Show loading or error */}
      <div className="container p-4">
        {loading && <p className="text-center">Loading blogs...</p>}
        {error && <p className="text-center text-danger">{error}</p>}
      </div>

      {/* Display Blogs */}
      <div className="container">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <div key={blog.pk} className="row blogContent p-4 my-4">
              <div className="col-12 col-md-6">
                <div>
                  <h4 className="fw-bold p-0 m-0">{blog.Title}</h4>
                  <p className="p-0 m-0 fs-6">{blog.Author}</p>
                </div>
                <div className="p-3">
                  <p className="m-0 p-0 fs-5">{blog.Content}</p>
                </div>
              </div>
              <div className="col">
                {/* Display Image */}
                {blog.Image ? (
                  <img
                    src={`${backendUrl}${blog.Image}`} // 🔹 Correctly adds backend URL to image path
                    alt={blog.Title}
                    className="blog-image mb-3 img-fluid"
                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                  />
                ) : (
                  <img
                    src="/placeholder.jpg" // 🔹 Replace with your default image
                    alt="Placeholder"
                    className="blog-image mb-3 img-fluid"
                    style={{ width: "100%", height: "auto", borderRadius: "10px" }}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No matching blogs found.</p>
        )}
      </div>
    </>
  );
};
