import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Row, Col, Icon, Card, Modal, Divider, Table, Tag, Button } from "antd";
import axios from "axios";
import './DashBoard.css';

export default function DashBoard() {

    const [userList, setUserList] = useState([]);
    const [isAuthImageModalOpened, setIsAuthImageModalOpened] = useState(false);
    const [userCampusAuthImage, setUserCampusAuthImage] = useState(null);

    const getAllUsers = () => {
        axios.get('http://13.124.113.72:8080/admin/users')
            .then((response) => {
                setUserList(response.data.data);
            });
    }

    const getUserCampusAuthImage = (userId) => {
        axios.get('http://13.124.113.72:8080/authImage?userId=' + userId)
            .then((response) => {
                setUserCampusAuthImage(response.data.data);
            });
    }

    React.useEffect(() => {
        getAllUsers();
    }, [])

    React.useEffect(() => {
        if(userCampusAuthImage != null) {
            setIsAuthImageModalOpened(true);
        }
    }, [userCampusAuthImage])

    const authImageConfirmModal = (authImageUrl) => {
        return(
            <Modal
                title="Basic Modal"
                title="학생증 인증"
                visible={isAuthImageModalOpened}
                onCancel={() => { setIsAuthImageModalOpened(false) }}
                footer={null}
                destroyOnClose={true}
            >
                <div>
                    <Row>
                        <Col span = {8} offset ={8}>
                            <img style={{width : "100%", height : "auto"}} src={authImageUrl}></img>
                        </Col>
                    </Row>
                    <Row>
                        <Col span = {8} offset ={8}>
                            <Button>학생증 인증 확인</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        );
    }



    const columns = [
        {
            title: '회원 고유 번호',
            dataIndex: 'id',
            key: 'id',
            render: text => <a>{text}</a>,
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
        },
        {
            title: '이메일',
            dataIndex: 'email',
            key: 'email',
            render: text => <a>{text}</a>,
        },
        {
            title: '닉네임',
            dataIndex: 'nickname',
            key: 'nickname',
            render: text => <a>{text}</a>,
        },
        {
            title: '전공',
            dataIndex: 'majorList',
            key: 'majorList',
            render: text => <a>{text}</a>,
        },
        {
            title: '학기',
            dataIndex: 'semester',
            key: 'semester',
            render: text => <a>{text}학기</a>,
        },
        {
            title: '학생 인증 여부',
            dataIndex: 'authComplete',
            key: 'authComplete',
            render: (flag, record) => flag ? <a>인증 완료</a> : <div><Button
                onClick={() => getUserCampusAuthImage(record.id)}
                style={{ color: "black", fontWeight: 800 }}>인증 필요</Button>

        {userCampusAuthImage && userCampusAuthImage.authImageUrl ? 
            authImageConfirmModal(userCampusAuthImage.authImageUrl) : null}
            
        </div>,
        }
    ];

    return (
        <section id="dashboard-container">
            <Row style={{
                width: "100%", minHeight: "10%", background: "black",
                textAlign: "center", display: "table"
            }}>
                <Col style={{ height: "100%" }} span={4} offset={10}><h5 style={{
                    color: "white",
                    verticalAlign: "middle", margin: "10% 0 10% 0"
                }}>운영팀 대시보드</h5></Col>
            </Row>
            <Row style={{
                width: "100%", minHeight: "10%", background: "white",
                textAlign: "center", display: "table", borderBottom: "1px solid black"
            }}>
                <Col style={{ height: "100%" }} span={4} offset={10}><h5 style={{
                    color: "black",
                    verticalAlign: "middle", margin: "10% 0 10% 0"
                }}><a>회원 정보 관리</a></h5></Col>
            </Row>
            <Row>
                <Col span={22} offset={1}>
                    {userList.length != 0 ? <Table columns={columns} dataSource={userList}></Table> : null}
                </Col>
            </Row>
        </section>
    )
}