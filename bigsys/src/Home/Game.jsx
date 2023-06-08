import React, { useState, useRef, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import {
  FcSelfServiceKiosk,
  FcMusic,
  FcNews,
  FcGlobe,
  FcConferenceCall,
  FcShop,
} from "react-icons/fc";
import { BiWorld, BiWon } from "react-icons/bi";
import { GoLaw } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  let navigate = useNavigate();
  const scrollRef = useRef();

  const destH = document.getElementById("diff");

  var [choose, setChoose] = useState(0);

  const goPlay = (e) => {
    navigate(`/play/${e}`);
  };

  const moveDown = (e) => {
    setChoose(e);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <div className="game">
        <h2>Choose Category</h2>
        <p>열람할 신문의 카테고리를 선택하세요.</p>
        <div className="g-body">
          <div
            className="news_cate"
            onClick={() => moveDown(1)}
            style={
              choose === 1 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>경제</h3>
            <BiWon size={80} color="gold" />
            <p>Economy</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(2)}
            style={
              choose === 2 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>연예</h3>
            <FcMusic size={80} />
            <p>Entertainment</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(3)}
            style={
              choose === 3 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>세계</h3>
            <FcGlobe size={80} />
            <p>Global</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(4)}
            style={
              choose === 4 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>IT & 과학</h3>
            <FcSelfServiceKiosk size={80} />
            <p>IT & Science</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(5)}
            style={
              choose === 5 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>생활 & 문화</h3>
            <FcShop size={80} />
            <p>Life & Culture</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(6)}
            style={
              choose === 6 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>정치</h3>
            <GoLaw size={75} color="gray" />
            <p>Politics</p>
          </div>

          <div
            className="news_cate"
            onClick={() => moveDown(7)}
            style={
              choose === 7 ? { backgroundColor: "rgb(233, 233, 233)" } : {}
            }
          >
            <h3>사회</h3>
            <FcConferenceCall size={80} />
            <p>Society</p>
          </div>
        </div>

        {choose === 0 ? (
          <div ref={scrollRef}></div>
        ) : (
          <div id="diff" ref={scrollRef}>
            <h2>Choose Difficulty</h2>
            <p>난이도를 선택하세요</p>
            <div className="diffBox">
              <div className="box" onClick={() => goPlay(choose)}>
                HARD
              </div>
              <div className="box" onClick={() => goPlay(choose)}>
                NORMAL
              </div>
              <div className="box" onClick={() => goPlay(choose)}>
                EASY
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
