import React, { useState, useEffect } from "react";
// import styled from "styled-components";
import { Col, Row, Carousel, Icon } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Subject() {
  const [id, setId] = useState("5e26e2e83eb3ee91a8915ecf");
  const [item, setItem] = useState({});
  const detail_sub_url = `http://13.125.191.60:8080/sell/detail?id=${id}`;

  useEffect(() => {
    const getItemData = async () => {
      const result = await axios.get(detail_sub_url);
      setItem(result.data.data);
    };
    getItemData();
  }, []);

  return (
    <div>
      <header>
        <Row style={{ marginTop: "3vh", marginBottom: "5vh" }}>
          <Col xs={{ span: 8 }}>
            <Link to="/">
              <Icon
                type="arrow-left"
                style={{
                  marginLeft: "25%",
                  fontSize: "3vh"
                  // color: "#ffffff"
                }}
              />
            </Link>
          </Col>
          <Col xs={{ span: 1, offset: 11 }}>
            <Icon type="heart" />
          </Col>
          <Col xs={{ span: 1, offset: 2 }}>
            <Icon type="share-alt" />
          </Col>
        </Row>
      </header>
      <Row>
        <Col align="center">
          <Carousel>
            {/* {item.regiImageUrlList.map((imgUrl, i) => {
              return (
                <div>
                  <p>{imgUrl}</p>
                </div>
              );
            })} */}
            <div>
              <h1>one</h1>
            </div>
            <div>
              <h1>two</h1>
            </div>
          </Carousel>
        </Col>
      </Row>

      <Row>
        <Row>
          <Col>
            <h1>{item.title}</h1>
          </Col>
        </Row>
        <Row>
          <Row>
            <Col>
              <h2>{item.author}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>{item.publisher}</h3>
            </Col>
          </Row>
        </Row>
        <Row>
          <Row>
            <Col>
              <p>{item.price}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {/* <p>{item.regiPrice}</p> */}
              {/* <p>{item.regiImageUrlList}</p> */}
              {/* {console.log(Array.isArray(item.regiImageUrlList))} */}
              {console.log(item.regiImageUrlList)}
            </Col>
          </Row>
        </Row>
      </Row>
      <Row>
        <Col align="center">판매자 정보</Col>
      </Row>
      <Row>
        <Col align="center">거래 정보</Col>
      </Row>
      <Row>
        <Col align="center">코멘트</Col>
      </Row>
      {/* <Button>구매하기</Button> */}
    </div>
  );
}
