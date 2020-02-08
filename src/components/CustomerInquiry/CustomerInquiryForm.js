import React, {useState} from "react";
import { useForm, ErrorMessage } from 'react-hook-form';
import { Row, Col, Menu, Dropdown, Button, Icon, Input} from "antd";
import axios from 'axios';

export default function CustomerInquiryForm(){
    const { register, handleSubmit, errors, getValues, setValue } = useForm();
    
    const menu = (
        <Menu onClick={(key) => {setCustomerInquiryType(parseInt(key.key))}}>
          <Menu.Item key="0">직거래</Menu.Item>
          <Menu.Item key="1">북을박스</Menu.Item>
        </Menu>
      );
    
    const { TextArea } = Input;
    const [userImages, setUserImages] = useState([]);
    const [userImagesDiv, setUserImagesDiv] = useState();
    const [imageUrls, setImageUrls] = useState([])
    const [customerInquiry, setCustomerInquiry] = useState();
    const [customerInquiryType, setCustomerInquiryType] = useState(0);

    React.useEffect(() => {
        setUserImagesDiv(addImage());
    }, [imageUrls])

    React.useEffect(() => {
        saveCustomerInquiry(customerInquiry);
        console.log("Done");
    }, [customerInquiry])

    const addImage = () => {
        const imageList = imageUrls.map((i) => (
            <Col xs={{ span: 5, offset: 1 }}>
                <div
                    style={{
                        border: "#44a0ac 1px solid", height: "10vh",
                        width: "10vh", position: "relative", borderRadius: "1.5vh"
                    }}>
                    <img style={{
                        width: "100%", height: "100%",
                        position: "absolute", borderRadius: "1.5vh",
                        transform: "translate(-50%, -50%)",
                        top: "50%", left: "50%"
                    }} src={i}
                    />
                </div>
            </Col>
        ));
        return imageList;
    }
    const onSubmit = (data) => {

        setCustomerInquiry({ customerInquiry : {
            email: data.email,
            type: customerInquiryType,
            msg: data.msg
        }, token : ""})
        console.log("OnSubmit");
    };

    const saveCustomerInquiry = (customerInquiry) => {

        axios.post('http://localhost:8080/customerInquiry', customerInquiry)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
            console.log(customerInquiry);
    }

    return (
        <section id = "customer-inquiry-form-container">
            <form name = "firstForm" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Row style={{ marginBottom: "1vh" }}>
                        <Col offset={0} span={4}>
                            <small>이메일</small>
                        </Col>
                        <Col offset={0} span={16}>
                            <input
                                style={{
                                    width: "100%", border: "none",
                                    borderBottom: "#44a0ac solid 1.0px",
                                    backgroundColor: "transparent"
                                }}
                                name = "email" palceholder="이메일"
                                ref={register({
                                    required: "이메일을 입력해주세요.",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "이메일의 형태로 입력해주세요."
                                    }
                                })} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "1vh" }}>
                        <Col offset={0} span={4}>
                            <small>거래방식</small>
                        </Col>
                        <Col offset={0} span={16}>
                        <Dropdown overlay={menu} trigger={["click"]} >
                            <Button style={{
                                border: "#44a0ac 1px solid"
                                }}>거래방식을 선택하세요<Icon type="down" /> </Button>
                        </Dropdown>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "1vh" }}>
                        <Col offset={0} span={4}>
                            <small>문의내용</small>
                        </Col>
                        <Col offset={0} span={16}>
                            <textarea name="msg" rows={4} style={{
                                    width: "100%", border: "#44a0ac solid 1.0px",
                                    backgroundColor: "transparent"
                                }} ref={register}>
                            </textarea>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: "1vh" }}>
                        <Col offset={0} span={4}>
                            <small>사진첨부</small>
                        </Col>
                        <Col xs={{ span: 4, offset: 0 }}>
                            <input id="selectedFile" type="file" accept="image/*;capture=camera"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setUserImages(userImages => [...userImages, file]);

                                    let reader = new FileReader();

                                    reader.onloadend = () => {
                                        setImageUrls(imageUrls => [...imageUrls, reader.result])
                                    }

                                    reader.readAsDataURL(file)
                                }}
                                style={{ display: "none" }}
                            />
                            <div onClick={() => { document.getElementById('selectedFile').click() }}
                                style={{
                                    border: "#44a0ac 1px solid", height: "10vh",
                                    width: "10vh", position: "relative", borderRadius: "1.5vh"
                                }}>
                                <Icon type="camera"
                                    style={{
                                        fontSize: "5vh", position: "absolute",
                                        textAlign: "center", width: "100%", transform: "translate(-50%, -50%)",
                                        top: "50%", left: "50%", color: "#44a0ac"
                                    }} />
                            </div>
                        </Col>
                        {userImagesDiv}
                    </Row>
                    <Row>
                        <Col offset={1} span={22}>
                            <button block style={{
                                border: "#44a0ac 1px solid"
                                }} type="submit">
                                제출
                            </button>
                        </Col>
                    </Row>
                </div>
            </form>
        </section>
    )
}