import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, notification, Layout, Icon, List, Card, Divider, Rate, Radio } from 'antd';
import Search from '../Navbar/Search';
import { withRouter,  Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import CurrencyInput from 'react-currency-input';
import Camera from 'react-html5-camera-photo';
import axios from 'axios';
import './Register.css';


export default function Register() {
    const [step, setStep] = useState(0);
    const [resdata, setResdata] = useState();
    const [isFocused, setIsFocused] = useState();
    const [isFocusedClass, setIsFocusedClass] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [dealType, setDealType] = useState(0);
    const [contactType, setContactType] = useState(0);

    const [userImages, setUserImages] = useState([]);
    const [userImagesDiv, setUserImagesDiv] = useState();
    const [imageUrls, setImageUrls] = useState([])

    const initialQualityOut = [false, false, false, false, false];
    const initialQualityIn = [false, false, false, false, false, false];

    const [qualityOut, setQualityOut] = useState(initialQualityOut);
    const [qualityIn, setQualityIn] = useState(initialQualityIn);

    const [regiPrice, setRegiPrice] = useState(0);
    const [isFinalSubmit, setIsFinalSubmit] = useState(false);

    const [formData, setFormData] = useState();

    const [sellItem, setSellItem] = useState();
    const [imageList, setImageList] = useState();
    const [imageFileList, setImageFileList] = useState();
    const [regiImageList, setRegiImageList] = useState();
    const [sellItemReq, setSellItemReq] = useState();

    const [didMount, setDidMount] = useState(false);
    
    const { register, handleSubmit } = useForm();

    const focusOnSearch = (isFocused) => {
        setIsFocused(isFocused);
        setIsFocusedClass("isFocused ");
    }

    const updateInputValue = (resdata) => {
        setResdata(resdata);
    }

    React.useEffect(() => {
        if(didMount){
            setUserImagesDiv(addImage());
        }
    }, [imageUrls])
    React.useEffect(() => {
        if(didMount){
            setImageFileList(imageList);
        }
    }, [imageList])
    React.useEffect(() => {
        if(didMount){
            setRegiImageList([]);
        }
    }, [imageFileList])
    React.useEffect(() => {
        if(didMount){

            const sellItemReqForm = new FormData();
            console.log(sellItem)
            sellItemReqForm.append("sellItemString", JSON.stringify(sellItem));
            console.log(imageFileList);
            //sellItemReqForm.append("imageFileList", JSON.stringify(imageFileList));
            console.log(regiImageList);
            sellItemReqForm.append("regiImageList", regiImageList);

            imageFileList.forEach(i => {
                sellItemReqForm.append("imageFileList", i);
            });
       
            setSellItemReq(sellItemReqForm);
        }

    }, [regiImageList])
    React.useEffect(() => {
        setDidMount(true);
        if(didMount){
            saveSellItem();
        }
    }, [sellItemReq])

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
    const translateBooleanArrayToString = (booleanArray) => {
        let s = ""
        booleanArray.forEach(b => {
            if(b == false){
                s = s.concat("0")
            }
            else{
                s = s.concat("1")
            }
        });
        return s;
    }

    const onSubmit = (data) => {
        console.log(isFinalSubmit);
        if (isFinalSubmit) {
            data.dealType = dealType;
            data.contactType = contactType;
            data.qualityIn = translateBooleanArrayToString(qualityIn);
            data.qualityOut = translateBooleanArrayToString(qualityOut);
            data.regiPrice = regiPrice;
            data.regiImages = userImages;

            setSellItem({
                itemId : selectedItem.isbn.substring(11),
                title : data.title,
                author : data.author,
                publisher : data.publisher,
                pubdate : data.pubdate.substring(0,4) + data.pubdate.substring(6,8),
                price : (data.price.replace(",", "")).replace(" 원", ""),
                regiPrice : data.regiPrice,
                dealType : data.dealType,
                contactType : data.contactType,
                qualityIn : data.qualityIn,
                qualityOut : data.qualityOut,
                sellerId : 0,
                comment : data.comment,
                imageUrl : selectedItem.image,
                regiTime : new Date()
              })
              setImageList(data.regiImages);
        }
    };
  
    const saveSellItem = () => {
        axios.post('http://localhost:8080/sell', sellItemReq, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }


    return (
        <section id="register-container">
            {
                step == 0 ?
                    <div>
                        <Row style={{ marginTop: "3vh" }}>
                            <Col xs={{ span: 8 }}>
                            <Link to="/">
                                <Icon style={{
                                    marginLeft: "25%",
                                    fontSize: "3vh", color: "#707070"
                                }} type="arrow-left"
                                     />
                            </Link>
                            </Col>
                            <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                <h5 style={{ color: "#707070" }}>판매하기</h5>
                            </Col>
                            <Col xs={{ span: 8 }}>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 24 }}>
                                <div style={{
                                    width: "35vh", height: "35vh",
                                    margin: "auto", marginTop: "4vh", marginBottom: "2vh", borderRadius: "50%", background: "rgba(0, 161, 153, 0.9)"
                                }}>
                                    <Row>
                                        <Col style={{ marginTop: "10vh" }} xs={{ span: 6, offset: 9 }}>
                                            <Icon style={{
                                                fontSize: "9vh", color: "white"
                                            }} type="camera" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "auto", marginTop: "1.0vh" }} xs={{ span: 24 }}>
                                            <h6 style={{ fontSize: "2.0vh", color: "white", textAlign: "center" }}>바코드 스캔</h6>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ offset: 2, span: 20 }}>
                                <Divider />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={{ span: 24 }}>
                                <div onClick={() => { setStep(1) }} style={{
                                    width: "35vh", height: "35vh",
                                    margin: "auto", marginTop: "4vh", marginBottom: "2vh", borderRadius: "50%", background: "rgba(0, 161, 153, 0.9)"
                                }}>
                                    <Row>
                                        <Col style={{ marginTop: "10vh" }} xs={{ span: 6, offset: 9 }}>
                                            <Icon style={{
                                                fontSize: "8vh", color: "white"
                                            }} type="search" />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{ padding: "auto", marginTop: "1.0vh" }} xs={{ span: 24 }}>
                                            <h6 style={{ fontSize: "2.0vh", color: "white", textAlign: "center" }}>검색 또는 직접 입력</h6>
                                        </Col>
                                    </Row>
                                </div>
                            </Col>
                        </Row>
                    </div> :
                    step == 1 ?
                        <div>
                            <div id="navbar">
                                <header>
                                    <Row id="navbar-search-row-after-focused">
                                        <Col xs={{ span: 4 }}><Icon style={{
                                            marginLeft: "40%",
                                            fontSize: "3vh", color: "white"
                                        }} type="arrow-left"
                                            onClick={() => {
                                                { setStep(0) }
                                            }} /></Col>
                                        <Col xs={{ span: 18, offset: 0 }} >
                                            <Search focusOnSearch={focusOnSearch}
                                                updateInputValue={updateInputValue}
                                                placeHolder={""}></Search>
                                        </Col>
                                    </Row>
                                </header>
                            </div>
                            {resdata != null && resdata.length != 0 ?
                                resdata.map((value, index) => {
                                    return (
                                        <div>
                                            <Row>
                                                <Col offset={1} span={22}><Divider /></Col>
                                            </Row>
                                            <Row key={index} className="search-result-row" style={{ paddingTop: "1vh" }}>
                                                <Col xs={{ span: 5, offset: 1 }}>
                                                    <img style={{
                                                        width: "14vh", height: "21vh", backgroundSize: "contain",
                                                        borderRadius: "7px"
                                                    }}
                                                        src={resdata != null ? value.image.replace("type=m1", "") : null}></img>
                                                </Col>
                                                <Col xs={{ span: 14, offset: 2 }}>
                                                    <Row>
                                                        <Col xs={{ span: 24 }}>
                                                            <span style={{ color: "#656565", fontSize: "2.2vh" }}>{resdata != null ? value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ marginTop: "2.5vh", marginBottom: "-1.5vh" }} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                {resdata != null ? value.author.replace(/(<([^>]+)>)/ig, "") : null}
                                                                {resdata != null ? " / " : null}
                                                                {resdata != null ? value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{}} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                {resdata != null ? value.pubdate.toString().substring(0, 4) + "년 " +
                                                                    value.pubdate.toString().substring(4, 6) + "월" : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{}} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                {resdata != null ? "ISBN : " + value.isbn.split(" ")[1] : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "3.5vh" }}>
                                                        <Col style={{ marginBottom: "-1.0vh" }} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "1.75vh" }}>
                                                                {resdata != null ? "정가 : " : null}
                                                                {resdata != null ?
                                                                    <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                                                                    : null}
                                                                {resdata != null ? "원" : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={{ span: 12 }}>
                                                            <small style={{ color: "#656565", fontSize: "2.3vh", fontWeight: "700" }}>
                                                                {resdata != null && value.lowestPrice != 0 ? "북을 판매가 : " : null}
                                                                {resdata != null ?
                                                                    <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>
                                                                        <NumberFormat value={value.lowestPrice} displayType={'text'} thousandSeparator={true} />
                                                                    </small>
                                                                    : null}
                                                                {resdata != null && value.lowestPrice != 0 ?
                                                                    <small style={{ color: "rgba(51, 158, 172, 0.9)", fontSize: "2.3vh" }}>원~</small> :
                                                                    null}
                                                            </small>
                                                        </Col>
                                                        <Col style={{ marginTop: "-2.95vh" }} xs={{ span: 12 }}>
                                                            <button style={{
                                                                borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                                color: "white", border: "none", fontSize: "1.6vh", height: "3.5vh", width: "110%"
                                                            }}
                                                                onClick={() => {
                                                                    setSelectedItem(value);
                                                                    setStep(2);
                                                                }}
                                                            >판매 등록하기</button>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </div>
                                    );
                                })
                                :
                                <div style={{ height: "100%" }}>
                                    <div style={{ marginTop: "50%" }}>
                                        <h5 style={{
                                            textAlign: "center",
                                            color: "gray", fontWeight: "600"
                                        }}>판매 등록할 도서를<br /> 검색해주세요!</h5>
                                    </div>
                                </div>
                            }

                        </div>

                        :
                        step == 2 ?
                            <div>
                                <Row style={{ marginTop: "3vh" }}>
                                    <Col xs={{ span: 8 }}>
                                        <Icon style={{
                                            marginLeft: "25%",
                                            fontSize: "3vh", color: "#707070"
                                        }} type="arrow-left"
                                            onClick={() => {
                                                if(step == 2) setStep(1);
                                            }} />
                                    </Col>
                                    <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                        <h5 style={{ color: "#707070" }}>판매하기</h5>
                                    </Col>
                                    <Col xs={{ span: 8 }}>
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: "2vh" }}>
                                    <Col xs={{ span: 6, offset: 9 }}>
                                        <img
                                            style={{
                                                width: "14vh", height: "21vh", backgroundSize: "contain",
                                                borderRadius: "7px"
                                            }}
                                            src={selectedItem.image.replace("type=m1", "")}></img>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col offset={2} span={20}>
                                        <Divider />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 4, offset: 2 }}>
                                        <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>도서명</span>
                                    </Col>
                                </Row>
                                <form onSubmit={handleSubmit(onSubmit)} enctype="multipart/form-data">
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >

                                            <input
                                                style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="title" ref={register}
                                                value={selectedItem.title.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row >
                                    <Row>
                                        <Col xs={{ span: 4, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>저자</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <input
                                                style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="author" ref={register}
                                                value={selectedItem.author.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 4, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>출판사</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <input
                                                style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="publisher" ref={register}
                                                value={selectedItem.publisher.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 9, offset: 2 }}>
                                            <Row>
                                                <Col xs={{ span: 24 }}>
                                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>출판일</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={{ span: 24 }} >
                                                    <input
                                                        style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                        name="pubdate" ref={register}
                                                        value={selectedItem.pubdate.toString().substring(0, 4) + "년 " +
                                                            selectedItem.pubdate.toString().substring(4, 6) + "월"} />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={{ span: 9, offset: 2 }}>
                                            <Row>
                                                <Col xs={{ span: 24 }}>
                                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>정가</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={{ span: 24 }} >
                                                    <input
                                                        style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                        name="price" ref={register}
                                                        value={selectedItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>거래방식</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 10, offset: 2 }}>
                                            <button
                                                class={dealType == 0 ? "register-button-active" : "register-button"}
                                                style={{ height: "4vh" }}
                                                onClick={() => setDealType(0)}>직거래</button>
                                        </Col>
                                        <Col xs={{ span: 10, offset: 0 }}>
                                            <button
                                                class={dealType == 1 ? "register-button-active" : "register-button"}
                                                style={{ height: "4vh" }}
                                                onClick={() => { setDealType(1) }}>북을박스</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>연락수단</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 6, offset: 2 }}>
                                            <button
                                                class={contactType == 0 ? "register-button-active" : "register-button"}
                                                style={{ height: "4vh" }}
                                                onClick={() => setContactType(0)}>카카오톡</button>
                                        </Col>
                                        <Col xs={{ span: 6, offset: 0 }}>
                                            <button
                                                class={contactType == 1 ? "register-button-active" : "register-button"}
                                                style={{ height: "4vh" }}
                                                onClick={() => { setContactType(1) }}>휴대폰</button>
                                        </Col>
                                        <Col xs={{ span: 6, offset: 0 }}>
                                            <button
                                                class={contactType == 2 ? "register-button-active" : "register-button"}
                                                style={{ height: "4vh" }}
                                                onClick={() => { setContactType(2) }}>카톡알람</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>사진</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }}>
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
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>책상태(외관)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }} >
                                            <button
                                                class={qualityOut[0] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[0] == false) old[0] = true
                                                    else old[0] = false
                                                    setQualityOut(old)
                                                }}
                                            >깨끗</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityOut[1] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[1] == false) old[1] = true
                                                    else old[1] = false
                                                    setQualityOut(old)
                                                }}>이름기입</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityOut[2] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[2] == false) old[2] = true
                                                    else old[2] = false
                                                    setQualityOut(old)
                                                }}>긁힘/접힘</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <button
                                                class={qualityOut[3] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[3] == false) old[3] = true
                                                    else old[3] = false
                                                    setQualityOut(old)
                                                }}>찢어짐</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityOut[4] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[4] == false) old[4] = true
                                                    else old[4] = false
                                                    setQualityOut(old)
                                                }}>물에젖음</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>책상태(내부)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 5, offset: 2 }} >
                                            <button
                                                class={qualityIn[0] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[0] == false) old[0] = true
                                                    else old[0] = false
                                                    setQualityIn(old)
                                                }}
                                            >깨끗</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityIn[1] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[1] == false) old[1] = true
                                                    else old[1] = false
                                                    setQualityIn(old)
                                                }}>밑줄</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityIn[2] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[2] == false) old[2] = true
                                                    else old[2] = false
                                                    setQualityIn(old)
                                                }}>연필</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <button
                                                class={qualityIn[3] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[3] == false) old[3] = true
                                                    else old[3] = false
                                                    setQualityIn(old)
                                                }}>볼펜/형광펜</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityIn[4] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[4] == false) old[4] = true
                                                    else old[4] = false
                                                    setQualityIn(old)
                                                }}>문제풀음</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityIn[5] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityIn];
                                                    if (old[5] == false) old[5] = true
                                                    else old[5] = false
                                                    setQualityIn(old)
                                                }}>물에젖음</button>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>희망가격</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 10, offset: 2 }} >
                                            <CurrencyInput
                                                precision="0"
                                                suffix=" 원"
                                                value={regiPrice}
                                                onChangeEvent={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(",", "");
                                                    value = value.replace(" 원", "");
                                                    setRegiPrice(value)
                                                }
                                                }
                                                style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>태그</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <input
                                                style={{ width: "100%", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="tag" ref={register} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>코멘트</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "1.5vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <textarea
                                                style={{ width: "100%", border: "#656565 solid 0.3px", borderRadius: "5px" }}
                                                name="comment" ref={register} />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10vh" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <input style={{
                                                width: "100%",
                                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                border: "none", borderRadius: "2.25vh", fontSize: "2.5vh", height: "5vh"
                                            }}
                                                type="submit" value="판매 등록하기"
                                                onClick={() => setIsFinalSubmit(true)} />
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                            :
                            null
            }
        </section>
    )
}
