import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';

export default function BoxCheck() {
    const[boxNumber, setBoxNumber] = useState("");
    const[boxPassword, setBoxPassword] = useState("");
    useEffect(() => {
        getBoxInfo();
      }, []);
    
    const getBoxInfo = () => {
        axios.get('http://13.124.113.72:8080/myPage', {
        headers: { Authorization: localStorage.getItem('token') }
        })
        .then((response) => {
            console.log(response);
            setBoxNumber(response.data.data.boxNumber);
            setBoxPassword(response.data.data.boxPassword);
        });
    }

    return(
        <div style={{
            background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
            height: "100vh", backgroundSize: "cover"
            ,paddingTop : "1vh"
          }} className="boxcheck"> 
          <Row>
              <Col offset={1}>
              <Link to="/">
                <img style={{
                  width: "32px",
                  height: "auto",
                  marginLeft: "0",
                  filter: "brightness(0) invert(1)"
                }}
                  src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
              </Link>
              </Col>
          </Row>

          <Row>
                    <button style={{
                      padding: "0",
                      width: "100%",
                      background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                      border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                    }}
                    >비밀번호 보러가기</button>
                </Row>

          <Card style={{marginTop:"3%", width:"100%", height:"100%", backgroundColor: "#ffffff"}}>
            
          </Card>
        </div>
    )
}