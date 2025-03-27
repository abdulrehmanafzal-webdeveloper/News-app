import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./story.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Placeholder2 from "./Placeholder2";
export default function Story() {
  // usestate
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Fetching top stories from the API
  const sports = async () => {
    try {
      setLoading(true);
      const URL = `https://api.cricapi.com/v1/cricScore?apikey=7989e094-e21b-4c9e-a554-3d452a2700a1`;
      const response = await fetch(URL);
      const data = await response.json();
      setArticle(data.data); // Store the articles array in the state
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // useEffect 1
  useEffect(() => {
    sports();
  }, []);

  // slide control
  const handleSelect = (selectedIndex) => {
    if (selectedIndex >= article.length) {
      setActiveIndex(0); // Loop back to the first slide if we've reached the last one
    } else {
      setActiveIndex(selectedIndex);
    }
  };

  // Loading and error handling
  if (loading) {
    return <Placeholder2 />;
  }

  if (error) {
    return <Placeholder2 />;
  }

  // chunkArray
  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }

    return chunks;
  };

  const articleChunks = chunkArray(article, 3);

  // render
  return (
    <div>
      {/* carousel */}
      <Carousel
        className="custom-carousel2"
        prevIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        }
        nextIcon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
        }
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={10000}
        controls={true}
        indicators={true}
      >
        {articleChunks.map((chunk, index) => (
          <Carousel.Item key={index}>
            <div className="match-container">
            <span className="text-black font-bold">Live Match</span>
              {chunk.map((element, idx) => (
                <div className="match-card" key={idx}>
                  <div className="team">
                    <img
                      src={element.t1img || "https://g.cricapi.com/iapi/61-637991981464151764.webp?w=48"}
                      alt={element.t1}
                      className="team-img"
                    />
                    <span>
                    {(element.t1.match(/\[(.*?)\]/)?.[1] || element.t1).slice(0, 4) + (element.t1.length > 4 ? '...' : '')}

                    </span>
                  </div>
                  <div className="vs">
                    <span>{element.matchType}</span>
                    <span className="date-time">
                    {new Date(element.dateTimeGMT).toLocaleDateString()} {new Date(element.dateTimeGMT).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}

                    </span>
                  </div>
                  <div className="team">
                    <img
                      src={element.t2img || "https://g.cricapi.com/iapi/61-637991981464151764.webp?w=48"}
                      alt={element.t2}
                      className="team-img"
                    />
                    <span>
                    {(element.t2.match(/\[(.*?)\]/)?.[1] || element.t2).slice(0, 4) + (element.t2.length > 4 ? '...' : '')}

                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* carousel */}
    </div>
  );
}
