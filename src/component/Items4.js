import React, { useState, useEffect } from "react";
import Placeholder from "./Placeholder";
import Placeholder3 from "./Placeholder3";
import News2 from "./News2";
import InfiniteScroll from "react-infinite-scroll-component";
import News from "./News";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export default function Items4({ country = "us", category = "general" }) {
  // State management
  const [page, setPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);

  // Fetch news articles
  const fetchNews = async (isInitialLoad = false) => {
    try {
      setLoading(true);
      let URL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=2eb8ccb5950e474296d19efb7e10403b&page=${page}`;
      const response = await fetch(URL);
      const data = await response.json();

      if (response.ok) {
        setArticles((prev) => (isInitialLoad ? data.articles : [...prev, ...data.articles]));
        setTotalResults(data.totalResults);
      } else {
        throw new Error(data.message || "Error fetching articles");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching data. Please try again later.");
      setLoading(false);
    }
  };

  // Initial data fetch or reset on category change
  useEffect(() => {
    setArticles([]);
    setPage(1);
    fetchNews(true); // Initial load
  }, [country, category]);

  // Fetch additional data on scroll
  const fetchMoreData = async () => {
    if (loading) return;

    setPage((prevPage) => prevPage + 1);
    fetchNews();
  };

  // Render placeholders dynamically
  const renderPlaceholders = (count) => {
    const placeholders = [];
    for (let i = 0; i < count; i++) {
      placeholders.push(
        <div className="col-3 mb-3" key={`placeholder-${i}`}>
          <Placeholder3 />
        </div>
      );
    }
    return placeholders;
  };

  return (
    <div className="bg-white">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
        <div className="row  mt-2">
          {/* Placeholders shown during loading or when there's an error */}
          {(loading || error) && articles.length === 0 && renderPlaceholders(8)}

          {/* Map through articles */}
          {articles.map((article, index) => {
            const itemsPerRow = 3;
            const rowIndex = Math.floor(index / itemsPerRow);
            const positionInRow = index % itemsPerRow;

            // Special layout logic for alternate rows
            const isSpecialRow = Math.floor(rowIndex / 2) % 2 === 0;

            if (isSpecialRow) {
              return (
                <div className="col-3 mb-3" key={index}>
                  {loading ? (
                    <Placeholder3 />
                  ) : (
                    <News2
                      imageUrl={article.urlToImage}
                      newsurl={article.url}
                      title={article.title}
                      time={article.publishedAt}
                    />
                  )}
                </div>
              );
            }

            const isEvenRow = rowIndex % 2 === 0;

            return (
              <React.Fragment key={index}>
                {isEvenRow ? (
                  positionInRow < 2 ? (
                    <div className="col-3 mb-3">
                      {loading ? (
                        <Placeholder3 />
                      ) : (
                        <News2
                          imageUrl={article.urlToImage}
                          newsurl={article.url}
                          title={article.title}
                          time={article.publishedAt}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="col-6 mb-3">
                      {loading ? (
                        <Placeholder />
                      ) : (
                        <News
                          imageUrl={article.urlToImage}
                          newsurl={article.url}
                          title={article.title}
                          time={article.publishedAt}
                        />
                      )}
                    </div>
                  )
                ) : positionInRow === 0 ? (
                  <div className="col-6 mb-3">
                    {loading ? (
                      <Placeholder />
                    ) : (
                      <News
                        imageUrl={article.urlToImage}
                        newsurl={article.url}
                        title={article.title}
                        time={article.publishedAt}
                      />
                    )}
                  </div>
                ) : (
                  <div className="col-3 mb-3">
                    {loading ? (
                      <Placeholder3 />
                    ) : (
                      <News2
                        imageUrl={article.urlToImage}
                        newsurl={article.url}
                        title={article.title}
                        time={article.publishedAt}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
        </div>
      </InfiniteScroll>
      {error && <div className="text-center text-danger">{error}</div>}
    </div>
  );
}

Items4.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
