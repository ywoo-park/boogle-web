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
    const newAcc = {
      bankId: manageSet.newAccount._id,
      accountNumber: data.accountNumber,
      depositorName: data.depositorName
    };

    sendNewAcc(newAcc);
  };

  const sendNewAcc = async data => {
    axios
      .post(regNewAcc_url, data, {
        headers: { Authorization: authToken }
      })
      .then(res => {
        // if (res.data.status == 200) {
        window.location.reload();
        // }
      });
  };

  return (
    <Row style={{ marginTop: "30px", marginBottom: "40px" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row id="bankName">
          <Row >
            <Col xs={{ span: 21, offset: 1 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                은행
              </label>
            </Col>
          </Row>
          <Row style={{marginTop : "-10px", marginBottom : "20px"}}>
            <Col xs={{ span: 21, offset: 1 }}>
              <span
                style={{
                  width: "100%",
                  height: "40px",
                  border: "none",
                  backgroundColor: "transparent"
                }}
              >
                {manageSet.newAccount.name}
              </span>
            </Col>
          </Row>
        </Row>
        <Row id="newAccountNum">
          <Col>
            <Row>
              <Col xs={{ span: 21, offset: 1 }}>
                <label
                  style={{
                    color: "rgba(51, 158, 172, 0.9)",
                    fontWeight: "800"
                  }}
                >
                  계좌번호
                </label>
              </Col>
            </Row>
            <Row style={{marginTop : "-10px", marginBottom : "20px"}}>
              <Col xs={{ span: 21, offset: 1 }}>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    borderBottom: "#44a0ac solid 1.0px",
                    backgroundColor: "transparent",
                  }}
                  xs={{ span: 20, offset: 2 }}
                  name="accountNumber"
                  ref={register({ required: true })}
                ></input>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row id="ownerName">
          <Col>
            <Row>
              <Col xs={{ span: 21, offset: 1 }}>  
                <label
                  style={{
                    color: "rgba(51, 158, 172, 0.9)",
                    fontWeight: "800"
                  }}
                >
                  예금주
                </label>
              </Col>
            </Row>
            <Row>
              <Col style={{marginTop : "-10px", marginBottom : "20px"}} xs={{ span: 21, offset: 1 }}>
                <input
                  style={{
                    width: "100%",
                    height: "40px",
                    border: "none",
                    borderBottom: "#44a0ac solid 1.0px",
                    backgroundColor: "transparent",
                  }}
                  xs={{ span: 20, offset: 2 }}
                  name="depositorName"
                  ref={register({ required: true })}
                ></input>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", marginBottom: "40px" }}>
          <Col xs={{ offset: 1, span: 22 }}>
            <input
              style={{
                padding: "0",
                width: "100%",
                background: "rgba(51, 158, 172, 0.9)",
                color: "#ffffff",
                border: "none",
                fontSize: "15px", height: "35px", width: "100%",
                padding: "0", borderRadius : "16px"
              }}
              type="submit"
              onClick={() => {
                // window.location.reload();
              }}
              value="입력완료"
            />
          </Col>
        </Row>
      </form>
    </Row>
  );
}
