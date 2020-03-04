import React, { useState } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { Row, Col, Icon, List, Card, Divider, Rate, Radio, Modal, Popover } from 'antd';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Collapse } from 'react-collapse';
import { BeatLoader } from "react-spinners";

import host from '../../server-settings/ServerApiHost';

import './SignUpForm.css';
import '../Navbar/Search.css';

import Term1 from '../../texts/Term1';
import Term2 from '../../texts/Term2';
import Term3 from '../../texts/Term3';

export default function SignUpForm() {

    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState("");
    const [validatedEmail, setValidatedEmail] = useState(true);
    const [validatedNickname, setValidatedNickname] = useState(true);
    const [password, setPassword] = useState(0);
    const [confirmPassword, setConfirmPassword] = useState(0);
    const [formStyle, setFormStyle] = useState(["show", "hide", "hide"]);
    const [checkList, setCheckList] = useState(["0", "0", "0"]);
    const [isCheckComplete, setIsCheckComplete] = useState(true);
    const [isCollapseOpenList, setIsCollapseOpenList] = useState([false, false, false]);
    const [campus, setCampus] = useState("서강대학교");
    const [semester, setSemester] = useState("1");
    const [majorList, setMajorList] = useState([]);
    const [majorCount, setMajorCount] = useState(0);
    const [majorSearchKeyword, setMajorSearchKeyword] = useState("");
    const [searchedDepartmentMajorList, setSearchedDepartmentMajorList] = useState([]);
    const [searchedMajorList, setSearchedMajorList] = useState([]);
    const [isMajorSearched, setIsMajorSearched] = useState(false);
    const [isSearchMajorModalOpened, setIsSearchMajorModalOpended] = useState(false);
    const [signUpReq, setSignUpReq] = useState({});
    const [campusWebMail, setCampusWebMail] = useState("");
    const [emailAuthStep, setEmailAuthStep] = useState(0);
    const [authCode, setAuthCode] = useState("0000");
    const [authType, setAuthType] = useState(0);

    const [userImages, setUserImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageDiv, setImageDiv] = useState();

    const onSubmitFirstForm = (data) => {

        let majorListAsString = ""

        if (majorList.length == 1) majorListAsString = majorList[0];
        else if (majorList.length == 2) majorListAsString = majorList[0] + "," + majorList[1];
        else majorListAsString = majorList[0] + "," + majorList[1] + "," + majorList[2];

        if (validatedEmail && validatedNickname) {
            setSignUpReq({
                email: data.email,
                password: data.password,
                checkList: checkList[0] + checkList[1] + checkList[2],
                name: data.name,
                nickname: data.nickname,
                campus: campus,
                semester: semester,
                majorList: majorListAsString,
                phoneNumber: "010" + data.phone_2 + data.phone_3,
                isAuthComplete : authType == 0 ? true : false
            })
        }
    };

    const handleOpenCollapse = (i) => {
        let tempArr = [...isCollapseOpenList];
        let temp = tempArr[i];
        temp = !temp;
        tempArr[i] = temp;
        setIsCollapseOpenList(tempArr);
    }

    React.useEffect(() => {
        fetch('../../texts/Term1.txt').then(r => r.text())
            .then(t => console.log(t));
        window.scrollTo(0, 1);
    }, [])

    React.useEffect(() => {
        if (step == 0) setFormStyle(["show", "hide", "hide"]);
        else if (step == 1) setFormStyle(["hide", "show", "hide"]);
        else if (step == 2) setFormStyle(["hide", "hide", "show"]);
    }, [step])

    React.useEffect(() => {
        if (step == 1)
            saveUser();
    }, [signUpReq])

    React.useEffect(() => {
        console.log(majorList);
    }, [majorList])

        React.useEffect(() => {
        console.log(majorCount);
    }, [majorCount])

    React.useEffect(() => {
        if (searchedDepartmentMajorList.length != 0) {
            /*
            const arr = [];
            searchedDepartmentMajorList.map((departmentMajor, index) => {
                departmentMajor.majorList.map((m, i) => {
                    arr.push(m);
                })
            })
            setSearchedMajorList(arr);
            */
            setSearchedMajorList(searchedDepartmentMajorList);
        }
    }, [searchedDepartmentMajorList])

    React.useEffect(() => {
        setImageDiv(imageUrls.map((i, index) => (
            <Col xs={{ span: 4, offset: 1 }}>
                <div
                    style={{
                        border: "#44a0ac 1px solid",
                        height: "65px", width: "65px",
                        position: "relative", borderRadius: "10px",
                        top: "50%", left: "50%"
                    }}>
                    <Icon type="close-circle"
                        style={{
                            color: "rgba(51, 158, 172, 0.9)", margin: "auto", position: "relative",
                            left: 45, top: -5, zIndex: 100
                        }}
                        onClick={() => {
                            let currImageUrls = imageUrls;
                            currImageUrls.splice(index, 1);
                            setImageUrls(currImageUrls);
                        }}>
                    </Icon>
                    <img style={{
                        width: "100%", height: "100%",
                        position: "absolute",
                        top: "0", left: "0",
                        objectFit: "contain"
                    }} src={i}
                    />
                </div>
            </Col>
        )));

    }, [imageUrls]);

    const saveUser = () => {

        axios.post(host + '/users/signup', signUpReq, {
        })
            .then((response) => {

                if(response.data.data != ""){
                    localStorage.setItem('token', response.data.data);
                }
                
                if (authType == 1) {
                    let form = new FormData();
                    form.append('userCampusAuthImage', {

                    })
                    form.append('userCampusAuthImageFile', userImages[0])
                    axios.post(host + '/authImage', form, {
                        headers: { Authorization: response.data.data }
                    })
                        .then((response) => {
                            setStep(2);
                            setTimeout(() => {
                                setStep(3);
                            }, 3000);
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                }
                else {
                    setStep(2);
                    setTimeout(() => {
                        setStep(3);
                    }, 3000);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const validateEmail = async (email) => {
        if (email != undefined) {
            axios.get(host + '/users/signup/validateEmail?email=' + email)
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
            axios.get(host + '/users/signup/validateNickname?nickname=' + nickname)
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

    const searchMajor = (keyword) => {
        axios.get(host + '/majors?campus=서강대학교&keyword=' + keyword, {
        })
            .then((response) => {
                console.log(response.data.data);
                setSearchedDepartmentMajorList(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const sendAuthCode = (userName, email, campusEmail) => {

        setEmailAuthStep(1);

        axios.get(host + '/users/signup/authNumber?userName=' + userName + "&email="
            + email + "&campusEmail=" + campusEmail, {
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const authEmail = (email, authCode) => {

        axios.get(host + '/users/signup/authEmail?email=' + email + "&authCode="
            + authCode, {
        })
            .then((response) => {
                console.log(response);
                if (response.data.data == true) { console.log(response.data.data); setEmailAuthStep(2); }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <section id="signup-form-container">
            <form name="firstForm" onSubmit={handleSubmit(onSubmitFirstForm)}>
                <div class={formStyle[0]}>
                    <Row style={{ marginTop: "30px", marginBottom: "40px" }}>
                        <Col xs={{ span: 8 }}>
                            <Link to="/signin">
                                <img style={{
                                    width: "32px",
                                    height: "auto",
                                    marginLeft: "25%",
                                }}
                                    src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
                            </Link>
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ offset: 4, span: 2 }}>
                            <Link to="/signin">
                                <img style={{
                                    width: "22px",
                                    height: "auto",
                                    marginLeft: "25%",
                                }}
                                    src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/x_mark.png" />
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>아이디(이메일)</span>
                        </Col>
                    </Row>
                    <Row >
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "#44a0ac solid 1.0px",
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
                                    setEmail(e.target.value);
                                    if (e.target.value.length > 0 && e.target.value != undefined) {
                                        validateEmail(e.target.value)
                                    }
                                }} />
                            {!validatedEmail && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>중복된 이메일입니다.</p>}
                            {validatedEmail && email.length > 0 && !email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>이메일 형식으로 입력해주세요.</p>}
                            <ErrorMessage style={{ marginBottom: "-10px", fontSize: "12px" }} errors={errors} name="email" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>비밀번호</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "#44a0ac solid 1.0px",
                                    backgroundColor: "transparent"
                                }}
                                name="password" placeholder="비밀번호" ref={register({
                                    required: "비밀번호를 입력해주세요."
                                })}
                                onChange={(e) => { setPassword(e.target.value) }}
                                type="password" />
                            {password.length < 8 && password.length > 0 && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>8~16자 영문 대 소문자, 숫자, 특수문자를 사용해주세요.</p>}
                            <ErrorMessage style={{ marginBottom: "-10px", fontSize: "12px" }} errors={errors} name="password" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>비밀번호 확인</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "#44a0ac solid 1.0px",
                                    backgroundColor: "transparent"
                                }}
                                name="confirmPassword" placeholder="비밀번호 확인" ref={register({
                                    required: "비밀번호를 입력해주세요.",
                                })}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                                type="password" />
                            {confirmPassword != password && confirmPassword.length > 0 && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>비밀번호가 일치하지 않습니다.</p>}
                            <ErrorMessage style={{ marginBottom: "-10px", fontSize: "12px" }} errors={errors} name="password" as="p" />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "15px", marginBottom: "15px" }}>
                        <Col offset={2} span={20}>
                            <Divider style={{ background: "lightgray" }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col offset={2} span={2}>
                            <img style={{ width: "100%", height: "auto" }}
                                onClick={() => { handleOpenCollapse(0) }}
                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/icon_down.png"></img>
                        </Col>
                        <Col offset={1} span={15}>
                            <small>
                                북을 이용약관 동의
                                <span style={{ color: "#e95513" }}>(필수)</span>
                            </small>
                            {!isCheckComplete && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>필수 항목에 체크해주세요.</p>}
                        </Col>
                        <Col offset={0} span={2}>
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
                            {/*<input type="checkbox"></input>*/}
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "30px" }} xs={{ span: 20, offset: 2 }} >
                            <Collapse isOpened={isCollapseOpenList[0]}>
                                <textarea
                                    readOnly
                                    style={{
                                        width: "100%", border: "#656565 solid 0.3px", borderRadius: "5px",
                                        color: "transparent", textShadow: "0 0 0 black",
                                        height: "100px"
                                    }}
                                    value={Term1} />
                            </Collapse>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col offset={2} span={2}>
                            <img style={{ width: "100%", height: "auto" }}
                                onClick={() => { handleOpenCollapse(1) }}
                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/icon_down.png"></img>
                        </Col>
                        <Col offset={1} span={15}>
                            <small>
                                개인정보 수집 및 이용에 대한 안내
                                        <span style={{ color: "#e95513" }}>(필수)</span>
                            </small>
                            {!isCheckComplete && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>필수 항목에 체크해주세요.</p>}
                        </Col>
                        <Col offset={0} span={2}>
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
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "30px" }} xs={{ span: 20, offset: 2 }} >
                            <Collapse isOpened={isCollapseOpenList[1]}>
                                <textarea
                                    readOnly
                                    style={{
                                        width: "100%", border: "#656565 solid 0.3px", borderRadius: "5px",
                                        color: "transparent", textShadow: "0 0 0 black",
                                        height: "100px"
                                    }}
                                    value={Term2} />
                            </Collapse>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "10px" }}>
                        <Col offset={2} span={2}>
                            <img style={{ width: "100%", height: "auto" }}
                                onClick={() => { handleOpenCollapse(2) }}
                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/icon_down.png"></img>
                        </Col>
                        <Col offset={1} span={15}>
                            <small>
                                이메일, SMS 광고 수신 동의
                                        <span style={{ color: "#e95513" }}>(선택)</span>
                            </small>
                        </Col>
                        <Col offset={0} span={2}>
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
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "30px" }} xs={{ span: 20, offset: 2 }} >
                            <Collapse isOpened={isCollapseOpenList[2]}>
                                <textarea
                                    readOnly
                                    style={{
                                        width: "100%", border: "#656565 solid 0.3px", borderRadius: "5px",
                                        color: "transparent", textShadow: "0 0 0 black",
                                        height: "100px"
                                    }}
                                    value={Term3} />
                            </Collapse>
                        </Col>
                    </Row>
                    <Row>
                    </Row>
                    <Row style={{ marginBottom: "100px" }}>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <button
                                type="button"
                                onClick={() => {
                                    const formValues = getValues();

                                    if(checkList.length > 0 && checkList[0] == "0" || checkList[1] == "0"){
                                        setIsCheckComplete(false);
                                    }
                                    else{
                                        setIsCheckComplete(true);
                                    }

                                    if(formValues.email != "" && formValues.password != ""
                                        && formValues.confirmPassword != "" && checkList[0] == "1"
                                        && checkList[1] == "1" && validatedEmail) {
                                        setStep(1);
                                    }
                                }}
                                style={{
                                    padding: "0",
                                    width: "100%",
                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                    border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                }}
                            >다음 단계</button>
                        </Col>
                    </Row>
                </div>
                <div class={formStyle[1]}>
                    <Row style={{ marginTop: "30px", marginBottom: "40px" }}>
                        <Col xs={{ span: 8 }}>
                            <img style={{
                                width: "32px",
                                height: "auto",
                                marginLeft: "25%",
                            }}
                                onClick={() => {
                                    if (step == 1) setStep(0);
                                }}
                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
                        </Col>
                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                            <h5 style={{ color: "#707070" }}>회원가입</h5>
                        </Col>
                        <Col xs={{ offset: 4, span: 2 }}>
                            <img style={{
                                width: "22px",
                                height: "auto",
                                marginLeft: "25%",
                            }}
                                onClick={() => {
                                    if (step == 1) setStep(0);
                                }}
                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/x_mark.png" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>이름</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="name" ref={register({ required: "이름을 입력해주세요" })} />
                            <ErrorMessage style={{ marginBottom: "-10px", fontSize: "12px" }} errors={errors} name="name" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 8, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>닉네임</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
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
                            {!validatedNickname && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>중복된 닉네임입니다.</p>}
                            <ErrorMessage style={{ marginBottom: "-10px", fontSize: "12px" }} errors={errors} name="nickname" as="p" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 10, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학교</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                            <select onChange={(e) => { setValue('semester', e.target.value) }} name="campus"
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent",
                                }}>
                                {["서강대학교"]
                                    .map((value, index) => {
                                        return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "10px" }}
                                            key={index}>{value}</option>
                                    })}
                            </select>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }}>
                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>전공</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 24, offset: 0 }}>
                                    <input
                                        readOnly
                                        className="major-input"
                                        style={{
                                            width: "100%", height: "40px", border: "none",
                                            borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                            backgroundColor: "transparent"
                                        }}
                                        value={majorList.length != 0 ? majorList[0] : ""}
                                        onClick={() => { setIsSearchMajorModalOpended(true) }}
                                    />

                                    {
                                        majorList.length == 0 ?

                                            <Icon className="major-search-button" type="search" theme="outlined"

                                                style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                onClick={() => { setIsSearchMajorModalOpended(true) }}></Icon>

                                            :

                                            <Icon className="major-search-button" type="close-circle"

                                                style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                onClick={() => {

                                                    let currMajorList = majorList;
                                                    currMajorList.splice(0, 1)
                                                    setMajorList(currMajorList);

                                                    let currMajorCount = majorCount;
                                                    if(currMajorCount > 0) currMajorCount = currMajorCount - 1;
                                                    setMajorCount(currMajorCount);

                                                    setMajorSearchKeyword("");
                                                    setSearchedMajorList([]);;

                                                }}></Icon>
                                    }


                                    {(majorList.length == 1 && majorCount == 1 && majorList.length == majorCount)
                                        || (majorList.length > 1) ?

                                        <div>
                                            <input
                                                readOnly
                                                style={{
                                                    marginTop: "22px",
                                                    width: "100%", height: "40px", border: "none",
                                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                                    backgroundColor: "transparent"
                                                }}
                                                value={majorList.length != 0 ? majorList[1] : null}
                                            />

                                            {

                                                majorList.length == 1 ?

                                                    <Icon className="major-search-button_2" type="search" theme="outlined"

                                                        style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                        onClick={() => { setIsSearchMajorModalOpended(true) }}></Icon>

                                                    :

                                                    <Icon className="major-search-button_2" type="close-circle"

                                                        style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                        onClick={() => {

                                                            let currMajorList = majorList;
                                                            currMajorList.splice(1, 1)
                                                            setMajorList(currMajorList);

                                                            let currMajorCount = majorCount;
                                                            if(currMajorCount > 0) currMajorCount = currMajorCount - 1;
                                                            setMajorCount(currMajorCount);

                                                            setMajorSearchKeyword("");
                                                            setSearchedMajorList([]);;

                                                        }}></Icon>
                                            }
                                        </div>

                                        : majorList.length == 1 && majorCount == 0 ?
                                            <div style={{ margin: "10px auto 20px auto", textAlign: "center" }}>
                                                <Icon onClick={() => {
                                                    let currentMajorCount = majorCount + 1;
                                                    setMajorCount(currentMajorCount);
                                                }} type="plus-circle"
                                                ></Icon>
                                            </div>
                                            : null
                                    }

                                    {(majorList.length == 2 && majorCount == 2 && majorList.length == majorCount)
                                        || (majorList.length > 2) ?
                                        <div>
                                            <input
                                                readOnly
                                                style={{
                                                    marginTop: "22px",
                                                    width: "100%", height: "40px", border: "none",
                                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                                    backgroundColor: "transparent"
                                                }}
                                                value={majorList.length != 0 ? majorList[2] : null}
                                            />
                                            {
                                                majorList.length == 2 ?

                                                    <Icon className="major-search-button_3" type="search" theme="outlined"

                                                        style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                        onClick={() => { setIsSearchMajorModalOpended(true) }}></Icon>

                                                    :

                                                    <Icon className="major-search-button_3" type="close-circle"

                                                        style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto" }}

                                                        onClick={() => {

                                                            let currMajorList = majorList;
                                                            currMajorList.splice(2, 1)
                                                            setMajorList(currMajorList);

                                                            let currMajorCount = majorCount;
                                                            if(currMajorCount > 0) currMajorCount = currMajorCount - 1;
                                                            setMajorCount(currMajorCount);

                                                            setMajorSearchKeyword("");
                                                            setSearchedMajorList([]);;

                                                        }}></Icon>
                                            }
                                        </div>

                                        : majorList.length == 2 && majorCount == 1 ?
                                            <div style={{ margin: "10px auto 20px auto", textAlign: "center" }}>
                                                <Icon onClick={() => {
                                                    let currentMajorCount = majorCount + 1;
                                                    setMajorCount(currentMajorCount);
                                                }} type="plus-circle"
                                                ></Icon>
                                            </div>
                                            : null
                                    }

                                    <Modal
                                        className="search-form"
                                        title="전공 검색"
                                        visible={isSearchMajorModalOpened}
                                        onCancel={() => { setIsSearchMajorModalOpended(false) }}
                                        footer={null}
                                        destroyOnClose={true}>

                                        <Row>
                                            <Col xs={{ span: 24, offset: 0 }}>
                                                <input
                                                    className="major-search-input" type="text"
                                                    onChange={(e) => { setMajorSearchKeyword(e.target.value) }}
                                                    onKeyPress={(e) => {
                                                        if (e.key == 'Enter') {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                />
                                                <Icon className="major-search-input-button" type="search" theme="outlined"
                                                    style={{ color: "#707070", margin: "auto" }}
                                                    onClick={() => { searchMajor(majorSearchKeyword); setIsMajorSearched(true); }}></Icon>
                                            </Col>
                                        </Row>
                                        {
                                            searchedMajorList.length != 0 ?
                                                searchedMajorList.map((major) => {
                                                    return (
                                                        <Row style={{ marginTop: "20px" }}>
                                                            <Col xs={{ span: 24, offset: 0 }}>
                                                                <input
                                                                    readOnly
                                                                    value={major}
                                                                    className="major-search-result"
                                                                    onClick={() => {
                                                                        let currMajorList = majorList;
                                                                        currMajorList.push(major);
                                                                        setMajorList(currMajorList);
                                                                        setMajorSearchKeyword("");
                                                                        setSearchedMajorList([]);;
                                                                        setIsSearchMajorModalOpended(false);
                                                                    }} />
                                                            </Col>
                                                        </Row>
                                                    );
                                                })
                                                : null
                                        }

                                    </Modal>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 20, offset: 2 }}>
                            <Row>
                                <Col xs={{ span: 24, offset: 0 }}>
                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학기(2020년 1학기 기준)</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 24, offset: 0 }} >
                                    <select onChange={(e) => {
                                        if (e.target.value == "졸업생") setSemester("10");
                                        else setSemester(e.target.value[0].toString());
                                    }} name="semester"
                                        style={{
                                            width: "100%", height: "40px", border: "none",
                                            borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                            backgroundColor: "transparent"
                                        }}>
                                        {["1학기", "2학기", "3학기", "4학기", "5학기", "6학기", "7학기", "8학기", "9학기 이상", "졸업생"]
                                            .map((value, index) => {
                                                return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "10px" }} key={index}>{value}</option>
                                            })}
                                    </select>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 2 }}><span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>핸드폰</span></Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 6, offset: 2 }}>
                            <select name="semester"
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}>
                                {["010"]
                                    .map((value, index) => {
                                        return <option style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "10px" }} key={index}>{value}</option>
                                    })}
                            </select>
                        </Col>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 6, offset: 1 }}>
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="phone_2" ref={register({ required: "핸드폰 번호를 입력해주세요" })} />
                        </Col>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 6, offset: 1 }}>
                            <input
                                style={{
                                    width: "100%", height: "40px", border: "none",
                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                    backgroundColor: "transparent"
                                }}
                                name="phone_3" ref={register({ required: "핸드폰 번호를 입력해주세요" })} />
                        </Col>
                    </Row>
                    <Row>
                        <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 5, offset: 2 }}>
                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학교 인증</span>
                        </Col>
                        <Col style={{ position: "relative", top: -3.5, marginLeft: "5px" }} xs={{ span: 5, offset: 0 }}>
                            <Popover
                                trigger="click"
                                content={
                                    <div>
                                        <span>학교 이메일 인증</span>
                                        <ul>
                                            <li>________@sogang.ac.kr 형식의 이메일로 학교 인증을 해주세요.</li>
                                            <li>https://mail.sogang.ac.kr 혹은 SAINT 로그인 후 메일함을 확인해주세요.</li>
                                            <li>북을에서 전송한 인증번호 4자리를 입력해주세요.</li>
                                        </ul>
                                        <span>학생증 인증</span>
                                        <ul>
                                            <li>실물(모바일) 학생증 혹은 SAINT 첫 화면을 촬영(캡쳐)하여 업로드해주세요.</li>
                                            <li>학생증 인증 시 회원가입 승인까지 최대 2일이 소요될 수 있습니다</li>
                                        </ul>
                                    </div>
                                } title="학교 인증 도움말">
                                <Icon type="question-circle" />
                            </Popover>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "0px", marginBottom: "20px" }}>
                        <Col xs={{ span: 10, offset: 2 }}>
                            <button
                                type="button"
                                class={authType == 0 ? "sign-up-auth-button-active" : "sign-up-auth-button"}
                                style={{
                                    width: "100%",
                                    color: "#666666",
                                    border: "#666666 0.3px solid",
                                    borderRight: "none",
                                    borderTopLeftRadius: "8px",
                                    borderBottomLeftRadius: "8px",
                                    borderTopRightRadius: "0px",
                                    borderBottomRightRadius: "0px",
                                    fontSize: "12px",
                                    height: "36px"
                                }}
                                onClick={() => setAuthType(0)}>학교 이메일 인증</button>
                        </Col>
                        <Col xs={{ span: 10, offset: 0 }}>
                            <button
                                type="button"
                                class={authType == 1 ? "sign-up-auth-button-active" : "sign-up-auth-button"}
                                style={{
                                    width: "100%",
                                    color: "#666666",
                                    border: "#666666 0.3px solid",
                                    borderLeft: "none",
                                    borderTopRightRadius: "8px",
                                    borderBottomRightRadius: "8px",
                                    borderTopLeftRadius: "0px",
                                    borderBottomLeftRadius: "0px",
                                    fontSize: "12px",
                                    height: "36px"
                                }}
                                onClick={() => { setAuthType(1) }}>학생증 인증</button>
                        </Col>
                    </Row>
                    {authType == 0 ?
                        <div>

                            <Row>
                                <Col xs={{ span: 8, offset: 2 }}>
                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학교 웹메일</span>
                                </Col>
                            </Row>

                            <Row>
                                <Col style={{ marginTop: "0px", marginBottom: "20px" }} xs={{ span: 20, offset: 2 }} >
                                    <input
                                        style={{
                                            width: "100%", height: "40px", border: "none",
                                            borderBottom: "#44a0ac solid 1.0px",
                                            backgroundColor: "transparent"
                                        }}
                                        onChange={(e) => {
                                            setCampusWebMail(e.target.value);
                                        }} />
                                    {(campusWebMail.length > 0) && (campusWebMail.indexOf("sogang.ac.kr") == -1) && <p style={{ marginBottom: "-10px", fontSize: "12px" }}>서강대학교 웹메일이 아닙니다.</p>}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "0px", marginBottom: "20px" }}>
                                <Col xs={{ span: 20, offset: 2 }}>
                                    <button
                                        type="button"
                                        style={{
                                            padding: "0",
                                            width: "100%",
                                            background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                            border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                        }}
                                        onClick={() => {

                                            if (campusWebMail.length > 0 &&
                                                campusWebMail.indexOf("sogang.ac.kr") != -1) {

                                                const userName = getValues().name;
                                                const email = getValues().email;
                                                const campusEmail = campusWebMail;

                                                sendAuthCode(userName, email, campusEmail);
                                            }
                                        }}
                                    >인증번호 보내기</button>
                                </Col>
                            </Row>
                            {authType == 0 && emailAuthStep == 1 ?
                                <Row style={{ marginTop: "-70px", marginBottom: "70px" }}>
                                    <Col xs={{ span: 14, offset: 2 }}>
                                        <input
                                            style={{
                                                width: "100%", height: "40px", border: "none",
                                                borderBottom: "#44a0ac solid 1.0px",
                                                backgroundColor: "transparent"
                                            }}
                                            placeholder="인증번호 4자리를 입력해주세요."
                                            onChange={(e) => {
                                                setAuthCode(e.target.value);
                                            }} />
                                    </Col>
                                    <Col xs={{ span: 5, offset: 1 }}>
                                        <button
                                            type="button"
                                            style={{
                                                marginTop: "10px",
                                                padding: "0",
                                                width: "100%",
                                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                            }}
                                            onClick={() => {

                                                const email = getValues().email;

                                                authEmail(email, authCode);

                                            }}
                                        >인증</button>
                                    </Col>
                                </Row> : null}
                            {authType == 0 && emailAuthStep == 2 ?
                                <div>
                                    <Row style={{ marginTop: "0px", marginBottom: "20px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <button
                                                type="button"
                                                style={{
                                                    padding: "0",
                                                    width: "100%",
                                                    background: "#ffffff", color: "#47a7b4",
                                                    border: "#47a7b4 1px solid", borderRadius: "14px", fontSize: "18px", height: "32px"
                                                }}
                                            >인증 완료</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "100px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <input style={{
                                                padding: "0",
                                                width: "100%",
                                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                            }}
                                                type="submit" value="가입완료"
                                            />
                                        </Col>
                                    </Row>
                                </div> : null}</div>
                        : authType == 1 ?
                            <div>
                                <Row>
                                    <Col xs={{ span: 8, offset: 2 }}>
                                        <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>학생증 등록</span>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <Col xs={{ span: 2, offset: 2 }}>
                                        <input id="selectedFile" type="file" accept="image/*;capture=camera"
                                            onChange={(e) => {

                                                if (userImages.length < 3) {

                                                    const file = e.target.files[0];
                                                    setUserImages(userImages => [...userImages, file]);

                                                    let reader = new FileReader();

                                                    reader.onloadend = () => {
                                                        setImageUrls(imageUrls => [...imageUrls, reader.result])
                                                    }

                                                    reader.readAsDataURL(file)

                                                }
                                            }}
                                            style={{ display: "none" }}
                                        />
                                        <div onClick={() => {
                                            if (userImages.length < 3)
                                                document.getElementById('selectedFile').click()
                                        }}
                                            style={{
                                                border: "#44a0ac 1px solid",
                                                height: "65px", width: "65px",
                                                position: "relative", borderRadius: "10px"
                                            }}>
                                            <Icon type="camera"
                                                style={{
                                                    fontSize: "5vh", position: "absolute",
                                                    textAlign: "center", width: "100%", transform: "translate(-50%, -50%)",
                                                    top: "50%", left: "50%", color: "#44a0ac"
                                                }} />
                                        </div>
                                    </Col>
                                    {imageDiv != undefined ? imageDiv : null}
                                </Row>
                                <Row style={{ marginBottom: "100px" }}>
                                    <Col xs={{ span: 20, offset: 2 }}>
                                        <input style={{
                                            padding: "0",
                                            width: "100%",
                                            background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                            border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                        }}
                                            type="submit" value="가입완료"
                                        />
                                    </Col>
                                </Row>
                            </div>
                            : null}
                </div>
            </form>
            <div class={formStyle[2]}>

                {step == 2 ?

                    <Row style={{ marginTop: "50%" }}>
                        <Col xs={{ span: 4, offset: 10 }} style={{ padding: "auto" }}>
                            <BeatLoader
                                size={"15px"}
                                color={"#339eac"}
                                loading={true}
                            />
                        </Col>
                    </Row>

                    : step == 3 ?
                        <div>
                            <Row style={{ marginTop: "20px" }}>
                                <Col xs={{ span: 8 }}>
                                </Col>
                                <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                    <h5 style={{ color: "#707070" }}>회원가입</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ offset: 3, span: 18 }} style={{ textAlign: "center", marginTop: "20%" }}>
                                    <img style={{ width: "70%", height: "auto" }}
                                        src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/Group+289%403x.png"></img>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={{ offset: 3, span: 18 }} style={{ textAlign: "center", marginTop: "30px" }}>
                                    <h5 style={{ textAlign: "center", color: "#44a0ac", fontWeight: "800" }}>
                                        {authType == 0 ? "회원 가입 완료!" : "회원가입 신청이 완료되었습니다! 학생증 인증 확인까지 최대 24시간이 소요됩니다."}
                                    </h5>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "10vh" }}>
                                <Col xs={{ span: 20, offset: 2 }}>
                                    <Link to={authType == 0 ? "/mypage" : "/"}>
                                        <button style={{
                                            padding: "0",
                                            width: "100%",
                                            background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                            border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                                        }}
                                            onClick={() => {
                                            }}
                                        >{authType == 0 ? "마이페이지로" : "홈으로"}</button>
                                    </Link>
                                </Col>
                            </Row>
                        </div>
                        : null
                }
            </div>
        </section>
    )
}