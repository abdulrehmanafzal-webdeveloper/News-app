import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter as BrowserRouter, Routes, Route, Link } from "react-router-dom";
import newimage1 from "./newimage1.jpg";
import newimage2 from "./newimage2.jpg";
import newimage3 from "./newimage3.jpg";
import newimage4 from "./newimage4.jpg";
import newimage5 from "./newimage5.jpg";
import newimage6 from "./newimage6.jpg";
import Allitems from "./Allitems";
import Items4 from "./Items4";
import Login from "./Login";
import Sign from "./Sign";
export default function Navbar() {
  const [image, setimage] = useState(0);
  // Path to images
  const images = [
    newimage1,
    newimage2,
    newimage3,
    newimage4,
    newimage5,
    newimage6,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setimage((prevIndex) => {
        return (prevIndex + 1) % images.length;
      });
    }, 50000);
    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className="bg-cover bg-center bg-fixed"
              style={{
                height: "100%",
                backgroundImage: `
                  radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), 
                  radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%), 
                  url(${images[image]})
                `,
              }}
            >
              <div className="d-flex justify-content-evenly">
                {/* Use Link instead of <a> for navigation */}
                <Link
                  to="/Login"
                  className="btn btn-outline-secondary btn-sm px-3 py-0.8 mr-2 text-white mt-3"
                  style={{ fontSize: "16px", width: "82px" }}
                >
                  Login
                </Link>
                <Link
                  to="/Sign"
                  className="btn btn-outline-secondary btn-sm px-3 py-1 mr-2 text-white mt-3"
                  style={{ fontSize: "16px" }}
                >
                  Sign In
                </Link>
              </div>
              <Allitems />
            </div>
          }
        />

        {/* Display Items4 for specific categories */}
        <Route
          path="/science"
          element={<Items4 key="science" category="science" />}
        />
        <Route
          path="/health"
          element={<Items4 key="health" category="health" />}
        />
        <Route
          path="/entertainment"
          element={<Items4 key="entertainment" category="entertainment" />}
        />
        <Route
          path="/sports"
          element={<Items4 key="sports" category="sports" />}
        />
        <Route
          path="/business"
          element={<Items4 key="business" category="business" />}
        />
        <Route
          path="/technology"
          element={<Items4 key="technology" category="technology" />}
        />

        {/* Add routes for Login and Sign In */}
        <Route path="/Login" element={<Login />} />
        <Route path="/Sign" element={<Sign />} />
      </Routes>
    </BrowserRouter>
  );
}


