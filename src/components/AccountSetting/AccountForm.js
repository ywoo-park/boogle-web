import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Card } from "antd";

import axios from "axios";

export default function AccountForm() {
  const [manageStep, setManageStep] = useState(0);
  const [newBank, setNewBank] = useState("");
  const [newAccountNum, setNewAccountNum] = useState("");
  const [newOwner, setNewOwner] = useState("");

  return (
    <div>
      <Row
        style={{
          background:
            "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)"
        }}
      >
        <Col xs={{ span: 3 }}>
          {/* <Link to=} */}
          <img
            style={{
              width: "32px",
              height: "auto",
              marginLeft: "40%",
              filter: "brightness(0) invert(1)"
            }}
            src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
            onClick={() => {
              //   return manageStep == 0 && <Redirect to="/setting" />;
            }}
          />
        </Col>
        <Col xs={{ span: 8, offset: 5 }} align="center">
          <h5 style={{ color: "white" }}>계좌 관리</h5>
        </Col>
      </Row>
      {manageStep === 0 && <CurrentAccount></CurrentAccount>}
      {manageStep === 1 && <AddAccount></AddAccount>}
      {manageStep === 2 && <DetailAccount></DetailAccount>}
    </div>
  );

  function CurrentAccount() {
    return (
      <Row id="refer-accounts">
        <Col>
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
            <Col>
              <button
                onClick={() => {
                  setManageStep(1);
                }}
              >
                계좌 추가하기
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
  function AddAccount() {
    const bankList = [
      "국민은행",
      "NH농협",
      "신한은행",
      "우리은행",
      "기업은행",
      "SC은행",
      "부산은행"
    ];
    //나중에는 server에서 받아서 setBankList 하기.

    return (
      <Row>
        {bankList.map(bank => {
          return (
            <Col
              xs={{ span: 6, offset: 2 }}
              onClick={() => {
                setNewBank(bank);
                return setManageStep(2);
              }}
            >
              <Row>
                <Col>이미지</Col>
              </Row>
              <Row>
                <Col>{bank}</Col>
              </Row>
            </Col>
          );
        })}

        {/* <br />
        onClick 하면 그 value 값을 <br />
        새로운 div에 보내기
        <br />
        은행 채워져 있고
        <br />
        계좌번호 입력
        <br />
        예금주 입력
        <br />
        입력완료버튼
        <br />
        ManageAccount 띄우기 */}
      </Row>
    );
  }
  function DetailAccount() {
    return (
      <Row>
        <Row id="bankName">
          <Row>
            <Col>
              <label>은행</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>{newBank}</span>
            </Col>
          </Row>
        </Row>
        <Row id="newAccountNum">
          <Col>
            <Row>
              <Col>
                <label>계좌번호</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input
                  title="bank"
                  onChange={e => {
                    setNewAccountNum(e);
                  }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row id="ownerName">
          <Col>
            <Row>
              <Col>
                <label>예금주</label>
              </Col>
            </Row>
            <Row>
              <Col>
                <input title="ownerName" />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <button
              onClick={() => {
                setManageStep(0);
              }}
            >
              입력완료
            </button>
          </Col>
        </Row>
      </Row>
    );
  }
}
