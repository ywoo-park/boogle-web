import React, { useContext } from "react";
import { Row, Col } from "antd";
import { ManageContext } from "./ManageAccount";

export default function AddAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);
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
              // setNewBank(bank);
              // return setManageStep(2);
              dispatch({ type: "DETAIL_ACCOUNT" });
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
    </Row>
  );
}
