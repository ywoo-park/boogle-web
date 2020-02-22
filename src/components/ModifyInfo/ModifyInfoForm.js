import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm, ErrorMessage } from "react-hook-form";
import { Row, Col, Icon, Divider } from "antd";
import axios from "axios";

export default function ModifyInfoForm() {
  const { register, setValue, handleSubmit, errors } = useForm();
  const [userData, setUserData] = useState({});
  const [modifiedData, setModifiedData] = useState({});
  const [password, setPassword] = useState(0);
  const [confirmPassword, setConfirmPassword] = useState(0);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [validatedNickname, setValidatedNickname] = useState(true);
  const [semester, setSemester] = useState("1");
  const [major, setMajor] = useState("경영학과");

  const userData_url = "http://13.124.113.72:8080/users/modification";
  const authToken =
    localStorage.getItem("token") == null ? "" : localStorage.getItem("token");

  React.useEffect(() => {
    if (authToken != "" && authToken != null) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }

    if (isSignedIn) {
      const getPrevData = async () => {
        const result = await axios
          .get(userData_url, {
            headers: { Authorization: authToken }
          })
          .then(res => {
            setUserData(res.data.data);
            setValue("name", res.data.data.name);
            setValue("nickname", res.data.data.nickname);
          });
      };
      getPrevData();
    }
  }, [isSignedIn]);

  const validateNickname = async nickname => {
    if (nickname != undefined) {
      axios
        .get(
          "http://13.124.113.72:8080/users/signup/validateNickname?nickname=" +
            nickname
        )
        .then(response => {
          if (response.data.status == 200 && validatedNickname == true) {
            setValidatedNickname(false);
          } else if (
            response.data.status == 404 &&
            validatedNickname == false
          ) {
            setValidatedNickname(true);
          }
        });
    }
  };

  const modifyFin = async data => {
    setModifiedData(data);
    console.log(data);
  };

  return (
    <div>
      {userData != undefined ? (
        <form onSubmit={handleSubmit(modifyFin)}>
          {console.log(userData)}
          <Row>
            <Col>
              <Icon type="arrow-left" />
            </Col>
            <Col>
              <span>회원 정보 수정</span>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                이름
              </label>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 20, offset: 2 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                  backgroundColor: "transparent"
                }}
                name="name"
                ref={register}
              />
              <ErrorMessage
                style={{ marginBottom: "-2.5vh" }}
                errors={errors}
                name="name"
                as="p"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                닉네임
              </label>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 20, offset: 2 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                  backgroundColor: "transparent"
                }}
                name="nickname"
                ref={register({
                  validate: validatedNickname
                })}
                onChange={e => {
                  if (
                    e.target.value.length > 0 &&
                    e.target.value != undefined
                  ) {
                    validateNickname(e.target.value);
                  }
                }}
              />
              {!validatedNickname && (
                <p style={{ marginBottom: "-2.5vh" }}>중복된 닉네임입니다.</p>
              )}
              <ErrorMessage
                style={{ marginBottom: "-2.5vh" }}
                errors={errors}
                name="nickname"
                as="p"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 10, offset: 2 }}>
              <Row>
                <Col xs={{ span: 24, offset: 0 }}>
                  <label
                    style={{
                      color: "rgba(51, 158, 172, 0.9)",
                      fontWeight: "800"
                    }}
                  >
                    학과
                  </label>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
                  xs={{ span: 23, offset: 0 }}
                >
                  <select
                    onChange={e => {
                      setMajor(e.target.value);
                    }}
                    name="major"
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                      backgroundColor: "transparent"
                    }}
                  >
                    {["경영학과"].map((value, index) => {
                      return (
                        <option
                          style={{
                            width: "100%",
                            border: "rgba(51, 158, 172, 0.9) solid 2px",
                            fontSize: "2vh"
                          }}
                          key={index}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </Col>
            <Col xs={{ span: 10, offset: 0 }}>
              <Row>
                <Col xs={{ span: 24, offset: 0 }}>
                  <label
                    style={{
                      color: "rgba(51, 158, 172, 0.9)",
                      fontWeight: "800"
                    }}
                  >
                    학기
                  </label>
                </Col>
              </Row>
              <Row>
                <Col
                  style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
                  xs={{ span: 23, offset: 1 }}
                >
                  <select
                    defaultValue={`${userData.semester}학기`}
                    onChange={e => {
                      setSemester(e.target.value[0].toString());
                    }}
                    name="semester"
                    style={{
                      width: "100%",
                      border: "none",
                      borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                      backgroundColor: "transparent"
                    }}
                  >
                    {[
                      "1학기",
                      "2학기",
                      "3학기",
                      "4학기",
                      "5학기",
                      "6학기",
                      "7학기",
                      "8학기",
                      "9학기 이상",
                      "졸업"
                    ].map((value, index) => {
                      return (
                        <option
                          style={{
                            width: "100%",
                            border: "rgba(51, 158, 172, 0.9) solid 2px",
                            fontSize: "2vh"
                          }}
                          key={index}
                        >
                          {value}
                        </option>
                      );
                    })}
                  </select>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 4, offset: 2 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                핸드폰
              </label>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 6, offset: 2 }}
            >
              <select
                name="semester"
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                  backgroundColor: "transparent"
                }}
              >
                {["010"].map((value, index) => {
                  return (
                    <option
                      style={{
                        width: "100%",
                        border: "rgba(51, 158, 172, 0.9) solid 2px",
                        fontSize: "2vh"
                      }}
                      key={index}
                    >
                      {value}
                    </option>
                  );
                })}
              </select>
            </Col>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 6, offset: 1 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                  backgroundColor: "transparent"
                }}
                name="phone_2"
                ref={register}
              />
            </Col>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 6, offset: 1 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                  backgroundColor: "transparent"
                }}
                name="phone_3"
                ref={register}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                비밀번호 변경
              </label>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 20, offset: 2 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "#44a0ac solid 1.0px",
                  backgroundColor: "transparent"
                }}
                name="password"
                placeholder="비밀번호"
                ref={register}
                onChange={e => {
                  setPassword(e.target.value);
                }}
                type="password"
              />
              {password.length < 8 && password.length > 0 && (
                <p style={{ marginBottom: "-2.5vh" }}>
                  8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요.
                </p>
              )}
              <ErrorMessage
                style={{ marginBottom: "-2.5vh" }}
                errors={errors}
                name="password"
                as="p"
              />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 8, offset: 2 }}>
              <label
                style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}
              >
                비밀번호 변경 확인
              </label>
            </Col>
          </Row>
          <Row>
            <Col
              style={{ marginTop: "-0.5vh", marginBottom: "3.0vh" }}
              xs={{ span: 20, offset: 2 }}
            >
              <input
                style={{
                  width: "100%",
                  border: "none",
                  borderBottom: "#44a0ac solid 1.0px",
                  backgroundColor: "transparent"
                }}
                name="confirmPassword"
                placeholder="비밀번호 확인"
                ref={register}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
              />
              {confirmPassword != password && confirmPassword.length > 0 && (
                <p style={{ marginBottom: "-2.5vh" }}>
                  비밀번호가 일치하지 않습니다.
                </p>
              )}

              <ErrorMessage
                style={{ marginBottom: "-2.5vh" }}
                errors={errors}
                name="password"
                as="p"
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "10vh" }}>
            <Col xs={{ span: 20, offset: 2 }}>
              <input
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
                type="submit"
                value="수정완료"
              ></input>
            </Col>
          </Row>
        </form>
      ) : null}
    </div>
  );
}
