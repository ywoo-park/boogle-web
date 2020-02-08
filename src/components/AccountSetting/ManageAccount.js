import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ManageAccount() {
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
          <h5 style={{ color: "white" }}>계좌 관리</h5>
        </Col>
      </Row>
      <Row id="account-list">
        <Col>
          <p>
            Current Accounts API에서 리스트로 받으면, 그것을 map함수로 row를
            만들어 그 안에 col - card를 넣기. 생성하기.
          </p>
          <Row>
            <Col>
              <Card
                hoverable
                style={{
                  width: "100%",
                  borderRadius: "18px",
                  border: "solid 1px #a7a7a7",
                  paddingBottom: "15vh"
                }}
              >
                <Row>
                  <Col>
                    <span>국민은행 12344</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>예금주</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                    >
                      삭제하기
                    </button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>Add account button</Col>
      </Row>
    </div>
  );
}
