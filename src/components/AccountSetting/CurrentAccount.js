import React, { useContext } from "react";
import { Col, Row, Card } from "antd";

export default function CurrentAccount() {
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
