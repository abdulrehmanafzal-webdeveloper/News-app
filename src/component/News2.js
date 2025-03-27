import React from "react";
import "./story.css";
export default function News2(props) {
  let { imageUrl, newsurl, title, time } = props;
  return (
    <div>
      {/* card */}
      <div className="card image" style={{ borderRadius: "8px", overflow: "hidden",height:"300px"}}>
        <a href={newsurl} target="_blank" className="truncate-text">
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://a1.espncdn.com/combiner/i?img=%2Fphoto%2F2024%2F1111%2Fr1413429_2_1296x729_16%2D9.jpg"
            }
            className="card-img"
            alt="..."
            style={{
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
              height: "150px",
              objectFit: "cover", // Ensures image covers the area without distortion
            }}
          />
          <div className="card-body">
            <p className="card-text truncate-text  text-2xl">{title ? title : "No title"}</p>
          </div>
        </a>
      </div>
      {/* card end */}
    </div>
  );
}
