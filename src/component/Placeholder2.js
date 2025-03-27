import { useState } from "react";
import "./story.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Story() {
  // Dummy data for placeholder
  const placeholderData = [
    {
      t1: "",
      t1img: "",
      matchType: "",
      dateTimeGMT: new Date().toISOString(),
      t2: "",
      t2img: "",
    },
    {
      t1: "",
      t1img: "",
      matchType: "",
      dateTimeGMT: new Date().toISOString(),
      t2: "",
      t2img: "",
    },
    {
      t1: "",
      t1img: "",
      matchType: "",
      dateTimeGMT: new Date().toISOString(),
      t2: "",
      t2img: "",
    },
  ];

  const [article] = useState(placeholderData); // Use the placeholder data

  // Render
  return (
    <div className="story">
      {article.map((element, idx) => (
        <div className="match-card" key={idx}>
          <div className="team">
            <div className="team-img placeholder-img"></div>{" "}
            {/* Placeholder image */}
            <span>{element.t1}</span> {/* Placeholder team name */}
          </div>
          <div className="vs">
            <span>{element.matchType}</span>
            <span className="date-time"></span>
          </div>
          <div className="team">
            <div className="team-img placeholder-img"></div>{" "}
            {/* Placeholder image */}
            <span>{element.t2}</span> {/* Placeholder team name */}
          </div>
        </div>
      ))}
    </div>
  );
}
