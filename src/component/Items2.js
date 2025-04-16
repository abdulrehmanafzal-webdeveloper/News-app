import React, { useState, useEffect } from "react";
import Placeholder from "./Placeholder";
import Placeholder3 from "./Placeholder3";
import News2 from "./News2";
import InfiniteScroll from "react-infinite-scroll-component";
import News from "./News";
import Spinner from "./Spinner";
export default function Items2() {
  // useState
  const [page, setPage] = useState(1);
  const [article, setArticle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(0);

  // Fetch function
  const news = async () => {
    try {
      setLoading(true);
      let URL = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=2eb8ccb5950e474296d19efb7e10403b&page=${page}`;
      let response = await fetch(URL);
      let data = await response.json();
      setArticle(data.articles || []);
      setResult(data.totalResults);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

  // Initial data load on component mount
  useEffect(() => {
    news();
  }, []);

  // Fetch more data on scroll
  const fetchMoreData = async () => {
    if (loading) return;

    try {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
      let URL = `https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=2eb8ccb5950e474296d19efb7e10403b&page=${
        page + 1
      }`;
      let response = await fetch(URL);
      let data = await response.json();
      setArticle((prevArticles) => [...prevArticles, ...data.articles]);
      setResult(data.totalResults);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError("Error fetching data");
      setLoading(false);
    }
  };

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
  // Render the articles inside an infinite scroll component
  return (
    <div>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length < result}
        loader={loading&&<Spinner />}
      >
        <div className="row w-100 m-0">
          {/* Show placeholders if there’s an error or during initial loading */}
          {(loading || error) && article.length === 0 && renderPlaceholders(8)}


          {article.map((element, index) => {
            const itemsPerRow = 3;
            const logicalRow = Math.floor(index / itemsPerRow);
            const positionInRow = index % itemsPerRow;

            const isSpecialRow = Math.floor(logicalRow / 2) % 2 === 0;
            if (isSpecialRow) {
              return (
                <div className="col-3 mb-3" key={index}>
                  {loading ? (
                    <Placeholder3 />
                  ) : (
                    <News2
                      imageUrl={element.urlToImage}
                      newsurl={element.url}
                      title={element.title}
                      time={element.publishedAt}
                    />
                  )}
                </div>
              );
            }

            const isEvenRow = logicalRow % 2 === 0;

            return (
              <React.Fragment key={index}>
                {isEvenRow ? (
                  positionInRow < 2 ? (
                    <div className="col-3 mb-3">
                      {loading ? (
                        <Placeholder3 />
                      ) : (
                        <News2
                          imageUrl={element.urlToImage}
                          newsurl={element.url}
                          title={element.title}
                          time={element.publishedAt}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="col-6 mb-3">
                      {loading ? (
                        <Placeholder />
                      ) : (
                        <News
                          imageUrl={element.urlToImage}
                          newsurl={element.url}
                          title={element.title}
                          time={element.publishedAt}
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
                        imageUrl={element.urlToImage}
                        newsurl={element.url}
                        title={element.title}
                        time={element.publishedAt}
                      />
                    )}
                  </div>
                ) : (
                  <div className="col-3 mb-3">
                    {loading ? (
                      <Placeholder3 />
                    ) : (
                      <News2
                        imageUrl={element.urlToImage}
                        newsurl={element.url}
                        title={element.title}
                        time={element.publishedAt}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
