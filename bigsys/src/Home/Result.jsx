import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";

export const Result = () => {
  return (
    <>
      <Header />
      <div className="result">
        <h2>GAME RESULT</h2>
        <p>게임 결과</p>
        <div className="res-body">
          <div className="leftbox">
            <div className="heads">
              <p>No.</p>
              <p>내 정답</p>
              <p>정답여부</p>
              <p>정답</p>
            </div>
          </div>
          <div className="rightbox"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};
