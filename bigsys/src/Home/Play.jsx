import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import { GrFormPreviousLink } from "react-icons/gr";

export const Play = () => {
  var [level, setLevel] = useState(1);
  var [subC, setSubC] = useState(0);

  const solve = () => {
    setLevel((level += 1));
  };

  const getSub = (e) => {
    setSubC(e);
  };

  return (
    <>
      <Header />
      <div className="play">
        <div className="play-content">
          <h2>STAGE {level}</h2>
          <p>해당 기사의 제목이 진짜 제목인지 아닌지 맞춰주세요.</p>
          <p>제목 : 대흉근과 대원근</p>
          <div className="news-inner">내용</div>
          {level > 3 ? (
            <></>
          ) : (
            <div className="OX">
              <div className="O" onClick={() => solve()}>
                <FaRegCircle size={60} color="lightgreen" />
                <p>진짜 제목</p>
              </div>
              <div className="X" onClick={() => solve()}>
                <FaTimes size={64} color="red" />
                <p>가짜 제목</p>
              </div>
            </div>
          )}
        </div>
        {level > 3 ? (
          <div className="pattern">
            <h4>Sub Category</h4>
            <p onClick={() => getSub(1)}>- 부호를 통한 의문 유발형</p>
            <p onClick={() => getSub(2)}>- 은닉을 통한 의문 유발형</p>
            <p onClick={() => getSub(3)}>- 선정표현 사용형</p>
            <p onClick={() => getSub(4)}>- 속어/줄임말 사용형</p>
            <p onClick={() => getSub(5)}>- 사실 과대 표현형</p>
            <p onClick={() => getSub(6)}>- 의도적 주어 왜곡형</p>
          </div>
        ) : (
          <></>
        )}
        {level === 1 ? (
          <></>
        ) : (
          <div id="back" onClick={() => setLevel((level -= 1))}>
            <GrFormPreviousLink size={40} color="gray" />
            <p>이전</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
