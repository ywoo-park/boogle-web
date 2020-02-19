import React, { useState, useContext } from "react";
import { Row, Col } from "antd";
import { useForm, ErrorMessage } from "react-hook-form";

import { ManageContext } from "./ManageAccount";
import axios from "axios";

export default function DetailAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");
  const regNewAcc_url = "http://13.124.113.72:8080/userBankAccount";
  const { register, handleSubmit, errors } = useForm();
  const [accNum, setAccNum] = useState("");
  const [depName, setDepName] = useState("");
  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row id="bankName">
          <Row>
            <Col>
              <label>은행</label>
            </Col>
          </Row>
          <Row>
            <Col>
              <span>{manageSet.newAccount.name}</span>
              {/* {console.log(manageSet.newAccount)} */}
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
                <input title="bank" ref={register({ required: true })} />
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
                <input title="ownerName" ref={register({ required: true })} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              type="submit"
              // onClick={() => {
              //   dispatch({ type: "CURRENT_ACCOUNTS" });
              // }}
              value="입력완료"
            />
          </Col>
        </Row>
      </form>
    </Row>
  );
}
