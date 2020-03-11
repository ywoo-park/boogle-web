import React, { useState } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { Row, Col, Menu, Dropdown, Button, Icon, Input } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import host from '../../server-settings/ServerApiHost';

export default function CustomerInquiryForm() {
  const { register, handleSubmit, errors, getValues, setValue } = useForm();

  const menu = (
    <Menu
      onClick={key => {
        setCustomerInquiryType(parseInt(key.key));
      }}
    >
      <Menu.Item key="0">직거래</Menu.Item>
      <Menu.Item key="1">북을박스</Menu.Item>
    </Menu>
  );

  const { TextArea } = Input;
  const [userImages, setUserImages] = useState([]);
  const [userImagesDiv, setUserImagesDiv] = useState();
  const [imageUrls, setImageUrls] = useState([]);
  const [customerInquiry, setCustomerInquiry] = useState();
  const [customerInquiryType, setCustomerInquiryType] = useState(0);
  const [userEmail, setUserEmail] = useState();
  const authToken =
    localStorage.getItem("token") == null ||
    localStorage.getItem("token") == undefined
      ? ""
      : localStorage.getItem("token");

  React.useEffect(() => {
    setUserImagesDiv(addImage());
  }, [imageUrls]);

  React.useEffect(() => {
    saveCustomerInquiry(customerInquiry);
    console.log("Done");
  }, [customerInquiry]);

  React.useEffect(() => {
    if (authToken != "") getUserData(authToken);
  }, [authToken]);

  const addImage = () => {
    const imageList = imageUrls.map(i => (
      <Col xs={{ span: 5, offset: 1 }}>
        <div
          style={{
            border: "#44a0ac 1px solid",
            height: "10vh",
            width: "10vh",
            position: "relative",
            borderRadius: "1.5vh"
          }}
        >
          <img
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              borderRadius: "1.5vh",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%"
            }}
            src={i}
          />
        </div>
      </Col>
    ));
    return imageList;
  };
  const onSubmit = data => {
    if (authToken !== "" && authToken !== null && authToken !== undefined) {
      setCustomerInquiry({
        customerInquiry: {
          email: userEmail,
          type: customerInquiryType,
          msg: data.msg
        },
        token: authToken
      });
    } else {
      setCustomerInquiry({
        customerInquiry: {
          email: data.email,
          type: customerInquiryType,
          msg: data.msg
        },
        token: ""
      });
    }
    console.log("OnSubmit");
  };

  const saveCustomerInquiry = customerInquiry => {
    axios
      .post(host + "/customerInquiry", customerInquiry)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    console.log(customerInquiry);
  };

  const getUserData = authToken => {
    const result = axios
      .get(host + "/users/modification", {
        headers: { Authorization: authToken }
      })
      .then(res => {
        setUserEmail(res.data.data.email);
      });
  };

  return (
    <section id="customer-inquiry-form-container"
    style={{ width: "100%",
      height: "auto",
      marginLeft: "auto auto",
      padding: "0",
      textAlign: "left"}}>
        <Row
          style={{
            height : "70px",
            padding : "20px 0px 10px 0px",
            background:
              "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
          }}
        >
          <Col xs={{ span: 3 }}>
            <Link to="/customercenter">
              <img
                style={{
                  width: "32px",
                  height: "auto",
                  marginLeft: "40%",
                  filter: "brightness(0) invert(1)"
                }}
                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png"
                onClick={<div></div>}
              />
            </Link>
          </Col>
          <Col xs={{ span: 8, offset: 5 }} align="center">
            <h5 style={{ color: "white" }}>1:1 문의하기</h5>
          </Col>
        </Row>
      <div style={{margin: "5vw", fontSize: "14px"}}>
      <form name="firstForm" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Row style={{ marginBottom: "24px" }}>
            <Col offset={0} span={4}>
              <small>이메일</small>
            </Col>
            <Col offset={1} span={19}>
              {authToken === "" || authToken === null ? (
                <input
                  style={{
                    width: "100%",
                    border: "none",
                    borderBottom: "#44a0ac solid 1.0px",
                    backgroundColor: "transparent"
                  }}
                  name="email"
                  palceholder="이메일"
                  ref={register({
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "이메일의 형태로 입력해주세요."
                    }
                  })}
                />
              ) : (
                <small ref={register()}>{userEmail}</small>
              )}
            </Col>
          </Row>
          <Row style={{ marginBottom: "24px" }}>
            <Col offset={0} span={4}>
              <small>거래방식</small>
            </Col>
            <Col offset={1} span={19}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <Button
                  style={{
                    width: "100%",
                    border: "#44a0ac 1px solid"
                  }}
                >
                  거래방식을 선택하세요
                  <Icon type="down" />{" "}
                </Button>
              </Dropdown>
            </Col>
          </Row>
          <Row style={{ marginBottom: "24px" }}>
            <Col offset={0} span={4}>
              <small>문의내용</small>
            </Col>
            <Col offset={1} span={19}>
              <textarea
                name="msg"
                rows={4}
                style={{
                  width: "100%",
                  border: "#44a0ac solid 1.0px",
                  backgroundColor: "transparent"
                }}
                ref={register}
              ></textarea>
            </Col>
          </Row>
          <Row style={{ marginBottom: "24px" }}>
            <Col offset={0} span={4}>
              <small>사진첨부</small>
            </Col>
            <Col xs={{ span: 15, offset: 1 }}>
              <input
                id="selectedFile"
                type="file"
                accept="image/*;capture=camera"
                onChange={e => {
                  const file = e.target.files[0];
                  setUserImages(userImages => [...userImages, file]);

                  let reader = new FileReader();

                  reader.onloadend = () => {
                    setImageUrls(imageUrls => [...imageUrls, reader.result]);
                  };

                  reader.readAsDataURL(file);
                }}
                style={{ display: "none" }}
              />
              <div
                onClick={() => {
                  document.getElementById("selectedFile").click();
                }}
                style={{
                  border: "#44a0ac 1px solid",
                  height: "70px",
                  width: "70px",
                  position: "relative",
                  borderRadius: "5px"
                }}
              >
                <Icon
                  type="camera"
                  style={{
                    fontSize: "5vh",
                    position: "absolute",
                    textAlign: "center",
                    width: "100%",
                    transform: "translate(-50%, -50%)",
                    top: "50%",
                    left: "50%",
                    color: "#44a0ac"
                  }}
                />
              </div>
            </Col>
            {userImagesDiv}
          </Row>
          <Row>
            <Col offset={0} span={24}>
              <button style={{
                padding: "0",
                width: "100%",
                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
              }} type="submit"
              >제출</button>
            </Col>
          </Row>
        </div>
      </form>
      </div>
    </section>
  );
}
