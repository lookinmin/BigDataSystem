import React, { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { IoSearch } from "react-icons/io5";
import { FaTimes, FaRegCircle } from "react-icons/fa";
import axios from "axios";

export const Search = () => {
  var [title, setTitle] = useState("개 시발");
  var [content, setContent] = useState("술 절대 안먹음 진짜");
  const onSearchHandler = (info) => {
    axios
      .post("http://127.0.0.1:8000/?/", {
        info: info,
      })
      .then((res) => {
        //데이터 들어오면 setTitle로 제목 ,setContent로 내용 넣으면 끝
      });
  };

  return (
    <>
      <Header />
      <div className="search">
        <h3>SEARCH</h3>
        <SearchBar search={onSearchHandler} />

        <Result_list title={title} content={content} />

        <div className="judge">
          <p id="fix_t">위 기사는 진실된 기사일까요?</p>
          <div className="boxss" id="right">
            <p>맞다</p>
            <FaRegCircle color="green" size={25} />
          </div>
          <div className="boxss" id="wrong">
            <p>아니다</p>
            <FaTimes color="red" size={25} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const SearchBar = ({ search }) => {
  const onSearchHandler = (e) => {
    var info = document.getElementById("SV").value;
    search(info);
  };

  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          id="SV"
        />
      </InputGroup>

      <IoSearch
        size={40}
        color="skyblue"
        onClick={() => onSearchHandler()}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

const Result_list = (props) => {
  return (
    <div className="result-list">
      <h5>기사 제목 : {props.title}</h5>

      <p>
        조민수씨, 향년 25세... 금주 외치다 사망했다 전해져...
        {props.content}
      </p>
    </div>
  );
};
