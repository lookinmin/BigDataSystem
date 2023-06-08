import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";

export const Play = () => {
  var [level, setLevel] = useState(1);

  const solve = () => {
    setLevel((level += 1));
  };

  return (
    <>
      <Header />
      <div className="play">
        <div className="play-content">
          <h2>STAGE {level}</h2>
          <p>
            최대 글자 수는 어디까지 될까요
            시이이이이ㅣ이이이이이발라라라ㅏ라라라
          </p>
          <div className="OX">
            <div className="O" onClick={() => solve()}>
              <FaRegCircle size={60} color="lightgreen" />
            </div>
            <div className="X" onClick={() => solve()}>
              <FaTimes size={64} color="red" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
