import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newimage1 from "./newimage1.jpg";
import newimage2 from "./newimage2.jpg";
import newimage3 from "./newimage3.jpg";
import newimage4 from "./newimage4.jpg";
import newimage5 from "./newimage5.jpg";
import newimage6 from "./newimage6.jpg";
import Allitems from "./Allitems";

export default function Home() {
  const [image, setImage] = useState(0);
  const images = [newimage1, newimage2, newimage3, newimage4, newimage5, newimage6];

  useEffect(() => {
    const interval = setInterval(() => {
      setImage((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="bg-cover bg-center bg-fixed"
      style={{
        minHeight: "100vh",
        backgroundImage: `
          radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), 
          radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%), 
          url(${images[image]})
        `,
      }}
    >
      <div className="d-flex justify-content-evenly">
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
  );
}
