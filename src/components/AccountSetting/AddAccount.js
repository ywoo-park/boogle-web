import React, { useContext } from "react";
import { Row, Col } from "antd";
import { ManageContext } from "./ManageAccount";

export default function AddAccount() {
  const { manageSet, dispatch } = useContext(ManageContext);

  return (
    <Row style={{marginTop : "30px"}}>
      {manageSet.bankList.map(bank => {
        return (
          <Col
          xs={{ span: 6, offset: 1 }}
            onClick={() => {
              dispatch({ type: "DETAIL_ACCOUNT", newAccount: bank });
            }}
          >
            <div           
            style={{
            height : "80px",
            border : "#a7a7a7 1px solid",
            textAlign : "center",
            marginBottom : "10px",
            borderRadius : "10px",
            fontSize : "15px",
            padding : "30px 0 30px 0"
          }}>
            <Row>
              <Col>{bank.name}</Col>
            </Row>
            </div>
          </Col>
        );
      })}
    </Row>
  );
}
