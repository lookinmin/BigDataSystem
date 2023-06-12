import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";
import { Suspense } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import fetchTask from "../api/fetchTask";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

export const Play = () => {
  const path = window.location.pathname.split("/");
  let navigate = useNavigate();
  console.log(path);
  var [level, setLevel] = useState(0);
  var [subC, setSubC] = useState(0);
  var [pick, setPick] = useState("ALL");
  var [answer, setAnswer] = useState([]);

  const solve = (e, plus_level) => {
    setAnswer(answer.concat(e));
    setLevel((level += plus_level));
  };
  const goHome = () => {
    navigate("/");
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
          {level === 3 || level >= 11 ? (
            <></>
          ) : (
            <>
              {level < 3 ? (
                <>
                  <h2>STAGE 1</h2>
                  <p>해당 기사의 제목이 진짜 제목인지 아닌지 맞춰주세요.</p>
                </>
              ) : (
                <>
                  <h2>STAGE {~~(level / 3) + 1}</h2>
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
                    <>
                      <p className="desc">
                        자동생성, 비일관성을 가진 <b>이상한 문장</b> 찾기
                      </p>
                      <Suspense fallback={<Spinner />}>
                        <SevenToEight
                          resource={fetchTask(
                            `http://127.0.0.1:8000/part2/strangeSentence?category=${path[2]}&level=${path[3]}&pattern=${pick}`
                          )}
                          solve={solve}
                        />
                      </Suspense>
                    </>
                  ) : level < 11 ? (
                    <>
                      <p className="desc">
                        직접 생성된 이상한 문장들의 <b>생성패턴</b> 찾기
                      </p>
                      <Suspense fallback={<Spinner />}>
                        <NineToTen
                          resource={fetchTask(
                            `http://127.0.0.1:8000/part2/pattern?category=${path[2]}&level=${path[3]}&pattern=${pick}`
                          )}
                          solve={solve}
                        />
                      </Suspense>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          )}
          {level >= 11 ? (
            <div className="result">
              <h2>GAME RESULT</h2>
              <p>게임 결과</p>
              <div className="res-body">
                <div className="leftbox">
                  <div className="heads">
                    <p>No.</p>
                    <p>정답여부</p>
                  </div>
                  {answer.map((e, idx) => (
                    <div className="bodys">
                      <p>{idx + 1}</p>
                      <p>{e[0]}</p>
                    </div>
                  ))}
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
                    <b>No.7~8</b> : 주어진 기사에서 자동생성, 비일관성을 가진
                    이상한 문장 찾기
                  </p>
                  <p>
                    <b>No.9~10</b> : 직접 생성된 문장들에 대해 어떤 패턴으로
                    생성됬는지 찾기
                  </p>
                </div>
              </div>

              <Button
                variant="outline-primary"
                id="btn_end"
                onClick={() => goHome()}
              >
                HOME으로
              </Button>
            </div>
          ) : (
            <></>
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
      </div>
      <Footer />
    </>
  );
};

const OneToThree = ({ resource, solve }) => {
  var data = resource.read();
  const [tempAnswer, setTempAnswer] = useState([0, 0, 0]);

  const checkAns = (myAns, ans) => {
    console.log(myAns, ans);
    var realAns = ["X", "X", "X"];
    for (let index = 0; index < 3; index++) {
      if (myAns[index] == ans[index].answer) {
        realAns[index] = "O";
      }
    }
    console.log(realAns);
    solve(realAns, 3);
    return realAns;
  };

  return (
    <>
      <div className="news-title">
        {tempAnswer}
        <p>제목 : {data[0].task.labeledDataInfo.newTitle}</p>
      </div>
      <div className="news-inner">
        {data[0].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          style={
            tempAnswer[0] != 0
              ? tempAnswer[0] == 1
                ? { backgroundColor: "rgb(235, 255, 235)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[0] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          style={
            tempAnswer[0] != 0
              ? tempAnswer[0] == 2
                ? { backgroundColor: "rgb(255, 229, 229)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[0] = 2;
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
      <div className="news-title">
        <p>제목 : {data[1].task.labeledDataInfo.newTitle}</p>
      </div>
      <div className="news-inner">
        {data[1].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          style={
            tempAnswer[1] != 0
              ? tempAnswer[1] == 1
                ? { backgroundColor: "rgb(235, 255, 235)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[1] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          style={
            tempAnswer[1] != 0
              ? tempAnswer[1] == 2
                ? { backgroundColor: "rgb(255, 229, 229)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[1] = 2;
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
      <div className="news-title">
        <p>제목 : {data[2].task.labeledDataInfo.newTitle}</p>
      </div>
      <div className="news-inner">
        {data[2].task.sourceDataInfo.newsContent}
      </div>
      <div className="OX">
        <div
          className="O"
          style={
            tempAnswer[2] != 0
              ? tempAnswer[2] == 1
                ? { backgroundColor: "rgb(235, 255, 235)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[2] = 1;
            setTempAnswer(ansCopy);
          }}
        >
          <FaRegCircle size={60} color="lightgreen" />
          <p>진짜 제목</p>
        </div>
        <div
          className="X"
          style={
            tempAnswer[2] != 0
              ? tempAnswer[2] == 2
                ? { backgroundColor: "rgb(255, 229, 229)" }
                : {}
              : {}
          }
          onClick={() => {
            var ansCopy = [...tempAnswer];
            ansCopy[2] = 2;
            setTempAnswer(ansCopy);
          }}
        >
          <FaTimes size={64} color="red" />
          <p>가짜 제목</p>
        </div>
      </div>
      <div id="go" onClick={() => checkAns(tempAnswer, data)}>
        <GrFormNextLink size={40} color="gray" />
        <p>다음</p>
      </div>
    </>
  );
};

const FourToSix = ({ resource, solve }) => {
  const [tempAnswer, setTempAnswer] = useState([[], [], []]);
  var data = resource.read();
  console.log(data);

  const sencence = (e, taskIdx) => (
    <p
      className="news-by"
      id={e.sentenceNo}
      key={e.sentenceNo}
      onClick={(target) => {
        var ansCopy = [...tempAnswer];
        if (ansCopy[taskIdx][target.target.id]) {
          if (ansCopy[taskIdx][target.target.id] == true) {
            ansCopy[taskIdx][target.target.id] = false;
          } else {
            ansCopy[taskIdx][target.target.id] = true;
          }
        } else {
          ansCopy[taskIdx][target.target.id] = true;
        }
        setTempAnswer(ansCopy);
        console.log(tempAnswer);
      }}
      style={
        tempAnswer[taskIdx][e.sentenceNo]
          ? { textDecoration: "underline", fontWeight: 600 }
          : { textDecoration: "none", fontWeight: 500 }
      }
    >
      {e.sentenceContent}
    </p>
  );
  const checkAns = (myAns, ans) => {
    console.log(myAns, ans);
    var realAns = ["X", "X", "X"];
    for (let index = 0; index < 3; index++) {
      var flag = false;
      for (let i = 0; i < ans[index].answer.length; i++) {
        if (myAns[index][ans[index].answer[i]]) {
          myAns[index][ans[index].answer[i]] = undefined;
        } else {
          flag = true;
          break;
        }
      }
      if (flag) break;
      for (let i = 0; i < myAns[index].length; i++) {
        if (myAns[index][i]) {
          flag = true;
          break;
        }
      }
      if (!flag) {
        realAns[index] = "O";
      }
    }
    console.log(realAns);
    solve(realAns, 3);
    return realAns;
  };

  return (
    <>
      {data.map((e, idx) => (
        <div className="fourTosix" key={idx}>
          <h3>제목 : {e.task.newTitle}</h3>
          {e.task.sourceDataInfo.sentenceInfo.map((val) => sencence(val, idx))}
        </div>
      ))}
      <div id="go" onClick={() => checkAns(tempAnswer, data)}>
        <GrFormNextLink size={40} color="gray" />
        <p>다음</p>
      </div>
    </>
  );
};

const SevenToEight = ({ resource, solve }) => {
  var data = resource.read();
  var answer = [[], []];
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < data[i].answer_count; j++) {
      answer[i].push(data[i].answer_sentence[j].sentenceNo);
    }
  }
  const [tempAnswer, setTempAnswer] = useState([[], []]);
  console.log(data);

  var checkAns = (realAnswer, myAns) => {
    var realAns = [];

    for (var i = 0; i < 2; i++) {
      realAnswer[i].sort();
      myAns[i].sort();
      if (realAnswer[i].length !== myAns[i].length) {
        realAns.push("X");
        continue;
      }
      var flag = true;
      for (var j = 0; j < myAns[i].length; j++) {
        if (realAnswer[i][j] !== myAns[i][j]) {
          flag = false;
          break;
        } else {
          flag = true;
        }
      }
      flag == true ? realAns.push("O") : realAns.push("X");
    }
    console.log(answer, myAns, realAns);
    solve(realAns, 2);
    return realAns;
  };

  var first_choicePassage = data[0].task.choicePassage.map((e, idx) => (
    <div className="news-selection" key={idx}>
      <input
        type="checkbox"
        id={e.sentenceNo}
        onClick={() => {
          if (tempAnswer[0].includes(e.sentenceNo)) {
            setTempAnswer([
              tempAnswer[0].filter((answer) => answer !== e.sentenceNo),
              tempAnswer[1],
            ]);
          } else {
            setTempAnswer([[...tempAnswer[0], e.sentenceNo], tempAnswer[1]]);
          }
        }}
      />
      <p style={{ margin: "0" }}>{e.sentenceContent}</p>
    </div>
  ));

  var second_choicePassage = data[1].task.choicePassage.map((e, idx) => (
    <div className="news-selection" key={idx}>
      <input
        type="checkbox"
        id={e.sentenceNo}
        onClick={() => {
          if (tempAnswer[1].includes(e.sentenceNo)) {
            setTempAnswer([
              tempAnswer[0],
              tempAnswer[1].filter((answer) => answer !== e.sentenceNo),
            ]);
          } else {
            setTempAnswer([tempAnswer[0], [...tempAnswer[1], e.sentenceNo]]);
          }
        }}
      />
      <p style={{ margin: "0" }}>{e.sentenceContent}</p>
    </div>
  ));

  return (
    <>
      <div className="news">
        <p className="news-title">제목 : {data[0].task.newsTitle}</p>
        <div className="news-inner">
          {first_choicePassage}
          <div id="go" onClick={() => checkAns(answer, tempAnswer)}>
            <GrFormNextLink size={40} color="gray" />
            <p>다음</p>
          </div>
        </div>
      </div>

      <div className="news">
        <p className="news-title">제목 : {data[1].task.newsTitle}</p>
        <div className="news-inner">{second_choicePassage}</div>
      </div>
    </>
  );
};

const NineToTen = ({ resource, solve }) => {
  var data = resource.read();
  const [tempAnswer, setTempAnswer] = useState([0, 0]);
  const [radio, setRadio] = useState([0, 0]);
  console.log(data);

  var answer = [];
  for (var i = 0; i < 2; i++) {
    answer.push(data[i].task.processPattern);
  }

  const handleClickRadioButton = (e) => {
    setRadio(e.target.value);
    if (e.target.name == "1") {
      setRadio([e.target.value, radio[1]]);
      console.log(e.target.value, radio);
      setTempAnswer([e.target.value, tempAnswer[1]]);
    } else if (e.target.name == "2") {
      setRadio([radio[0], e.target.value]);
      setTempAnswer([tempAnswer[0], e.target.value]);
    }
    console.log(radio, tempAnswer);
  };

  const checkAns = (realAnswer, myAns) => {
    var realAns = [];
    for (let i = 0; i < 2; i++) {
      if (realAnswer[i] !== String(Number(myAns[i]) + 20)) {
        realAns.push("X");
      } else realAns.push("O");
    }
    console.log(realAns);
    solve(realAns, 2);
    return realAns;
  };

  return (
    <>
      <div className="news">
        <p className="news-title">제목 : {data[0].task.newsTitle}</p>
        <p className="news-inner">{data[0].task.newsContent}</p>
        <div className="news-selection">
          <input
            type="radio"
            name="1"
            value="1"
            checked={radio[0] === "1"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>21.상품 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="1"
            value="2"
            checked={radio[0] === "2"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>22.부동산 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="1"
            value="3"
            checked={radio[0] === "3"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>23.서비스 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="1"
            value="4"
            checked={radio[0] === "4"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>24. 의도적 상황 왜곡/전환형</p>
        </div>
      </div>

      <div className="news">
        <p className="news-title">제목 : {data[1].task.newsTitle}</p>
        <p className="news-inner">{data[1].task.newsContent}</p>
        <div className="news-selection">
          <input
            type="radio"
            name="2"
            value="1"
            checked={radio[1] === "1"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>21.상품 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="2"
            value="2"
            checked={radio[1] === "2"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>22.부동산 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="2"
            value="3"
            checked={radio[1] === "3"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>23.서비스 판매정보 노출 광고형</p>
        </div>
        <div className="news-selection">
          <input
            type="radio"
            name="2"
            value="4"
            checked={radio[1] === "4"}
            onChange={handleClickRadioButton}
          />
          <p style={{ margin: "0" }}>24. 의도적 상황 왜곡/전환형</p>
        </div>
        <div id="go" onClick={() => checkAns(answer, tempAnswer)}>
          <GrFormNextLink size={40} color="gray" />
          <p>다음</p>
        </div>
      </div>
    </>
  );
};
