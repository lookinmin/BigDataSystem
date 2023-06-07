import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";

export const Game = () => {
  return (
    <>
      <Header />
      <div className="game">
        <h2>Choose Category</h2>
        <p>열람할 신문의 카테고리를 선택하세요.</p>
        <div className="g-body">
          <div className="news_cate">
            <h3>경제</h3>
            <p>Economy</p>
          </div>

          <div className="news_cate">
            <h3>연예</h3>
            <p>Entertainment</p>
          </div>

          <div className="news_cate">
            <h3>세계</h3>
            <p>Global</p>
          </div>

          <div className="news_cate">
            <h3>IT & 과학</h3>
            <p>IT & Science</p>
          </div>

          <div className="news_cate">
            <h3>생활 & 문화</h3>
            <p>Life & Culture</p>
          </div>

          <div className="news_cate">
            <h3>정치</h3>
            <p>Politics</p>
          </div>

          <div className="news_cate">
            <h3>사회</h3>
            <p>Society</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
