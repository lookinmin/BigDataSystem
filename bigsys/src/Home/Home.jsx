import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./Home.css";

export const Home = () => {
  return (
    <>
      <Header />
      <div className="home">
        <h2>Welcome</h2>
      </div>
      <Footer />
    </>
  );
};
