import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Blog.css";

export const Blog = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [blogs, setBlogs] = useState([]); // State for storing blog data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  // Backend API URL
  const backendUrl = "http://127.0.0.1:8000"; // Your Django backend URL

  // Fetch blog data from backend
  useEffect(() => {
    axios
      .get(`${backendUrl}/blog/`) // Correct API endpoint
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
        <div className="row ">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div key={blog.id} className="col-12 mb-4 l-card">
                <div className="row align-items-center">
                  {/* Blog Content Column */}
                  <div className="col-md-6">
                    <main className="">
                      <section className="l-card__text">
                        <h3>{blog.Title}</h3>
                        <p>{blog.Content}</p>
                      </section>
                      <section className="l-card__user">
                        <div className="l-card__userInfo">
                          <span>By: {blog.Author}</span>
                        </div>
                      </section>
                    </main>
                  </div>

                  {/* Blog Image Column */}
                  <div className="col-md-6 text-center">
                    {blog.Image ? (
                      <img
                        src={`${backendUrl}${blog.Image}`}
                        alt={blog.Title}
                        className="img-fluid rounded shadow"
                        style={{ maxHeight: "300px", objectFit: "cover" }}
                      />
                    ) : (
                      <p className="text-muted">No Image Available</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No matching blogs found.</p>
          )}
        </div>
      </div>
    </>
  );
};
