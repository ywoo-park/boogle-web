import React, { useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { Link, Redirect, withRouter } from "react-router-dom";
import { Row, Col, Icon, Divider } from "antd";
import Axios from "axios";
import "./SignInForm.css";

export default function SignInForm(props) {
  const { register, handleSubmit, errors } = useForm();
<<<<<<< HEAD
  const [isSignedIn, setIsSignedIn] = useState(false);

  React.useEffect(() => {
    if(localStorage.getItem('token') != '' && localStorage.getItem('token') != null){
      setIsSignedIn(true);
    }
    else{
      setIsSignedIn(false);
    }
}, [])
=======
  // const [keepSignIn, setKeepSignIn] = useState(false);
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9

  const onSubmit = data => {
    loginSend(data);
  };
  const login_check_url = "http://13.124.113.72:8080/users/signin";

  const loginSend = async data => {
    Axios.post(login_check_url, data).then(res => {
<<<<<<< HEAD
      console.log(res.data.status);
      console.log(res.data.data);
      if(res.data.status == 200){
        localStorage.setItem('token', res.data.data);
      }
=======
      console.log(res);
      //web session에 token 보내기
      //이전 페이지로 돌아가기
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
    });
  };

  return (
<<<<<<< HEAD


    <div style={{
      background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
      height: "100vh", backgroundSize: "cover"
      , paddingTop: "5vh"
    }}>
      {isSignedIn == true ? <Redirect to="/mypage"/>: <div></div>}
      <Link to="/">
        <Row style={{ marginBottom: "5vh" }}>
          <Col xs={{ offset : 1, span: 2 }}><img style={{
            width: "22px",
            height: "auto",
            marginLeft: "40%",
            filter: "brightness(0) invert(1)"
          }}
            src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"/>
            </Col>
        </Row>
      </Link>
      <Row style={{ marginBottom: "10vh" }}>
        <Col xs={{ span: 4, offset: 10 }}>
          <img style={{ width: "100%", height: "auto" }}
            src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"></img>
=======
    <div
      style={{
        background:
          "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
        height: "100vh",
        backgroundSize: "cover",
        paddingTop: "5vh"
      }}
    >
      <Row style={{ marginBottom: "5vh" }}>
        <Col xs={{ span: 8 }}>
          <Link to="/">
            <Icon
              style={{
                marginLeft: "25%",
                fontSize: "3vh",
                color: "#ffffff"
              }}
              type="arrow-left"
            />
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "10vh" }}>
        <Col xs={{ span: 4, offset: 10 }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"
          ></img>
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
          <Col xs={{ span: 20, offset: 2 }} align="center">
            <input
              style={{
                width: "100%",
                border: "#ffffff solid 1px",
                borderRadius: "3vh",
                background: "RGBA(255, 255, 255,0.3)",
                color: "#ffffff"
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
              style={{
                width: "100%",
                border: "#ffffff solid 1px",
                borderRadius: "3vh",
                background: "RGBA(255, 255, 255,0.3)",
                color: "#ffffff"
              }}
              name="password"
              placeholder="비밀번호"
              ref={register({ required: "비밀번호를 입력해주세요" })}
              type="password"
            ></input>
          </Col>
        </Row>
        <Row style={{ marginTop: "3.5vh", marginBottom: "3.5vh" }}>
<<<<<<< HEAD
          <Col style={{ textAlign: "center" }} xs={{ span: 20, offset: 2 }}>
=======
          <Col align="center" xs={{ span: 20, offset: 2 }}>
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
            <input
              style={{
                width: "100%",
                border: "#ffffff solid 1px",
                borderRadius: "3vh",
                background: "#ffffff",
<<<<<<< HEAD
                color: "#666666",
              }}
              type="submit" value="로그인" />
          </Col>
        </Row>
      </form>
      <Row>
        <Col offset={2} span={20}><Divider style={{ background: "#ffffff", height: "0.18vh" }} /></Col>
      </Row>
      <Row style={{ marginBottom: "1.5vh" }}>
        <Col align="center">
          <Link><span style={{ color: "#ffffff" }}>아이디 찾기</span></Link>
=======
                color: "#666666"
              }}
              type="submit"
              value="로그인"
            />
          </Col>
        </Row>
      </form>
      <Row style={{ marginBottom: "1.5vh" }}>
        <Col offset={7} span={1}>
          <Icon
            style={{
              color: "#ffffff"
            }}
            type="check"
          />
        </Col>
        <Col offset={1} span={8}>
          <small>
            <span style={{ color: "#ffffff" }}>로그인 상태 유지</span>
          </small>
        </Col>
      </Row>
      <Row>
        <Col offset={2} span={20}>
          <Divider style={{ background: "#ffffff", height: "0.18vh" }} />
        </Col>
      </Row>
      <Row style={{ marginBottom: "1.5vh" }}>
        <Col align="center">
          <Link>
            <span style={{ color: "#ffffff" }}>아이디 찾기</span>
          </Link>
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
        </Col>
      </Row>
      <Row style={{ marginBottom: "1.5vh" }}>
        <Col align="center">
<<<<<<< HEAD
          <Link><span style={{ color: "#ffffff" }}>비밀번호 찾기</span></Link>
=======
          <Link>
            <span style={{ color: "#ffffff" }}>비밀번호 찾기</span>
          </Link>
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
        </Col>
      </Row>
      <Row style={{ marginBottom: "1.5vh" }}>
        <Col align="center">
<<<<<<< HEAD
          <Link to="/signup"><span style={{ color: "#ffffff" }}>회원가입</span></Link>
=======
          <Link to="/signup">
            <span style={{ color: "#ffffff" }}>회원가입</span>
          </Link>
>>>>>>> d9a08933710afa332fa3cb23ac6289a4e49a34c9
        </Col>
      </Row>
    </div>
  );
}
