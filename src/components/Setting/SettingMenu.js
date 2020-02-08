import React, { useState, useEffect } from "react";
import { Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function SettingMenu() {
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");

  return (
    <div>
      <Row>
        <Col xs={{ span: 2, offset: 1 }}>
          <Link to="/mypage">
            <Icon type="arrow-left" />
          </Link>
        </Col>
        <Col xs={{ span: 20 }} align="center">
          <span>설정</span>
        </Col>
      </Row>
      <Row>
        <Link>
          <Col xs={{ offset: 1, span: 1 }}>
            <Icon type="clock-circle" theme="filled" />
          </Col>
          <Col xs={{ offset: 2, span: 15 }}>
            <span>이전 거래 내역</span>
          </Col>
          <Col xs={{ offset: 2, span: 2 }}>
            <Icon type="right" />
          </Col>
        </Link>
      </Row>
      <Row>
        <Link>
          <Col xs={{ offset: 1, span: 1 }}>
            <Icon type="user" />
          </Col>
          <Col xs={{ offset: 2, span: 15 }}>
            <span>회원 정보 수정</span>
          </Col>
          <Col xs={{ offset: 2, span: 2 }}>
            <Icon type="right" />
          </Col>
        </Link>
      </Row>
      <Row>
        <Link>
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
      <Row>
        <Col>결제수단관리</Col>
      </Row>
    </div>
  );
}
