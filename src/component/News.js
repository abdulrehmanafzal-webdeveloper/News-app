import React from "react";
import "./card.css";
import 'bootstrap/dist/css/bootstrap.min.css';
export default function News(props) {
  // props
  let { imageUrl, newsurl, title, time } = props;
return (
  <div>
    {/* Card */}
    <div className="card" id="card-attraction" style={{ borderRadius: '8px', overflow: 'hidden' }}>
      <a href={newsurl} target="_blank"> 
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1111%2Fr1413429_2_1296x729_16%2D9.jpg"
          }
          className="card-img" 
          alt="..."
          style={{ 
            height: '298px', 
            objectFit: 'cover', // Ensures image covers the area without distortion
          }}
        />
        <div
          className="card-img-overlay p-2 d-flex flex-col-reverse mb-4"
          id="titletime"
        >
          <h5 className="card-title font-bold text-xl text-white">{title}</h5>
          <p className="card-text">
            <small className="text-white">{time}</small>
          </p>
        </div>
      </a>
    </div>
    {/* card end */}
  </div>
);
}