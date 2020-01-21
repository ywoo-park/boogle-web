import React, { useState } from "react";
// import styled from "styled-components";
import { Col, Row, Carousel, Icon } from "antd";
import { Link } from "react-router-dom";

export default function Subject() {
  const { id, setId } = useState("");
  const detail_sub_url = `http://13.125.191.60:8080/sell?id={id}`;

  return (
    <div>
      <header>
        <Row style={{ marginTop: "3vh", marginBottom: "5vh" }}>
          <Col xs={{ span: 8 }}>
            <Link to="/">
              <Icon
                type="arrow-left"
                style={{
                  marginLeft: "25%",
                  fontSize: "3vh"
                  // color: "#ffffff"
                }}
              />
            </Link>
          </Col>
          <Col xs={{ span: 1, offset: 11 }}>
            <Icon type="heart" />
          </Col>
          <Col xs={{ span: 1, offset: 2 }}>
            <Icon type="share-alt" />
          </Col>
        </Row>
      </header>
      <Row>
        <Col align="center">
          <Carousel>
            <div>
              <h1>one</h1>
            </div>
            <div>
              <h1>two</h1>
            </div>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Col align="center">책 정보</Col>
      </Row>
      <Row>
        <Col align="center">판매자 정보</Col>
      </Row>
      <Row>
        <Col align="center">거래 정보</Col>
      </Row>
      <Row>
        <Col align="center">코멘트</Col>
      </Row>
      {/* <Button>구매하기</Button> */}
    </div>
  );
}
