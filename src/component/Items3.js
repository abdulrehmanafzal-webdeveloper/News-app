import React, { useState, useEffect } from "react";
import Placeholder from "./Placeholder";
import News from "./News";
export default function Items3() {
  // useState
  const [article, setarticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch function 2
  const news = async () => {
    try {
      setLoading(true);
      let URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=2eb8ccb5950e474296d19efb7e10403b`;
      let response = await fetch(URL);
      let data = await response.json();
      // Store the articles array in the article state variable
      setarticle(data.articles);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };


  if (!article || !Array.isArray(article)) {
    return <Placeholder />;
  }
  

  // useEffect 1
  useEffect(() => {
    news();
  }, []);

  // Loading and error messages
  if (loading) {
    return <Placeholder />;
  }

  if (error) {
    return <Placeholder />;
  }
  // Render the articles inside a carousel
  return (
    <div className="row">
      {/* news*/}
      {article.map((element,index) => (
        <div className="col-12">
            <News
            key={index}
              imageUrl={element.urlToImage}
              newsurl={element.url}
              title={element.title}
              time={element.publishedAt}
            />
            </div>
        ))}
        </div>
  );
}
