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
                  <Col xs={{span : 10, offset : 1}}><small>캠퍼스 거래의 모든 것, 북을</small></Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 3, offset : 1}}>
                        <small>회사소개 
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
                    <Col xs={{span : 3, offset :0}}>
                        <small>이용약관
                        </small>
                    </Col>
                    <Col xs={{span : 1, offset : 0}}>|</Col>
                    <Col xs={{span : 5, offset :0}}>
                        <small>개인정보취급방침
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
                  <Col xs={{span : 6, offset : 0}}><small>boogleforus@gmail.com</small></Col>
              </Row>
              <Row style={{marginBottom : "10px"}}>
                    <Col xs={{span : 3, offset : 1}}><small>CONTACT</small></Col>
                    <Col xs={{span : 7, offset : 1}}>
                      <small>
                          <a style={{color : "orange", textDecoration : "underline"}} href="http://pf.kakao.com/_xnlmlxb/chat">카카오톡 플러스친구 '북을'</a>
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