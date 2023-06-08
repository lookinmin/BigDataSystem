import React from "react";
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

  const goPlay = (e) => {
    navigate(`/play/${e}`);
  };

  return (
    <>
      <Header />
      <div className="game">
        <h2>Choose Category</h2>
        <p>열람할 신문의 카테고리를 선택하세요.</p>
        <div className="g-body">
          <div className="news_cate" onClick={() => goPlay(1)}>
            <h3>경제</h3>
            <BiWon size={80} color="gold" />
            <p>Economy</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(2)}>
            <h3>연예</h3>
            <FcMusic size={80} />
            <p>Entertainment</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(3)}>
            <h3>세계</h3>
            <FcGlobe size={80} />
            <p>Global</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(4)}>
            <h3>IT & 과학</h3>
            <FcSelfServiceKiosk size={80} />
            <p>IT & Science</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(5)}>
            <h3>생활 & 문화</h3>
            <FcShop size={80} />
            <p>Life & Culture</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(6)}>
            <h3>정치</h3>
            <GoLaw size={75} color="gray" />
            <p>Politics</p>
          </div>

          <div className="news_cate" onClick={() => goPlay(7)}>
            <h3>사회</h3>
            <FcConferenceCall size={80} />
            <p>Society</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
