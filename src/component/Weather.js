import React, { useState, useEffect } from "react";
import newimage from "./newimage.jpg"; // Adjust path as needed

export default function Weather() {
  const [weather, setweather] = useState([]);
  const [data, setdata] = useState({});
  const [city, setcity] = useState("");

  const fetchdata = async (city) => {
      let URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=35f70a22d15a0265f59c9f8aa3892209&units=metric`;
    try {
      let response = await fetch(URL);
      if (!response.ok) {
        throw new Error("City not found");
      }

      let data = await response.json();
      setweather(data.weather);
      setdata({
        temp: data.main.temp,
        timezone: data.timezone,
        humidity: data.main.humidity,
      });
    } catch (error) {
      console.error(error);
      setweather([]);
      setdata({});
    }
  };

  const formatTime = (timezone) => {
    const localTime = new Date(Date.now() + timezone * 1000);
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    return localTime.toLocaleString([], options);
  };

  useEffect(() => {
    if(city.length>2){
    fetchdata(city);
    }
  }, [city]);

  return (
    <div
      className="container-fluid d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${newimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="border border-dark p-4"
        style={{
          width: "500px",
          height: "400px", // Increased height of the card
          borderRadius: "10px",
          backgroundColor: "#6a736c",
        }}
      >
        <h1
          className="text-center mt-2 text-white mb-2"
          style={{ fontSize: 50 }}
        >
          Weather
        </h1>
        <div className="container d-flex flex-column justify-content-center align-items-center">
          <form
            className="d-flex mb-3"
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              fetchdata(city);
            }}
          >
            <input
              className="form-control me-2 border-black"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "75%" }}
              value={city}
              onChange={(e) => setcity(e.target.value)}
            />
            <button className="btn btn-outline-light" type="submit">
              Search
            </button>
          </form>
        </div>
        <div
          className="text-center text-white"
          style={{
            padding: "20px 0",
            fontSize: "18px",
            margin: "10px",
            textAlign: "center",
          }} // Added textAlign
        >
          {/* Added padding, margin, and textAlign */}
          {weather.length > 0 ? (
            weather.map((element, index) => <h1 key={index}>{element.main}</h1>)
          ) : (
            <h1>No weather data available</h1>
          )}
        </div>
        <div
          className="text-center text-white"
          style={{
            padding: "20px 0",
            fontSize: "18px",
            margin: "10px",
            textAlign: "center",
          }} // Added textAlign
        >
          {/* Added padding, margin, and textAlign */}
          {data.temp !== undefined ? (
            <h1>Temperature: {data.temp} °C</h1>
          ) : (
            <h1>Temperature: empty</h1>
          )}
          {data.timezone !== undefined ? (
            <h1>Time: {formatTime(data.timezone)}</h1>
          ) : (
            <h1>Time: empty</h1>
          )}
          {data.humidity !== undefined ? (
            <h1>Humidity: {data.humidity}%</h1>
          ) : (
            <h1>Humidity: empty</h1>
          )}
        </div>
      </div>
    </div>
  );
}
