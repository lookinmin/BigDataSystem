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
  var [title, setTitle] = useState("");
  var [content, setContent] = useState("");
  const onSearchHandler = (info) => {
    axios
      .get(`http://127.0.0.1:8000/search/showResult?searchWord=${info}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data[0].task.newsTitle);
        setContent(res.data[0].task.newsContent);
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

      <p>{props.content}</p>
    </div>
  );
};
