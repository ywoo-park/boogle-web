import React, { useEffect, createContext, useReducer, useContext } from "react";
import { Row, Col, Card } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
// import AddAccount from "./AddAccount";
// import CurrentAccount from "./CurrentAccount";
// import DetailAccount from "./DetailAccount";

const CURRENT_ACCOUNTS = "CURRENT_ACCOUNTS";
const ADD_ACCOUNT = "ADD_ACCOUNT";
const DETAIL_ACCOUNT = "DETAIL_ACCOUNT";
const initialState = {
  step: 0
};

function reducer(state, action) {
  switch (action.type) {
    case CURRENT_ACCOUNTS:
      return { step: 0 };
    case ADD_ACCOUNT:
      return { step: 1 };
    case DETAIL_ACCOUNT:
      return { step: 2 };
    default:
      return initialState;
  }
}

const ManageContext = createContext(null);

export default function ManageAccount() {
  const [step, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <ManageContext.Provider value={{ step, dispatch }}>
        <Row
          style={{
            background:
              "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)"
          }}
        >
          <Col xs={{ span: 3 }}>
            <Link to={step == 0 ? "/setting" : "/accountSetting"}>
              <img
                style={{
                  width: "32px",
                  height: "auto",
                  marginLeft: "40%",
                  filter: "brightness(0) invert(1)"
                }}
                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
                onClick={() => {
                  // return manageStep == 1 ? setManageStep(0) : <div></div>;
                }}
              />
            </Link>
          </Col>
          <Col xs={{ span: 8, offset: 5 }} align="center">
            <h5 style={{ color: "white" }}>계좌 관리</h5>
          </Col>
        </Row>
        {step == 0 && <CurrentAccount />}
        {step == 1 && <AddAccount />}
        {step == 2 && <DetailAccount />}
      </ManageContext.Provider>
    </div>
  );
}

export function CurrentAccount() {
  const { step, dispatch } = useContext(ManageContext);

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
                // setManageStep(1);
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

export function AddAccount() {
  const { step, dispatch } = useContext(ManageContext);
  const bankList = ["국민은행", "NH농협", "신한은행"];
  //나중에는 server에서 받아서 setBankList 하기.

  return (
    <Row>
      <Col>
        {bankList.map(bank => {
          return <span>{bank}</span>;
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
      </Col>
    </Row>
  );
}

export function DetailAccount() {
  return (
    <Row>
      <Col>
        <span>Detail Account</span>
      </Col>
    </Row>
  );
}
