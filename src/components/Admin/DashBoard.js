import React, { useState, useEffect } from "react";
import { useForm, ErrorMessage } from "react-hook-form";
import { withRouter, Link, Redirect } from "react-router-dom";
import {
  Row,
  Col,
  Modal,
  Table,
  Button,
  Input
} from "antd";
import axios from "axios";
import "./DashBoard.css";
import host from '../../server-settings/ServerApiHost';

export default function DashBoard() {
  const [isAuth, setIsAuth] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isAuthImageModalOpened, setIsAuthImageModalOpened] = useState(false);
  const [userCampusAuthImage, setUserCampusAuthImage] = useState(null);
  const [stepTWOList, setStepTWOList] = useState([]);
  const [stepFOURList, setStepFOURList] = useState([]);
  const [transData, setTransData] = useState([]);
  //   const [infoTable, setInfoTable] = useState()

  const getAllUsers = () => {
    axios.get(host + "/admin/users").then(response => {
      setUserList(response.data.data);
    });
  };

  const getStepTWO = () => {
    axios
      .get(host + "/admin/transactions/stepTwo")
      .then(res => {
        setStepTWOList(res.data.data);
      });
  };

  const getAllTrans = () => {
    axios.get(host + "/admin/transactions").then(res => {
      setTransData(res.data.data);
    });
  };

  const getStepFOUR = () => {
    axios
      .get(host + "/admin/transactions/stepFour")
      .then(res => {
        setStepFOURList(res.data.data);
      });
  };

  const getUserCampusAuthImage = userId => {
    axios
      .get(host + "/authImage?userId=" + userId)
      .then(response => {
        setUserCampusAuthImage(response.data.data);
      });
  };

  const confirmAuthUser = userId => {
    axios
      .get(host + "/authImage/confirm?userId=" + userId)
      .then(response => {
        window.location.reload();
      });
  };

  const changeStep = sellItemId => {
    axios
      .get(
        host + `/admin/change_step?sellItemId=${sellItemId}`
      )
      .then(res => {
        window.location.reload();
      });
  };

  React.useEffect(() => {
    getAllUsers();
    getStepTWO();
    getStepFOUR();
    getAllTrans();
  }, []);

  React.useEffect(() => {
    if (userCampusAuthImage != null) {
      setIsAuthImageModalOpened(true);
    }
  }, [userCampusAuthImage]);

  const authImageConfirmModal = (authImageUrl, userId) => {
    return (
      <Modal
        title="Basic Modal"
        title="학생증 인증"
        visible={isAuthImageModalOpened}
        onCancel={() => {
          setIsAuthImageModalOpened(false);
        }}
        footer={null}
        destroyOnClose={true}
      >
        <div>
          <Row>
            <Col span={16} offset={4}>
              <img
                style={{ width: "100%", height: "auto" }}
                src={authImageUrl}
              ></img>
            </Col>
          </Row>
          <Row style={{ marginTop: "40px" }}>
            <Col span={8} offset={8}>
              <Button
                onClick={() => {
                  confirmAuthUser(userId);
                }}
              >
                학생증 인증 확인
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    );
  };

  const columnsUser = [
    {
      title: "고유 번호",
      dataIndex: "id",
      key: "id",
      render: text => <a>{text}</a>
    },
    {
      title: "이름",
      dataIndex: "name",
      key: "name",
      render: text => <a>{text}</a>
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      render: text => <a>{text}</a>
    },
    {
      title: "연락처",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: text => <a>{text}</a>
    },
    {
      title: "닉네임",
      dataIndex: "nickname",
      key: "nickname",
      render: text => <a>{text}</a>
    },
    {
      title: "전공",
      dataIndex: "majorList",
      key: "majorList",
      render: text => <a>{text}</a>
    },
    {
      title: "학기",
      dataIndex: "semester",
      key: "semester",
      render: text => <a>{text}학기</a>
    },
    {
      title: "마케팅 정보 동의 여부",
      dataIndex: "checkList",
      key: "marketing",
      render: checkList =>  <a>{checkList[2] === "1" ? "O" : "X" }</a>
    },
    {
      title: "학생 인증 여부",
      dataIndex: "authComplete",
      key: "authComplete",
      render: (flag, record) =>
        flag ? (
          <a>인증 완료</a>
        ) : (
          <div>
            <Button
              onClick={() => getUserCampusAuthImage(record.id)}
              style={{ color: "black", fontWeight: 800 }}
            >
              인증 필요
            </Button>

            {userCampusAuthImage && userCampusAuthImage.authImageUrl
              ? authImageConfirmModal(
                  userCampusAuthImage.authImageUrl,
                  userCampusAuthImage.userId
                )
              : null}
          </div>
        )
    }
  ];

  const columnsTransaction = [
    {
      title: "판매상품 고유번호(ID)",
      dataIndex: "sellItemId",
      key: "sellItemId",
      render: text => <a>{text}</a>
    },
    {
      title: "판매자 고유번호(ID)",
      dataIndex: "sellerId",
      key: "sellerId",
      render: text => <a>{text}</a>
    },
    {
      title: "구매자 고유번호(ID)",
      dataIndex: "buyerId",
      key: "buyerId",
      render: text => <a>{text}</a>
    },
    {
      title: "거래 방식",
      dataIndex: "transactionType",
      key: "transactionType",
      render: type => (type === 0 ? <a>직거래</a> : <a>북을박스 거래</a>)
    },
    {
      title: "거래 시각 리스트",
      dataIndex: "transactionTimeList",
      key: "transactionTimeList",
      render: text => <a>{text}</a>
    },
    {
      title: "거래 생성 시각",
      dataIndex: "transCreatedTime",
      key: "transCreatedTime",
      render: text => <a>{text}</a>
    },
    {
      title: "STEP",
      dataIndex: "step",
      key: "step",
      render: text => <a>{text}</a>
    },
    {
      title: "북을박스 번호(ID)",
      dataIndex: "boxId",
      key: "boxId",
      render: text => <a>{text}</a>
    },
    {
      title: "북을박스 비밀번호",
      dataIndex: "boxPassword",
      key: "boxPassword",
      render: text => <a>{text}</a>
    }
  ];

  return (
    <section id="dashboard-container">
      {!isAuth && !sessionStorage.getItem("isAdmin") ? (
        <Row style={{ margin: "20% auto 20% auto" }}>
          <Col span={6} offset={8}>
            <Input
              style={{ width: "100%" }}
              type="password"
              placeholder="운영팀 비밀번호를 입력해주세요."
              onPressEnter={e => {
                if (e.target.value === "3428") {
                  setIsAuth(true);
                  sessionStorage.setItem("isAdmin", true);
                }
              }}
            />
          </Col>
          <Col span={2} offset={0}>
            <Button
              onClick={e => {
                if (e.target.value === "3428") {
                  setIsAuth(true);
                  sessionStorage.setItem("isAdmin", true);
                }
              }}
            >
              인증
            </Button>
          </Col>
        </Row>
      ) : null}
      {isAuth || sessionStorage.getItem("isAdmin") ? (
        <div>
          <Row
            style={{
              width: "100%",
              minHeight: "10%",
              background: "black",
              textAlign: "center",
              display: "table"
            }}
          >
            <Col style={{ height: "100%" }} span={4} offset={10}>
              <h5
                style={{
                  color: "white",
                  verticalAlign: "middle",
                  margin: "10% 0 10% 0"
                }}
              >
                운영팀 대시보드
              </h5>
            </Col>
          </Row>
          <Row
            style={{
              width: "100%",
              minHeight: "10%",
              background: "white",
              textAlign: "center",
              display: "table",
              borderBottom: "1px solid black"
            }}
          >
            <Col style={{ height: "100%" }} span={4} offset={10}>
              <h5
                style={{
                  color: "black",
                  verticalAlign: "middle",
                  margin: "10% 0 10% 0"
                }}
              >
                <a>회원 정보 관리</a>
              </h5>
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              {userList.length !== 0 ? (
                <Table columns={columnsUser} dataSource={userList}></Table>
              ) : null}
            </Col>
          </Row>
          {/*
          <Row>
            <Col span={22} offset={1}>
              <Table
                columns={columnsTransaction}
                dataSource={transData}
              ></Table>
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              <Table
                columns={columnsTransaction}
                dataSource={stepTWOList}
              ></Table>
            </Col>
          </Row>
          <Row>
            <Col span={22} offset={1}>
              <Table
                columns={columnsTransaction}
                dataSource={stepFOURList}
              ></Table>
            </Col>
          </Row>
          */}
        </div>
      ) : null}
    </section>
  );
}
