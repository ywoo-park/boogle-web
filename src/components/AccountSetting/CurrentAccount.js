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
            <Row>
              <Col>
                {manageSet.accounts.map(account => {
                  return (
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
                          <span>
                            {bankNameList(account.bankId)}
                            {account.accountNumber}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span>예금주 : {account.depositorName}</span>
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
          <Col>
            <button
              onClick={() => {
                dispatch({ type: "ADD_ACCOUNT" });
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
