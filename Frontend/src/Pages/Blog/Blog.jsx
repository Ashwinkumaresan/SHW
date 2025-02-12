import React, { useState } from 'react'
import "./Blog.css"
// import { Link } from 'react-router-dom'

export const Blog = () => {
    const [searchQuery, setSearchQuery] = useState(""); // State for search input

    // Sample Blog Data (Replace with API data if needed)
    const blogs = [
      { id: 1, title: "Healthy Eating Habits", author: "Dr. Smith", content: "Lorem ipsum dolor sit amet..." },
      { id: 2, title: "Benefits of Yoga", author: "Dr. John", content: "Lorem ipsum dolor sit amet..." },
      { id: 3, title: "Mental Health Awareness", author: "Dr. Jane", content: "Lorem ipsum dolor sit amet..." },
    ];
  
    const filteredBlogs = blogs.filter(blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <>
        <h1 className="playwritter display-4 p-5 text-center fw-medium">Healthy Blog</h1>
        <div className="container blog_input">  
          <div className="blog text-center row">
            <div className="col-11 p-0 m-0">
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
            <div className="col-1 p-0 m-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                <path d="M9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l5.6 5.6q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-5.6-5.6q-.75.6-1.725.95T9.5 16m0-2q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/>
              </svg>
            </div>
          </div>
        </div>
        <div className="container p-4">
        </div>
  
        <div className="container">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <div key={blog.id} className="row blogContent p-4 my-4">
                <div className="col">
                  <div>
                    <h4 className="fw-bold p-0 m-0">{blog.title}</h4>
                    <p className="p-0 m-0 fs-6">{blog.author}</p>
                  </div>
                  <div className="p-3">
                    <p className="m-0 p-0 fs-5">{blog.content}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mt-4">No matching blogs found.</p>
          )}
        </div>
      </>
    );
}
