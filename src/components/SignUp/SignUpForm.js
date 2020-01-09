import React, { useState } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { Row, Col, Icon, List, Card, Divider, Rate, Radio } from 'antd';
import Search from '../Navbar/Search';
import { withRouter, Link } from "react-router-dom";
import Camera from 'react-html5-camera-photo';
import axios from 'axios';
import './SignUpForm.css';


export default function SignUpForm() {

    const { register, handleSubmit, errors } = useForm();
    const [step, setStep] = useState(0);
    const [password, setPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [formStyle, setFormStyle] = useState(["show", "hide"]);
    const [checkList, setCheckList] = useState([false,false,false]);
    const [checkStyleList, setCheckStyleList] = useState(["sign-up-check", "sign-up-check", "sign-up-check"])

    const onSubmitFirstForm = (data) => {
        console.log(data);
        setStep(1)
    };
    const onSubmitSecondForm = (data) => {
        console.log(data);
    };

    React.useEffect(() => {
        if (step == 0) setFormStyle(["show", "hide"]);
        else if (step == 1) setFormStyle(["hide", "show"]);
    }, [step])
    React.useEffect(() => {

    }, [checkList])

    return (
        <section id="signup-form-container">
                <div class={formStyle[0]}>
                <form onSubmit={handleSubmit(onSubmitFirstForm)} enctype="multipart/form-data">
                    <Row style={{ marginTop: "3vh", marginBottom: "5vh" }}>
                        <Col xs={{ span: 8 }}>
                            <Icon style={{
                                marginLeft: "25%",
                                fontSize: "3vh", color: "#707070"
                            }} type="arrow-left"
                                onClick={() => {
                                }} />
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ span: 8 }}>
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
                                style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                name="email" placeholder="이메일"
                                ref={register({
                                    required: '이메일을 입력해주세요.',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "이메일의 형태로 입력해주세요."
                                    }
                                })} />
                            <ErrorMessage errors={errors} name="email" as="p" />
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
                                style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                name="password" placeholder="비밀번호" ref={register({
                                    required: "비밀번호를 입력해주세요."
                                })}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" />
                            {password.length < 8 && password.length > 0 &&  <p>8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요.</p>}
                            <ErrorMessage errors={errors} name="password" as="p" />
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
                                style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                name="confirmPassword" placeholder="비밀번호 확인" ref={register({
                                    required: "비밀번호를 입력해주세요.",
                                    validate: value => value == password
                                })}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                type="password" />
                            {confirmPassword != password && confirmPassword.length > 0 &&  <p>비밀번호가 일치하지 않습니다.</p>}
                            <ErrorMessage errors={errors} name="password" as="p" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "2.0vh", marginBottom: "2.0vh" }}>
                        <Col offset={2} span={20}>
                            <Divider style={{ background: "lightgray" }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "2vh" }}>
                        <Col offset={2} span={2}>
                            <Icon onClick={(e)=>{
                                if(checkList[0] == false){
                                    const temp = checkList;
                                    temp[0] = true; 
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else{
                                    const temp = checkList;
                                    temp[0] = false; 
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                                }} className = "sign-up-check"
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
                        <Icon onClick={(e)=>{
                                if(checkList[1] == false){
                                    const temp = checkList;
                                    temp[1] = true; 
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else{
                                    const temp = checkList;
                                    temp[1] = false; 
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                                }}
                                className = "sign-up-check"
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
                        <Icon onClick={(e)=>{
                                if(checkList[2] == false){
                                    const temp = checkList;
                                    temp[2] = true; 
                                    setCheckList(temp);
                                    e.target.style.color = "#44a0ac"
                                }
                                else{
                                    const temp = checkList;
                                    temp[2] = false; 
                                    setCheckList(temp);
                                    e.target.style.color = "#666666"
                                }
                                }}className = "sign-up-check" type="check" />
                        </Col>
                        <Col offset={0} span={20}>
                            <small>
                                이벤트 등 프로모션 알림 메일 수신
                                    </small>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "6vh" }}>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <input style={{
                                padding: "0",
                                width: "100%",
                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh",
                                
                            }}
                                type="submit"
                                value="다음 단계"
                                ></input>
                        </Col>
                    </Row>
                    </form>
                </div>
                <div class={formStyle[1]}>
                    <form onSubmit={handleSubmit(onSubmitSecondForm)} enctype="multipart/form-data"> 
                    <Row style={{ marginTop: "3vh" }}>
                        <Col xs={{ span: 8 }}>
                            <Icon style={{
                                marginLeft: "25%",
                                fontSize: "3vh", color: "#707070"
                            }} type="arrow-left"
                                onClick={() => {
                                }} />
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ span: 8 }}>
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
                                style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                name="name" ref={register({ required: "이름을 입력해주세요" })} />
                            <ErrorMessage errors={errors} name="name" />
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
                                style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                name="nickname" ref={register({ required: "닉네임을 입력해주세요" })} />
                            <ErrorMessage errors={errors} name="nickname" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>기준 학기</span>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "5vh" }}>
                        <Col xs={{ span: 10, offset: 2 }} >
                            <select name="semester" style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px" }}>
                                {["1학기", "2학기", "3학기", "4학기", "5학기", "6학기", "7학기", "8학기"]
                                    .map((value, index) => {
                                        return <option key={index}>{value}</option>
                                    })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col offset={2} span={20}>
                            <Divider style={{ color: "black" }} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1.5vh", marginBottom: "10vh" }}>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <input style={{
                                padding: "0",
                                width: "100%",
                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                            }}
                                type="submit" value="판매 등록하기"
                            />
                        </Col>
                    </Row>
                    </form>
                </div>
        </section>
    )
}
