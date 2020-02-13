import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Icon, Divider } from 'antd';
import Search from '../Navbar/Search';
import { withRouter, Redirect, Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import CurrencyInput from 'react-currency-input';
import axios from 'axios';
import './Register.css';

export default function Register() {
    const [step, setStep] = useState(1);
    const [resdata, setResdata] = useState();
    const [isFocused, setIsFocused] = useState();
    const [isFocusedClass, setIsFocusedClass] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [dealType, setDealType] = useState(0);
    const [contactType, setContactType] = useState(0);

    const [userImages, setUserImages] = useState([]);
    const [userImagesDiv, setUserImagesDiv] = useState();
    const [imageUrls, setImageUrls] = useState([]);
    const [imageDiv, setImageDiv] = useState();

    const initialQualityOut = [false, false, false, false, false];
    const initialQualityIn = [false, false, false, false, false, false];

    const [qualityOut, setQualityOut] = useState(initialQualityOut);
    const [qualityIn, setQualityIn] = useState(initialQualityIn);

    const [regiPrice, setRegiPrice] = useState(0);
    const [isFinalSubmit, setIsFinalSubmit] = useState(false);

    const [sellItem, setSellItem] = useState();
    const [imageFileList, setImageFileList] = useState();
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
        console.log("changed");

        setImageDiv(imageUrls.map((i, index) => (
            <Col xs={{ span: 4, offset: 1 }}>
                <div
                    style={{
                        border: "#44a0ac 1px solid",
                        height: "65px", width: "65px", 
                        position: "relative", borderRadius: "10px",
                        top: "50%", left: "50%"
                    }}>
                    <Icon type="close-circle"
                        style={{ color: "rgba(51, 158, 172, 0.9)", margin: "auto", position : "relative",
                    left : 45, top : -5, zIndex : 100 }}
                        onClick={() => { 
                            let currImageUrls = imageUrls;
                            currImageUrls.splice(index, 1);
                            console.log(index);
                            console.log(currImageUrls);
                            setImageUrls(currImageUrls);
                    }}>
                    </Icon> 
                    <img style={{
                        width: "100%", height: "100%",
                        position: "absolute",
                        top: "0", left: "0",
                        objectFit: "contain"
                    }} src={i}
                    />
                </div>
            </Col>
        )));

    }, [imageUrls]);

    React.useEffect(() => {

        if (didMount) {
            saveSellItem(sellItem, imageFileList)
        }

    }, [imageFileList])

    React.useEffect(() => {
        setDidMount(true);
    }, [sellItemReq])


    const onSubmit = (data) => {

        if (isFinalSubmit) {

            data.dealType = dealType;
            data.contactType = contactType;
            data.qualityIn = qualityIn
            data.qualityOut = qualityOut
            data.regiPrice = regiPrice;
            data.regiImages = userImages;

            setSellItem({
                itemId: selectedItem.itemId,
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                pubdate: data.pubdate.substring(0, 4) + data.pubdate.substring(6, 8),
                price: (data.price.replace(",", "")).replace(" 원", ""),
                regiPrice: data.regiPrice,
                regiImageUrlList: [],
                dealType: data.dealType,
                qualityIn: data.qualityIn,
                qualityOut: data.qualityOut,
                sellerId: 0,
                comment: data.comment,
                imageUrl: selectedItem.imageUrl,
                regiTime: new Date()
            })

            setImageFileList(data.regiImages);
        }
    };

    const saveSellItem = (sellItem, imageFileList) => {

        let form = new FormData();
        form.append('sellItemString', JSON.stringify(sellItem));

        imageFileList.forEach(i => {
            form.append("imageFileList", i);
        });

        axios.post('http://13.124.113.72:8080/sell', form, {

            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token') != null ?
                    localStorage.getItem('token') : ""
            }
        })
            .then((response) => {
                console.log(response);
                setStep(3);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <section id="register-container">
            {
                    step == 1 ?
                        <div>
                            <div id="navbar">
                                <header>
                                    <Row id="navbar-search-row-after-focused">
                                        <Col xs={{ span: 4 }}>
                                            <Link to="/">
                                                <img style={{
                                                    width: "22px",
                                                    height: "auto",
                                                    marginLeft: "40%",
                                                    filter: "brightness(0) invert(1)"
                                                }}
                                                    src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
                                            </Link>

                                        </Col>
                                        <Col xs={{ span: 18, offset: 0 }} >
                                            <Search focusOnSearch={focusOnSearch}
                                                updateInputValue={updateInputValue}
                                                placeHolder={""}
                                                seachType="sell"></Search>
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
                                                        width: "100px", height: "150px", backgroundSize: "contain",
                                                        borderRadius: "7px"
                                                    }}
                                                        src={resdata != null && value.imageUrl != null ? value.imageUrl.replace("type=m1", "") : ""}></img>
                                                </Col>
                                                <Col xs={{ span: 14, offset: 3 }}>
                                                    <Row>
                                                        <Col xs={{ span: 24 }}>
                                                            <span style={{ color: "#656565", fontSize: "17px" }}>{resdata != null ? value.title.replace(/(<([^>]+)>)/ig, "") : null}</span>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{ marginTop: "10px", marginBottom: "-9px" }} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "12px", fontWeight : "400" }}>
                                                                저자 : {resdata != null ? value.author.replace(/(<([^>]+)>)/ig, "") : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col style={{}} xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "12px", fontWeight : "400" }}>
                                                                출판사 : {resdata != null ? value.publisher.replace(/(<([^>]+)>)/ig, "") : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "-10px" }}>
                                                        <Col xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "12px", fontWeight : "400" }}>
                                                                {resdata != null ? value.pubdate.toString().substring(0, 4) + "년 " +
                                                                    value.pubdate.toString().substring(4, 6) + "월" : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "-10px" }}>
                                                        <Col xs={{ span: 24 }}>
                                                            <small style={{ color: "#656565", fontSize: "12px", fontWeight : "400" }}>
                                                                {resdata != null ? "ISBN : " + value.itemId : null}
                                                            </small>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px" }}>
                                                        <Col xs={{ span: 12 }}>
                                                            <small style={{ color: "#656565", fontSize: "12px"}}>
                                                                {resdata != null ? "정가 : " : null}
                                                                {resdata != null ?
                                                                    <NumberFormat value={value.price} displayType={'text'} thousandSeparator={true} />
                                                                    : null}
                                                                {resdata != null ? "원" : null}
                                                            </small>
                                                        </Col>
                                                        <Col xs={{ span: 12 }}>
                                                            <button style={{
                                                                borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                                color: "white", border: "none", fontSize: "12px", height: "25px", width: "100%",
                                                                padding: "auto"
                                                            }}
                                                                onClick={() => {
                                                                    setSelectedItem(value);
                                                                    setStep(2);
                                                                }}
                                                            ><span>판매 등록하기</span></button>
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
                                <Row style={{ marginTop: "30px", marginBottom: "30px"}}>
                                    <Col xs={{ span: 2, offset: 1 }}>
                                        <Link to="/">
                                            <img style={{
                                                width: "32px",
                                                height: "auto",
                                                marginLeft: "40%",
                                            }}
                                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/left_arrow.png" />
                                        </Link>
                                    </Col>
                                    <Col style={{ textAlign: "center", padding: "auto" }} xs={{ offset: 5, span: 8 }}>
                                        <h5 style={{ color: "#707070" }}>판매하기</h5>
                                    </Col>
                                    <Col xs={{ span: 8 }}>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ span: 6, offset: 9 }}>
                                        <img
                                            style={{
                                                width: "100px", height: "150px", backgroundSize: "contain",
                                                borderRadius: "7px"
                                            }}
                                            src={selectedItem.imageUrl.replace("type=m1", "")}></img>
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
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >

                                            <input
                                            readOnly
                                                style={{ width: "100%", height : "40px", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="title" ref={register}
                                                value={selectedItem.title.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row >
                                    <Row>
                                        <Col xs={{ span: 4, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>저자</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <input
                                            readOnly
                                                style={{ width: "100%", height : "40px", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="author" ref={register}
                                                value={selectedItem.author.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 4, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>출판사</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <input
                                            readOnly
                                                style={{ width: "100%", height : "40px", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                name="publisher" ref={register}
                                                value={selectedItem.publisher.replace(/(<([^>]+)>)/ig, "")} />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 9, offset: 2 }}>
                                            <Row>
                                                <Col xs={{ span: 24 }}>
                                                    <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>출판일</span>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs={{ span: 24 }} >
                                                    <input
                                                    readOnly
                                                        style={{ width: "100%", height : "40px", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
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
                                                    readOnly
                                                        style={{ width: "100%", height : "40px", border: "none", borderBottom: "rgba(51, 158, 172, 0.9) solid 2px" }}
                                                        name="price" ref={register}
                                                        value={selectedItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"} />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>거래방식</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 10, offset: 2 }}>
                                            <button
                                                class={dealType == 0 ? "register-button-active" : "register-button"}
                                                style={{
                                                    width: "100%",
                                                    color: "#666666",
                                                    border: "#666666 0.3px solid",
                                                    borderRight : "none",
                                                    borderTopLeftRadius: "8px",
                                                    borderBottomLeftRadius: "8px",
                                                    borderTopRightRadius : "0px",
                                                    borderBottomRightRadius : "0px",
                                                    fontSize: "12px",
                                                    height: "36px"
                                                }}
                                                onClick={() => setDealType(0)}>직거래</button>
                                        </Col>
                                        <Col xs={{ span: 10, offset: 0 }}>
                                            <button
                                                class={dealType == 1 ? "register-button-active" : "register-button"}
                                                style={{
                                                    width: "100%",
                                                    color: "#666666",
                                                    border: "#666666 0.3px solid",
                                                    borderLeft : "none",
                                                    borderTopRightRadius: "8px",
                                                    borderBottomRightRadius: "8px",
                                                    borderTopLeftRadius : "0px",
                                                    borderBottomLeftRadius : "0px",
                                                    fontSize: "12px",
                                                    height: "36px"
                                                }}
                                                onClick={() => { setDealType(1) }}>북을박스</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 10, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>사진(최대 3장)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 2, offset: 2 }}>
                                            <input id="selectedFile" type="file" accept="image/*;capture=camera"
                                                onChange={(e) => {

                                                    if(userImages.length < 3){

                                                        const file = e.target.files[0];
                                                        setUserImages(userImages => [...userImages, file]);
    
                                                        let reader = new FileReader();
    
                                                        reader.onloadend = () => {
                                                            setImageUrls(imageUrls => [...imageUrls, reader.result])
                                                        }
    
                                                        reader.readAsDataURL(file)

                                                    }
                                                }}
                                                style={{ display: "none" }}
                                            />
                                            <div onClick={() => { 
                                                if(userImages.length < 3)
                                                document.getElementById('selectedFile').click() 
                                            }}
                                                style={{
                                                    border: "#44a0ac 1px solid",
                                                    height: "65px", width: "65px", 
                                                    position: "relative", borderRadius: "10px"
                                                }}>
                                                <Icon type="camera"
                                                    style={{
                                                        fontSize: "5vh", position: "absolute",
                                                        textAlign: "center", width: "100%", transform: "translate(-50%, -50%)",
                                                        top: "50%", left: "50%", color: "#44a0ac"
                                                    }} />
                                            </div>
                                        </Col>
                                        {imageDiv != undefined ? imageDiv : null}
                                    </Row>
                                    <Row style={{marginBottom: "10px" }}>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>책상태(외관)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 5, offset: 2 }} >
                                            <button
                                                class={qualityOut[0] == true ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    let old = [...qualityOut];
                                                    if (old[0] == false) old[0] = true
                                                    else old[0] = false
                                                    setQualityOut(old)
                                                }}
                                                style={{fontSize : "12px"}}
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
                                                }}
                                                style={{fontSize : "12px"}}
                                                >이름기입</button>
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
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>책상태(내부)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
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
                                    <Row style={{ marginBottom: "10px" }}>
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
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>코멘트</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }} >
                                            <textarea
                                                style={{ width: "100%", height: "100px", border: "#656565 solid 0.3px", borderRadius: "5px" }}
                                                name="comment" ref={register}
                                                placeholder="예시) 2019년 5월에 구입한 책입니다. OOO교수님 수업 필기가 되어있고, 부록 CD도 함께 있습니다. 
                                                주의 : 해당 입력칸에 연락처 등의 개인정보를 기입하지 마세요." />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "100px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <button style={{
                                                padding: "0",
                                                width: "100%",
                                                background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                            }}
                                                type="submit"
                                                onClick={() => setIsFinalSubmit(true)}><span>판매 등록하기</span></button>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                            :
                            step == 3 ?
                                <div>
                                    <Row style={{ marginTop: "30px" }}>
                                        <Col xs={{ span: 8 }}>
                                        </Col>
                                        <Col style={{ textAlign: "center", padding: "auto" }} xs={{ span: 8 }}>
                                            <h5 style={{ color: "#707070" }}>구매하기</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ offset: 3, span: 18 }} style={{ textAlign: "center", marginTop: "50px" }}>
                                            <img style={{ width: "70%", height: "auto" }}
                                                src="https://project-youngwoo.s3.ap-northeast-2.amazonaws.com/Group+289%403x.png"></img>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{ offset: 2, span: 20 }} style={{ textAlign: "center", marginTop: "50px" }}>
                                            <h5 style={{
                                                textAlign: "center", color: "#707070", fontWeight: "400",
                                                fontSize: "17.5px", marginBottom: "30px"
                                            }}>
                                                {sellItem.title} 등록이 정상적으로 완료 되었습니다.
                                            </h5>
                                            <h5 style={{ textAlign: "center", color: "#707070", fontWeight: "400", fontSize: "17.5px", }}>
                                                이 책을 구매하고자 하는 분이 나타나면 북을 앱을 통해 알람이 올거에요.
                                            </h5>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop : "40px", marginBottom: "100px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <Link to="/">
                                                <button style={{
                                                    padding: "0",
                                                    width: "100%",
                                                    background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                    border: "none", border: "none", borderRadius: "14px", 
                                                    fontSize: "18px", height: "32px"
                                                }}
                                                >홈으로</button>
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                                : null
            }
        </section>
    )
}
