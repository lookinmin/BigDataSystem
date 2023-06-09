import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import { GrFormPreviousLink } from "react-icons/gr";

export const Play = () => {
  var [level, setLevel] = useState(0);
  var [subC, setSubC] = useState(0);
  var [pick, setPick] = useState("ALL");
  var [answer, setAnswer] = useState([]);

  const solve = (e) => {
    setLevel((level += 1));
    if (e === 1) {
      setAnswer(answer.concat(1));
    } else {
      setAnswer(answer.concat(2));
    }
  };

  const getSub = (e) => {
    setSubC(e);
    setLevel((level += 1));
    switch (e) {
      case 1:
        setPick("ALL");
        break;
      case 2:
        setPick("부호를 통한 의문 유발형");
        break;
      case 3:
        setPick("은닉을 통한 의문 유발형");
        break;
      case 4:
        setPick("선정표현 사용형");
        break;
      case 5:
        setPick("속어/줄임말 사용형");
        break;
      case 6:
        setPick("사실 과대 표현형");
        break;
      case 7:
        setPick("의도적 주어 왜곡형");
        break;
    }
  };

  return (
    <>
      <Header />
      <div className="play">
        <div className="play-content">
          {level === 3 ? (
            <></>
          ) : (
            <>
              {level < 3 ? (
                <>
                  <h2>STAGE {level + 1}</h2>
                  <p>해당 기사의 제목이 진짜 제목인지 아닌지 맞춰주세요.</p>
                </>
              ) : (
                <>
                  <h2>STAGE {level}</h2>
                  <p style={{ marginBottom: "15px" }}>선택 유형 : {pick}</p>
                  {(level >= 4 && level) <= 6 ? (
                    <p className="desc">
                      문제 : 해당 기사 제목을 만든 <b>기조 문장</b> 찾기
                    </p>
                  ) : level < 9 ? (
                    <p className="desc">
                      자동생성, 비일관성을 가진 <b>이상한 문장</b> 찾기
                    </p>
                  ) : (
                    <p className="desc">
                      직접 생성된 이상한 문장들의 <b>생성패턴</b> 찾기
                    </p>
                  )}
                </>
              )}
            </>
          )}

          {level < 3 ? (
            <OneToThree solve={solve} />
          ) : level == 3 ? (
            <div className="pattern">
              <h4>Sub Category</h4>
              <h6>4번부터는 기사에 대한 문제가 분류되어 등장합니다.</h6>
              <h6>분류 기준을 선택해주세요.</h6>

              <p onClick={() => getSub(1)}>1. ALL</p>
              <p onClick={() => getSub(2)}>2. 부호를 통한 의문 유발형</p>
              <p onClick={() => getSub(3)}>3. 은닉을 통한 의문 유발형</p>
              <p onClick={() => getSub(4)}>4. 선정표현 사용형</p>
              <p onClick={() => getSub(5)}>5. 속어/줄임말 사용형</p>
              <p onClick={() => getSub(6)}>6. 사실 과대 표현형</p>
              <p onClick={() => getSub(7)}>7. 의도적 주어 왜곡형</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        {level === 0 ? (
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

const OneToThree = (props) => {
  return (
    <>
      <p>제목 : 대흉근과 대원근</p>
      <div className="news-inner">내용</div>
      <div className="OX">
        <div className="O" onClick={() => props.solve(1)}>
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div className="X" onClick={() => props.solve(2)}>
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
    </>
  );
};

const FourToSix = ({ answer, pick, level }) => {
  return <></>;
};
