import React, { useContext } from "react";
import { Row, Col } from "antd";
import { ManageContext } from "./ManageAccount";

export default function AddAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);

  return (
    <Row>
      {manageSet.bankList.map(bank => {
        return (
          <Col
            xs={{ span: 6, offset: 2 }}
            onClick={() => {
              dispatch({ type: "DETAIL_ACCOUNT", newAccount: bank });
            }}
          >
            <Row>
              <Col>
                <img src={bank.imageUrl} />
              </Col>
            </Row>
            <Row>
              <Col>{bank.name}</Col>
            </Row>
          </Col>
        );
      })}
    </Row>
  );
}
