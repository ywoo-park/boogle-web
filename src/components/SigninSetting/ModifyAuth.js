import React from "react";
import { Row, Col } from "antd";
import { Link, Redirect } from "react-router-dom";

export default function ModifyAuth() {
  return (
    <div>
      <Row
        style={{
          background:
            "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)"
        }}
      >
        <Col xs={{ span: 3 }}>
          <Link to="/setting">
            <img
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "40%",
                filter: "brightness(0) invert(1)"
              }}
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
            />
          </Link>
        </Col>
        <Col xs={{ span: 8, offset: 5 }} align="center">
          <h5 style={{ color: "white" }}>로그인 설정</h5>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 3, offset: 2 }}>아이콘</Col>
        <Col xs={{ span: 8, offset: 2 }}>자동 로그인</Col>
        <Col xs={{ span: 4 }}>토글</Col>
      </Row>
      <Row>
        <Col>
          <Link to="/">
            <button
              style={{
                padding: "0",
                width: "100%",
                background: "rgba(51, 158, 172, 0.9)",
                color: "#ffffff",
                border: "none",
                borderRadius: "2.25vh",
                fontSize: "2.5vh",
                height: "5vh"
              }}
              onClick={() => {
                localStorage.removeItem("token");
                //   setTimeout(() => {
                //     // window.location.reload();
                //   }, 1000);
              }}
            >
              로그아웃
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
