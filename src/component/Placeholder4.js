import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton"; // Import Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import default styles
import "bootstrap/dist/css/bootstrap.min.css";
const Placeholder4 = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Set loading to false when data is loaded
    }, 3000); // Simulate a 3-second API call
  }, []);

  return (
    <div className="card" id="card-attraction" style={{ height: "300px" }}>
      <a
        href={isLoading ? "#" : true}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Skeleton Image */}
        {isLoading ? (
          <Skeleton height={200} width="100%" />
        ) : (
          <img className="card-img" alt="..." />
        )}

        <div
          className="card-img-overlay p-2 d-flex flex-column-reverse mb-4"
          id="titletime"
        >
          {/* Skeleton Title */}
          {isLoading ? (
            <Skeleton height={24} width="50%" />
          ) : (
            <h5 className="card-title font-bold text-xl text-white"></h5>
          )}

          {/* Skeleton Time */}
          {isLoading ? (
            <Skeleton height={14} width="40%" />
          ) : (
            <p className="card-text">
              <small className="text-white"></small>
            </p>
          )}
        </div>
      </a>
    </div>
  );
};

export default Placeholder4;
