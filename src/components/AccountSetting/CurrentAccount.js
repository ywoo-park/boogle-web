import React, { useContext } from "react";
import { Col, Row, Card } from "antd";
import { ManageContext } from "./ManageAccount";

export default function CurrentAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);

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
                            {account.bankId} {account.accountNumber}
                          </span>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <span>{account.depositorName}</span>
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
