import React from "react";
import Items from "./Items";
import Story from "./Story";
import Cricket from "./Cricket";
import Items2 from "./Items2";
import {Link} from 'react-router-dom'
import "./card.css";
export default function Allitems() {
  return (
    <div className="d-flex justify-center">
      <div
        className="mt-5"
        style={{
          boxShadow: "rgb(0 0 0 / 40%) 0px 0px 50px 8px",
          height: "auto",
          width: "1300px",
          backgroundColor: "rgb(247 247 247 / 1)",
          borderRadius: "15px",
        }}
      >
        <div className="Categoy">
        <Link to="/sports">Sports</Link>
        <Link to="/business">Business</Link>
        <Link to="/entertainment">Entertainment</Link>
        <Link to="/science">Science</Link>
        <Link to="/technology">Technology</Link>
        <Link to="/health">Health</Link>
        </div>
        {/* news */}
        <div className="row p-3 w-100 m-0">
          <div className="col-6">
            <Items />
          </div>
          <div className="col-3">
            <Story />
          </div>
          <div className="col-3">
            <Cricket />
          </div>
        </div>
        {/* news 2 */}
        <div className="row p-3">
          <div className="col-12">
            <Items2 />
          </div>
        </div>
      </div>
    </div>
  );
}
