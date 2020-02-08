import React from "react";
import { Row, Col } from "antd";

export default function AddAccount(props) {
  const step = props.step;
  const bankList = ["국민은행", "NH농협", "신한은행"];
  //나중에는 server에서 받아서 setBankList 하기.

  return (
    <Row>
      <Col>
        은행 리스트 보여주기
        {bankList.map(bank => {
          return <span>{bank}</span>;
        })}
        {/* <br />
      onClick 하면 그 value 값을 <br />
      새로운 div에 보내기
      <br />
      은행 채워져 있고
      <br />
      계좌번호 입력
      <br />
      예금주 입력
      <br />
      입력완료버튼
      <br />
      ManageAccount 띄우기 */}
      </Col>
    </Row>
  );
}
