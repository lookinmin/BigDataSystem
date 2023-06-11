import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import "./graph.css";
import { PureComponent } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Sector,
} from "recharts";
import { BsFillSquareFill } from "react-icons/bs";

export const Graph = () => {
  return (
    <>
      <Header />

      <div className="graph">
        <h3>Dataset Chart</h3>
        <div className="chartBox" id="one">
          <p>1. 카테고리 및 난이도 별 문제 수</p>
          <BarGraph />
        </div>

        <div className="chartBox" id="two">
          <p>2. 파트 및 패턴 별 문제 수</p>
          <div className="twobox">
            <PieGraph />
            <div className="chart_desc">
              <div className="dbox">
                <div className="d1">
                  <BsFillSquareFill size={13} color="#8884d8" />
                  <h5>제목과 본문의 불일치 기사</h5>
                </div>

                <p>1. 의문 유발형(부호) : 18104개</p>
                <p>2. 의문 유발형(은닉) : 10580개</p>
                <p>3. 선정표현 사용형 : 4290개</p>
                <p>4. 속어/줄임말 사용형 : 4643개</p>
                <p>5. 사실 과대 표현형 : 4968개</p>
                <p>6. 의도적 주어 왜곡형 : 2526개</p>
              </div>
              <div className="dbox">
                <div className="d1">
                  <BsFillSquareFill size={13} color="#82ca9d" />
                  <h5>본문의 도메인 일관성 부족 기사</h5>
                </div>

                <p>1. 상품 판매정보 노출 광고형 : 2391개</p>
                <p>2. 부동산 판매정보 노출 광고형 : 1179개</p>
                <p>3. 서비스 판매정보 노출 광고형 : 149개</p>
                <p>4. 의도적 상황 왜곡/전환형 : 1291개</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

const BarGraph = () => {
  const data = [
    {
      name: "IT & 과학",
      high: 308,
      mid: 2053,
      low: 83224,
    },
    {
      name: "경제",
      high: 585,
      mid: 2050,
      low: 85756,
    },
    {
      name: "사회",
      high: 479,
      mid: 2830,
      low: 118673,
    },
    {
      name: "생활 & 문화",
      high: 269,
      mid: 1375,
      low: 66068,
    },
    {
      name: "세계",
      high: 689,
      mid: 2121,
      low: 92543,
    },
    {
      name: "연예",
      high: 902,
      mid: 1269,
      low: 74531,
    },
    {
      name: "정치",
      high: 585,
      mid: 1632,
      low: 81994,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="high" fill="red" />
        <Bar dataKey="mid" fill="#82ca9d" />
        <Bar dataKey="low" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const PieGraph = () => {
  const data01 = [
    { name: "의문 유발형(부호)", value: 18104 },
    { name: "의문 유발형(은닉)", value: 10580 },
    { name: "선정표현 사용형", value: 4290 },
    { name: "속어/줄임말 사용형", value: 4643 },
    { name: "사실 과대 표현형", value: 4968 },
    { name: "의도적 주어 왜곡형", value: 2526 },
  ];
  const data02 = [
    { name: "상품 판매정보 노출 광고형", value: 2391 },
    { name: "부동산 판매정보 노출 광고형", value: 1179 },
    { name: "서비스 판매정보 노출 광고형", value: 149 },
    { name: "의도적 상황 왜곡/전환형", value: 1291 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={500} height={500}>
        <Pie
          data={data01}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={160}
          outerRadius={180}
          fill="#82ca9d"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
