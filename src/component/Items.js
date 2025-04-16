import React, { useState, useEffect } from "react";
import News from "./News";
import Carousel from "react-bootstrap/Carousel";
import Placeholder from "./Placeholder";
import './card.css';
export default function Items() {
  // useState
  const [page, setPage] = useState(1);
  const [article, setarticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  // Fetch function to get news articles
  const news = async () => {
    try {
      setLoading(true);
      let URL = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=2eb8ccb5950e474296d19efb7e10403b&page=${page}`;
      let response = await fetch(URL);
      let data = await response.json();
      // Store the articles array in the article state variable
      setarticle(data.articles);
      setResult(data.totalResults);
      setLoading(false);
    } catch (err) {
      // Handle error
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // useEffect 1
  useEffect(() => {
    const totalPages = result > 0 ? Math.ceil(result / 10) : 1;
    const interval = setInterval(() => {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        return nextPage <= totalPages ? nextPage : 1;
      });
    }, 10000000);
    news();
    return () => clearInterval(interval);
  }, []);

  if (!article || !Array.isArray(article)) {
    return <Placeholder />;
  }
  

  // useEffect 2
  useEffect(() => {
    news();
  }, [page]);

  // Loading and error messages
  if (loading || error) {
    return <Placeholder />;
  }

  // slide control
  const handleSelect = (selectedIndex) => {
    if (selectedIndex >= article.length) {
      setActiveIndex(0); // Loop back to the first slide if we've reached the last one
    } else {
      setActiveIndex(selectedIndex);
    }
  };

  // Render the articles inside a carousel
  return (
    <div>
      {/* carousel */}
      <Carousel
        className="custom-carousel"
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
        activeIndex={activeIndex} // Controlled component, sets the active slide
        onSelect={handleSelect} // Trigger when a slide is selected
        interval={3000} // 5 seconds between automatic slide transitions
        controls={true} // Show previous/next controls
        indicators={true} // Show slide indicators (dots at the bottom)
      >
        {article.map((element, index) => (
          <Carousel.Item key={index}>
            <News
              imageUrl={element.urlToImage}
              newsurl={element.url}
              title={element.title}
              // time={element.publishedAt}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      {/* carousel end */}
        </div>
  );
}
