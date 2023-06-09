import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const Result = () => {
  let navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
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
          <div className="rightbox">
            <p>Part별 설명</p>
            <p>
              <b>No.1~3</b> : 기사 제목이 해당 기사 내용에 대해 진짜인지
              가짜인지 판별
            </p>
            <p>
              <b>No.4~6</b> : 기사의 거짓 제목을 만든 기조 문장 찾기
            </p>
            <p>
              <b>No.7~8</b> : 주어진 기사에서 자동생성, 비일관성을 가진 이상한
              문장 찾기
            </p>
            <p>
              <b>No.9~10</b> : 직접 생성된 문장들에 대해 어떤 패턴으로
              생성됬는지 찾기
            </p>
          </div>
        </div>

        <Button variant="outline-primary" id="btn_end" onClick={() => goHome()}>
          HOME으로
        </Button>
      </div>
      <Footer />
    </>
  );
};
