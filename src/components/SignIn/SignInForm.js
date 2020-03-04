import React, { useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { Link, Redirect } from "react-router-dom";
import { Row, Col, Divider } from "antd";
import Axios from "axios";
import "./SignInForm.css";

export default function SignInForm(props) {
  const { register, handleSubmit, errors } = useForm();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [isAuthComplete, setIsAuthComplete] = useState(true);

  React.useEffect(() => {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("token") != null
    ) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, []);

  const onSubmit = data => {
    console.log(data);
    loginSend(data);
  };
  const login_check_url = "http://13.124.113.72:8080/users/signin";

  const loginSend = async data => {
    Axios.post(login_check_url, data).then(res => {
      if (res.data.status === 200) {
        if(res.data.data.authComplete){
          localStorage.setItem("token", res.data.data.token);
          window.location.reload();
        }
        else{
          setIsAuthComplete(false);
        }
      } else {
        console.log("failed")
        setIsLoginFailed(true);
      }
    });
  };

  return (
    <div
      style={{
        background:
          "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
        height: "100vh",
        backgroundSize: "cover",
        paddingTop: "30px"
      }}
    >
      {isSignedIn === true ? <Redirect to="/mypage" /> : <div></div>}
      <Link to="/">
        <Row style={{ marginBottom: "20px" }}>
          <Col xs={{ offset: 1, span: 2 }}>
            <img
              style={{
                width: "32px",
                height: "auto",
                marginLeft: "40%",
                filter: "brightness(0) invert(1)"
              }}
              src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
            />
          </Col>
        </Row>
      </Link>
      <Row style={{ marginBottom: "40px" }}>
        <Col xs={{ span: 4, offset: 10 }}>
          <img
            style={{ width: "100%", height: "auto" }}
            src="https://s3.ap-northeast-2.amazonaws.com/boogle.shop/logo.png"
          ></img>
        </Col>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col xs={{ span: 20, offset: 2 }} align="center">
            <input
              style={{
                width: "100%",
                height: "40px",
                border: "#ffffff solid 1px",
                borderRadius: "20px",
                background: "RGBA(255, 255, 255,0.3)",
                color: "#ffffff"
              }}
              name="email"
              placeholder="아이디"
              ref={register({
                required: "아이디 또는 이메일을 입력해주세요"
              })}
            ></input>
            <ErrorMessage errors={errors} name="id" as="p" />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
          <Col xs={{ span: 20, offset: 2 }} align="center">
            <input
              style={{
                width: "100%",
                height: "40px",
                border: "#ffffff solid 1px",
                borderRadius: "20px",
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
        <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
          <Col style={{ textAlign: "center" }} xs={{ span: 20, offset: 2 }}>
            <input
              style={{
                width: "100%",
                height: "40px",
                border: "#ffffff solid 1px",
                borderRadius: "20px",
                background: "#ffffff",
                color: "#666666"
              }}
              type="submit"
              value="로그인"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 18, offset: 3 }}>
            {(isLoginFailed || !isAuthComplete) && (
              <p
                style={{
                  marginBottom: "0px",
                  fontSize: "12px",
                  color: "#ffffff"
                }}
              >
                {isLoginFailed ? "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다."
                : "학생증 인증 중입니다. 가입 후 24시간 이내에 완료됩니다."}
              </p>
            )}
          </Col>
        </Row>
      </form>
      <Row>
        <Col offset={2} span={20}>
          <Divider style={{ background: "#ffffff", height: "1px" }} />
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col align="center">
          <Link>
            <span style={{ color: "#ffffff" }}>아이디 찾기</span>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col align="center">
          <Link>
            <span style={{ color: "#ffffff" }}>비밀번호 찾기</span>
          </Link>
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col align="center">
          <Link to="/signup">
            <span style={{ color: "#ffffff" }}>회원가입</span>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
