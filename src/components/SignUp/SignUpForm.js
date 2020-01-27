import React, { useState } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { Row, Col, Icon, List, Card, Divider, Rate, Radio } from 'antd';
import Search from '../Navbar/Search';
import { withRouter, Link } from "react-router-dom";
import Camera from 'react-html5-camera-photo';
import Multiselect from 'react-bootstrap-multiselect';
import axios from 'axios';

import './SignUpForm.css';

export default function SignUpForm() {

    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    const [step, setStep] = useState(0);
    const [validatedEmail, setValidatedEmail] = useState(true);
    const [validatedNickname, setValidatedNickname] = useState(true);
    const [password, setPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [formStyle, setFormStyle] = useState(["show", "hide", "hide"]);
    const [checkList, setCheckList] = useState(["0", "0", "0"]);
    const [campus, setCampus] = useState("서강대학교");
    const [semester, setSemester] = useState("1");
    const [major, setMajor] = useState("경영학과");
    const [signUpReq, setSignUpReq] = useState({})

    const onSubmitFirstForm = (data) => {
        if (validatedEmail && validatedNickname) {
            setSignUpReq({
                email: data.email,
                password: data.password,
                checkList: checkList[0] + checkList[1] + checkList[2],
                name: data.name,
                nickname: data.nickname,
                campus: campus,
                semester: semester,
                major: major,
                phoneNumber: "010" + data.phone_2 + data.phone_3
            })
        }
    };

    React.useEffect(() => {
        console.log(step);
        if (step == 0) setFormStyle(["show", "hide", "hide"]);
        else if (step == 1) setFormStyle(["hide", "show", "hide"]);
        else if (step == 2) setFormStyle(["hide", "hide", "show"]);
    }, [step])

    React.useEffect(() => {
        if (step == 1)
            saveUser();
    }, [signUpReq])

    const saveUser = () => {
        axios.post('http://13.124.113.72:8080/users/signup', signUpReq, {
        })
            .then((response) => {
                console.log(response);
                setStep(2);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const validateEmail = async (email) => {
        if (email != undefined) {
            axios.get('http://13.124.113.72:8080/users/signup/validateEmail?email=' + email)
                .then((response) => {

                    if (response.data.status == 200 && validatedEmail == true) {
                        setValidatedEmail(false)
                    }
                    else if (response.data.status == 404 && validatedEmail == false) {
                        setValidatedEmail(true)
                    }
                });
        }
    }

    const validateNickname = async (nickname) => {
        if (nickname != undefined) {
            axios.get('http://13.124.113.72:8080/users/signup/validateNickname?nickname=' + nickname)
                .then((response) => {

                    if (response.data.status == 200 && validatedNickname == true) {
                        setValidatedNickname(false)
                    }
                    else if (response.data.status == 404 && validatedNickname == false) {
                        setValidatedNickname(true)
                    }
                });
        }
    }

    return (
        <section id="signup-form-container">
            <form name="firstForm" onSubmit={handleSubmit(onSubmitFirstForm)}>
                <div class={formStyle[0]}>
                    <Row style={{ marginTop: "3vh", marginBottom: "5vh" }}>
                        <Col xs={{ span: 8 }}>
                            <Link to="/signin">
                                <Icon style={{
                                    marginLeft: "25%",
                                    fontSize: "3vh", color: "#707070"
                                }} type="arrow-left"
                                />
                            </Link>
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ offset: 4, span: 2 }}>
                            <Link to="/signin">
                                <Icon style={{
                                    marginLeft: "25%",
                                    fontSize: "3vh", color: "#707070"
                                }} type="close"
                                    onClick={() => {
                                        if (step == 1) setStep(0);
                                    }} />
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>이메일</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="email" placeholder="이메일"
                                ref={register({
                                    required: '이메일을 입력해주세요.',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "이메일의 형태로 입력해주세요."
                                    }
                                })}
                                onChange={(e) => {
                                    if (e.target.value.length > 0 && e.target.value != undefined) {
                                        validateEmail(e.target.value)
                                    }
                                }} />
                            {!validatedEmail && <p style={{ marginBottom: "-2.5vh" }}>중복된 이메일입니다.</p>}
                            <ErrorMessage style={{ marginBottom: "-2.5vh" }} errors={errors} name="email" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>비밀번호</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="password" placeholder="비밀번호" ref={register({
                                    required: "비밀번호를 입력해주세요."
                                })}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" />
                            {password.length < 8 && password.length > 0 && <p style={{ marginBottom: "-2.5vh" }}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요.</p>}
                            <ErrorMessage style={{ marginBottom: "-2.5vh" }} errors={errors} name="password" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>비밀번호 확인</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="confirmPassword" placeholder="비밀번호 확인" ref={register({
                                    required: "비밀번호를 입력해주세요.",
                                })}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                type="password" />
                            {confirmPassword != password && confirmPassword.length > 0 && <p style={{ marginBottom: "-2.5vh" }}>비밀번호가 일치하지 않습니다.</p>}
                            <ErrorMessage style={{ marginBottom: "-2.5vh" }} errors={errors} name="password" as="p" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "4.0vh", marginBottom: "2.0vh" }}>
                        <Col offset={2} span={20}>
                            <Divider style={{ background: "lightgray" }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2vh" }}>
                        <Col offset={2} span={2}>
                            <Icon onClick={(e) => {
                                if (checkList[0] == "0") {
                                    const temp = checkList;
                                    temp[0] = "1";
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else {
                                    const temp = checkList;
                                    temp[0] = "0";
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                            }} className="sign-up-check"
                                type="check" />
                        </Col>
                        <Col offset={0} span={20}>
                            <small>
                                북을 이용약관 동의
                                <span style={{ color: "#e95513" }}>(필수)</span>
                            </small>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2vh" }}>
                        <Col offset={2} span={2}>
                            <Icon onClick={(e) => {
                                if (checkList[1] == "0") {
                                    const temp = checkList;
                                    temp[1] = "1";
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else {
                                    const temp = checkList;
                                    temp[1] = "0";
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                            }}
                                className="sign-up-check"
                                type="check" />
                        </Col>
                        <Col offset={0} span={20}>
                            <small>
                                개인정보 수집 및 이용에 대한 안내
                                        <span style={{ color: "#e95513" }}>(필수)</span>
                            </small>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "6vh" }}>
                        <Col offset={2} span={2}>
                            <Icon onClick={(e) => {
                                if (checkList[2] == "0") {
                                    const temp = checkList;
                                    temp[2] = "1";
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else {
                                    const temp = checkList;
                                    temp[2] = "0";
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                            }} className="sign-up-check" type="check" />
                        </Col>
                        <Col offset={0} span={20}>
                            <small>
                                이벤트 등 프로모션 알림 메일 수신
                                    </small>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "20vh" }}>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <button
                                type="button"
                                onClick={() => {
                                    const formValues = getValues();
                                    if (formValues.email != "" && formValues.password != ""
                                        && formValues.confirmPassword != "" && checkList[0] == "1"
                                        && checkList[1] == "1" && validatedEmail) {
                                        setStep(1);
                                    }
                                }}
                                style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh",
                                }}
                            >다음 단계</button>
                        </Col>
                    </Row>
                </div>
                <div class={formStyle[1]}>
                    <Row style={{ marginTop: "3vh" }}>
                        <Col xs={{ span: 8 }}>
                            <Icon style={{
                                marginLeft: "25%",
                                fontSize: "3vh", color: "#707070"
                            }} type="arrow-left"
                                onClick={() => {
                                    if (step == 1) setStep(0);
                                }} />
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ offset: 4, span: 2 }}>
                            <Icon style={{
                                marginLeft: "25%",
                                fontSize: "3vh", color: "#707070"
                            }} type="close"
                                onClick={() => {
                                    if (step == 1) setStep(0);
                                }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} span={20}>
                            <Divider />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>이름</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="name" ref={register({ required: "이름을 입력해주세요" })} />
                            <ErrorMessage style={{ marginBottom: "-2.5vh" }} errors={errors} name="name" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>닉네임</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="nickname" ref={register({
                                    required: '닉네임을 입력해주세요.',
                                    validate: validatedNickname
                                })}
                                onChange={(e) => {
                                    if (e.target.value.length > 0 && e.target.value != undefined) {
                                        validateNickname(e.target.value)
                                    }
                                }} />
                            {!validatedNickname && <p style={{ marginBottom: "-2.5vh" }}>중복된 닉네임입니다.</p>}
                            <ErrorMessage style={{ marginBottom: "-2.5vh" }} errors={errors} name="nickname" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 10, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학교</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 20, offset: 2 }} >
                            <select onChange={(e) => { setValue('semester', e.target.value) }} name="campus"
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}>
                                {["서강대학교"]
                                    .map((value, index) => {
                                        return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "2vh" }}
                                            key={index}>{value}</option>
                                    })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 10, offset: 2 }}>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }}>
                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학과</span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                                <Col xs={{ span: 23, offset: 0 }} >
                                    <select onChange={(e) => { setMajor(e.target.value) }} name="major"
                                        style={{
                                            width: "100%", border: "none",
                                            borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                            backgroundColor: "transparent"
                                        }}>
                                        {["경영학과"]
                                            .map((value, index) => {
                                                return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "2vh" }} key={index}>{value}</option>
                                            })}
                                    </select>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={{ span: 10, offset: 0 }}>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }}>
                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학기</span>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                                <Col xs={{ span: 23, offset: 1 }} >
                                    <select onChange={(e) => { setSemester(e.target.value[0].toString()) }} name="semester"
                                        style={{
                                            width: "100%", border: "none",
                                            borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                            backgroundColor: "transparent"
                                        }}>
                                        {["1학기", "2학기", "3학기", "4학기", "5학기", "6학기", "7학기", "8학기"]
                                            .map((value, index) => {
                                                return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "2vh" }} key={index}>{value}</option>
                                            })}
                                    </select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 2 }}><span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>핸드폰</span></Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh" }}>
                        <Col xs={{ span: 6, offset: 2 }}>
                            <select name="semester"
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}>
                                {["010"]
                                    .map((value, index) => {
                                        return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "2vh" }} key={index}>{value}</option>
                                    })}
                            </select>
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="phone_2" ref={register({ required: "핸드폰 번호를 입력해주세요" })} />
                        </Col>
                        <Col xs={{ span: 6, offset: 1 }}>
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="phone_3" ref={register({ required: "핸드폰 번호를 입력해주세요" })} />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학교 인증</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "1.5vh"}}>
                        <Col xs={{ span: 10, offset: 2 }}>
                            <button
                                style={{ width : "100%",
                                color : "#666666",
                                backgroundColor : "#b0dae2",
                                border : "#666666 0.3px solid",
                                fontSize: "1.8vh",
                                height : "5vh" }}
                                >학교 이메일 인증</button>
                        </Col>
                        <Col xs={{ span: 10, offset: 0 }}>
                            <button
                                style={{ width : "100%",
                                color : "#666666",
                                border : "#666666 0.3px solid",
                                fontSize: "1.8vh",
                                height : "5vh" }}
                                >학생증 인증</button>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "5vh", marginBottom: "20vh" }}>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <input style={{
                                padding: "0",
                                width: "100%",
                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                            }}
                                type="submit" value="가입완료"
                            />
                        </Col>
                    </Row>
                </div>
            </form>
            <div class={formStyle[2]}>
                <Row style={{ marginTop: "3vh" }}>
                    <Col xs={{ span: 8 }}>
                    </Col>
                    <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                        <h5 style={{ color: "#707070" }}>회원가입</h5>
                    </Col>
                    <Col xs={{ offset: 4, span: 2 }}>
                        <Link to="/">
                            <Icon style={{
                                marginLeft: "25%",
                                fontSize: "3vh", color: "#707070"
                            }} type="close"
                                onClick={() => {
                                    return
                                }} />
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ offset: 3, span: 18 }} style={{ textAlign: "center", marginTop: "20vh" }}>
                        <img style={{ width: "70%", height: "auto" }}
                            src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/Group+289%403x.png"></img>
                    </Col>
                </Row>
                <Row>
                    <Col xs={{ offset: 3, span: 18 }} style={{ textAlign: "center", marginTop: "8vh" }}>
                        <h5 style={{ textAlign: "center", color: "#44a0ac", fontWeight: "800" }}>회원 가입 완료!</h5>
                    </Col>
                </Row>
                <Row style={{ marginTop: "10vh" }}>
                    <Col xs={{ span: 20, offset: 2 }}>
                        <Link to="/">
                            <button style={{
                                padding: "0",
                                width: "100%",
                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                            }}
                            >다음 단계</button>
                        </Link>
                    </Col>
                </Row>
            </div>
        </section>
    )
}
