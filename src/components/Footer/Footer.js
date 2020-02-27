import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Modal, Button, Col, Row, Icon } from 'antd';
import { useHistory, withRouter, Link } from "react-router-dom";
import axios from 'axios';

export default function Footer() {
      return (
          <section  style={{fontSize : "11px", fontWeight : "200", color : "#666666"}}>
              <div style={{background : "#F5F5F5", height : "10px", width : "100%", marginBottom : "20px"}}></div>
              <Row style={{marginBottom : "10px"}}>
                  <Col xs={{span : 2, offset : 1}}>                   
                   <img
                      style={{ width: "80%", height: "auto"}}
                      src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/logo_gray.png"
                    ></img></Col>
                  <Col xs={{span : 10, offset : 1}}><small>캠퍼스 거래의 모든 것, 북을</small></Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 1, offset : 1}}>|</Col>
                    <Col xs={{span : 3, offset : 0}}>
                        <small>
                            <a style={{color : "#666666"}} href="https://www.notion.so/boogle/14eb1e564fd74f19b5e746c58772a010">회사소개</a>
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
                    <Col xs={{span : 3, offset :0}}>
                        <small>
                            <a style={{color : "#666666"}} href="https://www.notion.so/boogle/0ce5e44583404178a6a0f54b6ddc2001">이용약관</a>
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
                    <Col xs={{span : 5, offset :0}}>
                        <small>
                            <a style={{color : "#666666"}} href="https://www.notion.so/boogle/35d3418ec17548b4ae8328c30b5e5bed">개인정보취급방침</a>
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
                    <Col xs={{span : 3, offset :0}}>
                        <small>고객센터
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                  <Col xs={{span : 3, offset : 1}}><small>제휴문의</small></Col>
                  <Col xs={{span : 15, offset : 0}}><small>boogleforus@gmail.com</small></Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 3, offset : 1}}><small>CONTACT</small></Col>
                    <Col xs={{span : 15, offset : 1}}>
                      <small>
                          <a style={{color : "orange", textDecoration : "underline"}} href="http://pf.kakao.com/_xnlmlxb">카카오톡 플러스친구 '북을'</a>
                        </small>
                    </Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                  <Col xs={{span : 21, offset : 1}}><small>'북을'은 통신판매중개자로서 캠퍼스중고거래서비스 북을의 거래 당사자가 아니며 입점 판매자가 등록한 상품정보 및 거래에 대해 책임을 지지 않습니다.</small></Col>
              </Row>
              <div style={{background : "#F5F5F5", height : "10px", width : "100%", marginTop  : "20px"}}></div>
          </section>
      );
}