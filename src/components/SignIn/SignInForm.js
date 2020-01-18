import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { Link } from "react-router-dom";
import { Row, Col, Icon } from "antd";
import Axios from "axios";

export default function SignInForm() {
  const { register, handleSubmit, errors } = useForm();
  const [keepSignIn, setKeepSignIn] = useState(false);

  const onSubmit = data => {
    loginSend(data);
  };
  const login_check_url = "http://13.125.191.60:8080/users/signin";
  const loginSend = async data => {
    Axios.post(login_check_url, data).then(res => {
      console.log(res);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        {/* <Col span={12}></Col> */}
        <Col align="center">북을 아이콘</Col>
        {/* <Col span={12}></Col> */}
      </Row>
      <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
        <Col xs={{ span: 20, offset: 2 }} align="center">
          <input
            style={{
              width: "100%",
              border: "rgba(51, 158, 172, 0.9) solid 2px"
            }}
            name="email"
            placeholder="아이디"
            ref={register({
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "이메일의 형태로 입력해주세요."
              }
            })}
          ></input>
          <ErrorMessage errors={errors} name="id" as="p" />
        </Col>
      </Row>
      <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
        <Col xs={{ span: 20, offset: 2 }} align="center">
          <input
            name="password"
            placeholder="비밀번호"
            ref={register({ required: "비밀번호를 입력해주세요" })}
            type="password"
          ></input>
        </Col>
      </Row>
      <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
        <Col align="center" xs={{ span: 20, offset: 2 }}>
          <input type="submit" value="로그인" />
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={2}>
          <Icon
            onClick={e => {
              if (keepSignIn == false) {
                let temp = keepSignIn;
                temp = true;
                setKeepSignIn(temp);
                e.target.style.color = "#44a0ac";
              } else {
                let temp = keepSignIn;
                temp = false;
                setKeepSignIn(temp);
                e.target.style.color = "#666666";
              }
            }}
            type="check"
          />
        </Col>
        <Col offset={0} span={20}>
          <small>
            <span style={{ color: "#e95513" }}>로그인 상태 유지</span>
          </small>
        </Col>
      </Row>
      <Row>
        <Col align="center">
          <Link to="/findid">아이디 찾기</Link>
        </Col>
      </Row>
      <Row>
        <Col align="center">
          <Link to="/findpassword">비밀번호 찾기</Link>
        </Col>
      </Row>
      <Row>
        <Col align="center">
          <Link to="/signup">회원가입</Link>
        </Col>
      </Row>
    </form>
  );
}
