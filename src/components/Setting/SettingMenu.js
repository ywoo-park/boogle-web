import React from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";

export default function SettingMenu() {
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");

  return (
    <div>
        <Row
          style={{
            height : "70px",
            padding : "20px 0px 10px 0px",
            background:
              "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
          }}
        >
          <Col xs={{ span: 3 }}>
            <Link to="/mypage">
              <img
                style={{
                  width: "32px",
                  height: "auto",
                  marginLeft: "40%",
                  filter: "brightness(0) invert(1)"
                }}
                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
                onClick={<div></div>}
              />
            </Link>
          </Col>
          <Col xs={{ span: 8, offset: 5 }} align="center">
            <h5 style={{ color: "white" }}>설정</h5>
          </Col>
        </Row>
      <Row style={{color : "#656565", marginTop : "30px", marginBottom : "30px", fontSize : "17.5px"}}>
        <Link style={{color : "#656565"}} to="/signinSetting">
          <Col xs={{ offset: 1, span: 1 }}>
            <Icon type="lock" />
          </Col>
          <Col xs={{ offset: 2, span: 15 }}>
            <span>로그인 설정</span>
          </Col>
          <Col xs={{ offset: 2, span: 2 }}>
            <Icon type="right" />
          </Col>
        </Link>
      </Row>
      <Row style={{color : "#656565", marginBottom : "30px", fontSize : "17.5px"}}>
        <Link style={{color : "#656565"}} to="/accountSetting">
          <Col xs={{ offset: 1, span: 1 }}>
            <Icon type="credit-card" />
          </Col>
          <Col xs={{ offset: 2, span: 15 }}>
            <span>계좌 관리</span>
          </Col>
          <Col xs={{ offset: 2, span: 2 }}>
            <Icon type="right" />
          </Col>
        </Link>
      </Row>
    </div>
  );
}
