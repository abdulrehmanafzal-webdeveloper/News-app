import { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import './story.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Placeholder2 from "./Placeholder2";
export default function Story() {
  // usestate
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0); // activeIndex for carouselfor calculations

  // Fetching top stories from the API
  const topstories = async () => {
    try {
      setLoading(true);
      const URL = `https://api.nytimes.com/svc/topstories/v2/world.json?api-key=GjrEiuqgLHTZsUM6lNhcDwGMt4xA1Tqj`;
      const response = await fetch(URL);
      const data = await response.json();
      setArticle(data.results); // Store the articles array in the state
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // useEffect 1 - Fetch stories when the component mounts or page state changes
  useEffect(() => {
    topstories(); // Fetch stories whenever the page changes
  }, []); // Only depend on page for re-fetching the data

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
    return <Placeholder2/>;
  }

  if (error) {
    return <Placeholder2/>;
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
            <div className="story">
              <span className="text-black font-bold">Top Articles</span>
              {chunk.map((element, idx) => (
                <a href={element.url} target="_blank" key={idx}>
                  <p>{element.title}</p>
                </a>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
      {/* carousel */}
    </div>
  );
}
