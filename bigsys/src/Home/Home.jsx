import React from "react";
import Button from "react-bootstrap/Button";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  let navigate = useNavigate();

  const goGame = () => {
    navigate("/game");
  };

  return (
    <>
      <Header />
      <div className="home">
        <div className="h-body">
          <h2>Welcome!</h2>
          <p>자극에 대한 역치 감소</p>
          <p>뉴스 기사를 보고 뭐가 가짜일지 맞춰보세요!</p>

          <p>당신의 시선을 조금 더 객관적으로 만드는데 도움이 됩니다.</p>
          <Button
            variant="outline-primary"
            id="btn_start"
            onClick={() => goGame()}
          >
            GAME START
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
};
