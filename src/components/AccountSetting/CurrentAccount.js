import React, { useContext } from "react";
import { Col, Row, Card } from "antd";
import { ManageContext } from "./ManageAccount";
import Axios from "axios";

export default function CurrentAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");
  const delAcc = bankAccId => {
    // console.log(bankAccId);
    const delAcc_url = `http://13.124.113.72:8080/userBankAccount?userBankAccountId=${bankAccId}`;
    Axios.delete(delAcc_url, { headers: { Authorization: authToken } }).then(
      res => {
        if (res.data.status == 200) {
          window.location.reload();
        }
      }
    );
  };

  const bankNameList = accId => {
    return manageSet.bankList.filter(b => b._id === accId)[0] !== undefined
      ? manageSet.bankList.filter(b => b._id === accId)[0].name
      : null;
  };

  return (
    <Row id="refer-accounts">
      <Col>
        <Row id="account-list">
          <Col>
            <Row style={{ marginTop: "30px" }}>
              <Col xs={{ span: 22, offset: 1 }}>
                {manageSet.accounts.map(account => {
                  return (
                    <Card
                      hoverable
                      style={{
                        width: "100%",
                        borderRadius: "18px",
                        border: "solid 1px #a7a7a7",
                        marginBottom: "10px",
                        padding: "10px 0px 10px 0px"
                      }}
                    >
                      <Row style={{ marginBottom: "5px" }}>
                        <Col>
                          <span style={{ fontSize: "20px", color: "#535353" }}>
                            {bankNameList(account.bankId) + "    "}
                            {account.accountNumber}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span>예금주 : {account.depositorName}</span>
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "20px" }}>
                        <Col xs={{ span: 12, offset: 12 }}>
                          <button
                            style={{
                              padding: "0",
                              width: "100%",
                              background: "rgba(51, 158, 172, 0.9)",
                              color: "#ffffff",
                              border: "none",
                              borderRadius: "20px",
                              fontSize: "15px",
                              height: "35px"
                            }}
                            onClick={async () => {
                              return await delAcc(account._id);
                            }}
                          >
                            삭제하기
                          </button>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 22, offset: 1 }}>
            <div
              style={{
                width: "100%",
                borderRadius: "15px",
                border: "solid 1px #a7a7a7",
                marginBottom: "10px",
                height: "50px"
              }}
            >
              <Row style={{ padding: "10px 0px 10px 0px" }}
                onClick={() => {
                  dispatch({ type: "ADD_ACCOUNT" });
                }}>
                <Col xs={{ offset: 1, span: 9 }}><span style={{ fontSize: "20px" }}>계좌 추가하기</span></Col>
                <Col xs={{ offset: 9, span: 2 }}>
                  <img
                    style={{
                      width: "32px",
                      height: "auto",
                      marginLeft: "40%",
                      transform: "scaleX(-1)"
                    }}
                    src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
                    onClick={<div></div>}
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
