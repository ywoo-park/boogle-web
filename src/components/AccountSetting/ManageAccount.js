import React, { useState, useEffect, createContext, useReducer } from "react";
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
const FETCH_ACCOUNTS = "FETCH_ACCOUNT";

// state에 계좌 정보 넣기

const initialState = {
  step: 0,
  accounts: [
    {
      _id: null,
      userId: null,
      bankId: null,
      accountNumber: null,
      depositorName: null
    }
  ],
  newAccount: { bankId: null, accountNumber: null, depositorName: null },
  bankList: []
};

function reducer(state, action) {
  switch (action.type) {
    case CURRENT_ACCOUNTS:
      return { step: 0, accounts: state.accounts, bankList: state.bankList };
    case ADD_ACCOUNT:
      return { step: 1, accounts: state.accounts, bankList: state.bankList };
    case DETAIL_ACCOUNT:
      return {
        step: 2,
        accounts: state.accounts,
        newAccount: action.newAccount
      };
    case "BANK_LIST":
      return { bankList: action.bankList };
    case "FAILURE":
      return initialState;
    default:
      return initialState;
    case FETCH_ACCOUNTS:
      return { step: 0, accounts: action.accounts, bankList: state.bankList };
  }
}

export default function ManageAccount() {
  const [manageSet, dispatch] = useReducer(reducer, initialState);
  const server_url = `http://13.124.113.72:8080`;
  const getAcc_url = `${server_url}/userBankAccount`;
  const bankData_url = `${server_url}/bank`;
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");

  useEffect(() => {
    const getBankData = async () => {
      const result = await axios.get(bankData_url).then(res => {
        dispatch({ type: "BANK_LIST", bankList: res.data.data });
      });
    };
    getBankData();
  }, [dispatch]);

  useEffect(() => {
    const getAccData = async () => {
      const result = await axios
        .get(getAcc_url, {
          headers: { Authorization: authToken }
        })
        .then(res => {
          dispatch({ type: FETCH_ACCOUNTS, accounts: res.data.data });
        })
        .catch(error => {
          dispatch({ type: "FAILURE" });
        });
    };
    getAccData();
  }, [dispatch]);

  return (
    <div>
      <ManageContext.Provider value={{ manageSet, dispatch }}>
        <Row
          style={{
            height : "70px",
            padding : "20px 0px 10px 0px",
            background:
              "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
          }}
        >
          <Col xs={{ span: 3 }}>
            <Link to={manageSet.step == 0 ? "/setting" : null}>
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
            <h5 style={{ color: "white" }}>계좌 관리</h5>
          </Col>
        </Row>
        {manageSet.step == 0 && <CurrentAccount />}
        {manageSet.step == 1 && <AddAccount />}
        {manageSet.step == 2 && <DetailAccount />}
      </ManageContext.Provider>
    </div>
  );
}
