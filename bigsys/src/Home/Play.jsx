import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import { GrFormPreviousLink } from "react-icons/gr";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchTask from "../api/fetchTask";
import Button from "react-bootstrap/Button";

export const Play = () => {
  const path = window.location.pathname.split("/");
  console.log(path);
  var [level, setLevel] = useState(3);
  var [subC, setSubC] = useState(0);
  var [pick, setPick] = useState("ALL");
  var [answer, setAnswer] = useState([]);

  const solve = (e) => {
    setAnswer(answer.concat(e));
  };

  const getSub = (e) => {
    setSubC(e);
    setLevel((level += 1));
    switch (e) {
      case 1:
        setPick(-1);
        break;
      case 2:
        setPick(11);
        break;
      case 3:
        setPick(12);
        break;
      case 4:
        setPick(13);
        break;
      case 5:
        setPick(14);
        break;
      case 6:
        setPick(15);
        break;
      case 7:
        setPick(16);
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
                    <>
                      <p className="desc">
                        문제 : 해당 기사 제목을 만든 <b>기조 문장</b> 찾기
                      </p>
                      <Suspense fallback={<Spinner />}>
                        <FourToSix
                          resource={fetchTask(
                            `http://127.0.0.1:8000/part1/find-title?category=${path[2]}&level=${path[3]}&pattern=${pick}`
                          )}
                          solve={solve}
                        />
                      </Suspense>
                    </>
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
            <Suspense fallback={<Spinner />}>
              <OneToThree
                resource={fetchTask(
                  `http://127.0.0.1:8000/part1/ox?category=${path[2]}&level=${path[3]}`
                )}
                solve={solve}
              />
            </Suspense>
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

const OneToThree = ({ resource, solve }) => {
  var data = resource.read();
  const [tempAnswer, setTempAnswer] = useState([0, 0, 0]);

  const checkAns = (myAns, ans) => {
    var realAns = [0, 0, 0];
    for (let index = 0; index < 3; index++) {
      if (myAns[index] == ans[index]) {
        realAns[index] = 1;
      }
    }
    return realAns;
  };

  console.log(data);
  return (
    <>
      <div className="news-title">
        <p>
          <span>문제 1. </span> 제목 : {data[0].task.labeledDataInfo.newTitle}
        </p>
      </div>
      <div className="news-inner">
        {data[0].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[0] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[0] = 2;
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
      <div className="news-title">
        <p>
          <span>문제 2. </span>제목 : {data[1].task.labeledDataInfo.newTitle}
        </p>
      </div>
      <div className="news-inner">
        {data[1].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[1] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[1] = 2;
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
      <div className="news-title">
        <p>
          <span>문제 3. </span>제목 : {data[2].task.labeledDataInfo.newTitle}
        </p>
      </div>
      <div className="news-inner">
        {data[2].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[2] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          onClick={() => {
            var ansCopy = tempAnswer;
            ansCopy[2] = 2;
            console.log(ansCopy);
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
    </>
  );
};

const FourToSix = ({ resource, solve }) => {
  const [tempAnswer, setTempAnswer] = useState([[], [], []]);
  var data = resource.read();
  console.log(data);

  var [textD, setTextD] = useState(false);

  const sencence = (e, taskIdx) => (
    <p
      className="news-by"
      id={e.sentenceNo}
      key={e.sentenceNo}
      onClick={(target) => {
        var ansCopy = [...tempAnswer];
        var delIdx = ansCopy[taskIdx].indexOf(target.target.id);
        if (delIdx != -1) {
          delete ansCopy[taskIdx][delIdx];
        } else {
          ansCopy[taskIdx].push(target.target.id);
        }
        setTextD(!textD);
        setTempAnswer(ansCopy);
        console.log(tempAnswer);
      }}
      style={
        textD
          ? { textDecoration: "underline", fontWeight: 600 }
          : { textDecoration: "none", fontWeight: 500 }
      }
    >
      {e.sentenceContent}
    </p>
  );
  return (
    <>
      {data.map((e, idx) => (
        <div className="fourTosix" key={idx}>
          <h3>제목 : {e.task.newTitle}</h3>
          {e.task.sourceDataInfo.sentenceInfo.map((val) => sencence(val, idx))}
        </div>
      ))}
    </>
  );
};

const SevenToEight = ({ resource, solve }) => {
  var data = resource.read();
  console.log(data);

  var first_choicePassage = data[0].task.choicePassage.map((e) => (
    <div
      className="news-selection"
      onClick={() => {
        solve(e.sentenceNo);
      }}
    >
      {e.sentenceContent}
    </div>
  ));
  var second_choicePassage = data[1].task.choicePassage.map((e) => (
    <div
      className="news-selection"
      onClick={() => {
        solve(e.sentenceNo);
      }}
    >
      {e.sentenceContent}
    </div>
  ));

  return (
    <>
      <p>제목 : {data[0].task.newsTitle}</p>
      {first_choicePassage}
      <p
        onClick={() => {
          solve(0);
        }}
      >
        없음
      </p>

      <p>제목 : {data[1].task.newsTitle}</p>
      {second_choicePassage}
      <p
        onClick={() => {
          solve(0);
        }}
      >
        없음
      </p>
    </>
  );
};
