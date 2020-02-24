import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider } from "antd";
import axios from 'axios';
import './CustomerCenter.css';

export default function CustomerCenter() {

    return(
        <div>
        <Row
          style={{
            height : "70px",
            padding : "20px 0px 10px 0px",
            background:
              "url(https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/background.png)",
          }}
        >
          <Col xs={{ span: 3 }}>
            <Link to="/mypage">
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
            <h5 style={{ color: "white" }}>고객센터</h5>
          </Col>
        </Row>
            
            <Row style={{
                color : "#656565", marginTop : "30px", marginBottom : "30px", fontSize : "17.5px"}}
                onClick={() => {window.location.href='http://www.notion.so/boogle/FAQ-ea1868c0de31445e86249adec57fa7db';}}>>
                <Col xs={{ offset: 1, span: 1 }}>
                    <Icon type="question" />
                </Col>
                <Col xs={{ offset: 2, span: 15 }}>
                    <span>FAQ 게시판</span>
                </Col>
                <Col xs={{ offset: 2, span: 2 }}>
                    <Icon type="right" />
                </Col>
            </Row>
            <Row style={{color : "#656565", marginBottom : "30px", fontSize : "17.5px"}}>
                <Link style={{color : "#656565"}} to="/customerinquiry">
                <Col xs={{ offset: 1, span: 1 }}>
                    <Icon type="phone" />
                </Col>
                <Col xs={{ offset: 2, span: 15 }}>
                    <span>1:1 상담하기</span>
                </Col>
                <Col xs={{ offset: 2, span: 2 }}>
                    <Icon type="right" />
                </Col>
                </Link>
            </Row>
        </div>
    )
}