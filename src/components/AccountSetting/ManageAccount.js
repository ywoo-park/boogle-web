import React, { useEffect, createContext, useReducer } from "react";
import { Row, Col, Card } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import AddAccount from "./AddAccount";
import CurrentAccount from "./CurrentAccount";
import DetailAccount from "./DetailAccount";

export const ManageContext = createContext(null);

const CURRENT_ACCOUNTS = "CURRENT_ACCOUNTS";
const ADD_ACCOUNT = "ADD_ACCOUNT";
const DETAIL_ACCOUNT = "DETAIL_ACCOUNT";
const initialState = {
  step: 0
};

// state에 계좌 정보 넣기

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
        {step.step == 0 && <CurrentAccount />}
        {step.step == 1 && <AddAccount />}
        {step.step == 2 && <DetailAccount />}
      </ManageContext.Provider>
    </div>
  );
}
