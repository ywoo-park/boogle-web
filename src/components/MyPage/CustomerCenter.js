import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './CustomerCenter.css';

export default function CustomerCenter() {

    return(
        <div style={{
            background: "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
            height: "100vh", backgroundSize: "cover"
            ,paddingTop : "1vh"
          }} className="customercenter"> 
          <Row>
              <Col offset={1}>
              <Link to="/mypage">
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
          <Card style={{marginTop:"3%", width:"100%", height:"100%", backgroundColor: "#ffffff"}}>
            <Row style={{marginTop:"1.5vh", marginBottom:"1.5vh"}}
            onClick={() => {window.location.href='http://www.notion.so/boogle/FAQ-ea1868c0de31445e86249adec57fa7db';}}>
                <Col span={4}>
                    <Icon type="question" style={{
                        color:"#000000", marginRight: "1vh", fontSize: "3vh",
                        marginLeft: "2vh"
                    }}></Icon>
                </Col>
                <Col span={10} style={{color:"#000000", textAlign: "center", 
                    fontSize: "2.5vh"}}>
                    FAQ 게시판
                </Col>
            </Row>
            <Row style={{marginTop:"1.5vh", marginBottom:"1.5vh"}}>
                <Link to='/customerinquiry'>
                <Col span={4}>
                    <Icon type="phone" style={{
                        color:"#000000", marginRight: "1vh", fontSize: "3vh",
                        marginLeft: "2vh"
                    }}></Icon>
                </Col>
                <Col span={10} style={{color:"#000000", textAlign: "center", 
                    fontSize: "2.5vh"}}>
                    1:1 상담하기
                </Col>
                </Link>
            </Row>
          </Card>
        </div>
    )
}