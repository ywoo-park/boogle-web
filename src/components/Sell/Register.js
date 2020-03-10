import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Row, Col, Icon, Divider, Modal } from 'antd';
import Search from '../Navbar/Search';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import CurrencyInput from 'react-currency-input';
import { BeatLoader } from "react-spinners";

import host from '../../server-settings/ServerApiHost';

import axios from 'axios';
import './Register.css';
import Footer from "../Footer/Footer";

export default function Register() {
    const [step, setStep] = useState(1);
    const [resdata, setResdata] = useState();
    const [isFocused, setIsFocused] = useState();
    const [isFocusedClass, setIsFocusedClass] = useState();
    const [selectedItem, setSelectedItem] = useState();
    const [dealType, setDealType] = useState(1);
    const [contactType, setContactType] = useState(0);

    const [userImages, setUserImages] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);
    const [imageDiv, setImageDiv] = useState();

    const [qualityGeneral, setQualityGeneral] = useState("CLEAN");
    const [qualityExtra, setQualityExtra] = useState([false, false, false, false, false, false, false ,false]);

    const [regiPrice, setRegiPrice] = useState(0);
    const [isFinalSubmit, setIsFinalSubmit] = useState(false);

    const [sellItem, setSellItem] = useState();
    const [imageFileList, setImageFileList] = useState();
    const [sellItemReq, setSellItemReq] = useState();

    const [didMount, setDidMount] = useState(false);

    const [isQualityOutFilled, setIsQualityOutFilled] = useState(true);
    const [isRegiImagesFilled, setIsRegiImagesFilled] = useState(true);

    const [userBankAccountList, setUserBankAccountList] = useState([]);
    const [bankList, setBankList] = useState([]);

    const [selectedBankId, setSelectedBankId] = useState("")
    const [selectedUserBankAccount, setSelectedUserBankAccount] = useState(null);

    const [clickedAddUserAccount, setClickedAddUserAccount] = useState(false);

    const [modal, setModal] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [sellSortType, setSellSortType] = useState("accuracy");

    const { register, handleSubmit } = useForm();

    const focusOnSearch = (isFocused) => {
        setIsFocused(isFocused);
        setIsFocusedClass("isFocused ");
    }

    const updateInputValue = (resdata) => {
        setResdata(resdata);
    }


    const showModal = e => {
        setModal(true);
      }
    
      const closeModal = e => {
        setModal(false);
      }

    React.useEffect(() => {
        getUserBankAccount();
        getBankInfo();
    }, [])


    React.useEffect(() => {
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
            data.qualityGeneral = qualityGeneral;
            data.qualityExtra = qualityExtra;
            data.regiPrice = regiPrice;
            data.regiImages = userImages;

            setSellItem({
                itemId: selectedItem.itemId,
                title: data.title,
                author: data.author,
                publisher: data.publisher,
                pubdate: data.pubdate.substring(0, 4) + data.pubdate.substring(6, 8),
                price: (data.price.replace(",", "")).replace(" 원", ""),
                originalPrice : data.regiPrice,
                regiImageUrlList: [],
                dealType: data.dealType,
                qualityGeneral: data.qualityGeneral,
                qualityExtraList: data.qualityExtra,
                sellerId: 0,
                comment: data.comment,
                imageUrl: selectedItem.imageUrl,
                regiTime : new Date(),
                sellerBankAccountId : selectedUserBankAccount._id
            })

            setImageFileList(data.regiImages);

        }
    };

    const saveSellItem = (sellItem, imageFileList) => {

        setStep(3);

        setTimeout(() => {
            setStep(4);
        }, 3000);

        let form = new FormData();
        form.append('sellItemString', JSON.stringify(sellItem));

        imageFileList.forEach(i => {
            form.append("imageFileList", i);
        });

        axios.post(host + '/sell', form, {

            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token') != null ?
                    localStorage.getItem('token') : ""
            }
        })
            .then((response) => {
            })
            .catch((error) => {
            })
    }

    
    const getUserBankAccount = (itemId) => {
        axios.get(host + '/userBankAccount/sell', {
            headers: { Authorization: localStorage.getItem('token') }
          })
        .then((response) => {
            if(response.data.data.length > 0){
                setUserBankAccountList(response.data.data);
                setSelectedUserBankAccount(response.data.data[0].userBankAccount);
            }
        });
    }

    const getBankInfo = () => {
        axios.get(host + '/bank')
          .then((response) => {
              setBankList(response.data.data);
          });
      }

      const onUserBankAccountSubmit = data => {
        const newAcc = {
          bankId: selectedBankId,
          accountNumber: data.accountNumber,
          depositorName: data.depositorName
        };
        sendNewAcc(newAcc);
      };
    
      const sendNewAcc = async data => {
        axios
          .post(host + "/userBankAccount", data, {
            headers: { Authorization: localStorage.getItem('token') }
          })
          .then(res => {
              getUserBankAccount();
              closeModal();
          });
      };


    return (
        <section id="register-container">
            {
                    step === 1 ?
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
                                                searchType="sell" sellSortType = {sellSortType}></Search>
                                        </Col>
                                    </Row>
                                </header>
                            </div>
                            {resdata != undefined && resdata.length > 0 ?
                                <div>
                                    <Row style={{marginTop : "15px", marginBottom : "25px"}}>
                                        <Col offset={1} span={22} style={{height : "40px", borderTop : "1px solid #8d8d8d", borderBottom : "1px solid #8d8d8d"}}>
                                            <Row style={{fontSize : "14px", textAlign : "center", padding : "10px 0 10px 0", color : "#707070"}}>
                                                <Col onClick={()=>{setSellSortType("accuracy")}} offset={1} span={4}>
                                                    <span style={sellSortType === "accuracy" ? {color : "black"} : null}>정확도순</span>
                                                </Col>
                                                <Col onClick={()=>{setSellSortType("regiCount")}} offset={2} span={4}>
                                                    <span style={sellSortType === "regiCount" ? {color : "black"} : null}>판매량순</span>
                                                </Col>
                                                <Col onClick={()=>{setSellSortType("pubdate")}} offset={2} span={4}>
                                                    <span style={sellSortType === "pubdate" ? {color : "black"} : null}>출시일순</span>
                                                </Col>
                                                <Col onClick={()=>{setSellSortType("regiPrice")}} offset={2} span={4}>
                                                    <span style={sellSortType === "regiPrice" ? {color : "black"} : null}>저가격순</span>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    {resdata.map((value, index) => {
                                        return (
                                            <div>
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
                                                                {
                                                                    localStorage.getItem('token') != null ?
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
                                                                        :
                                                                        <Link to="/signin">
                                                                            <button style={{
                                                                                borderRadius: "14px", background: "rgba(51, 158, 172, 0.9)",
                                                                                color: "white", border: "none", fontSize: "12px", height: "25px", width: "100%",
                                                                                padding: "auto"
                                                                            }}
                                                                            ><span>판매 등록하기</span></button>
                                                                        </Link>
                                                                }
                                                            </Col>
                                                        </Row>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col offset={1} span={22}><Divider /></Col>
                                                </Row>
                                            </div>
                                        );
                                    })}
                                </div>


                                :
                                <div>
                                    <Row>
                                        <Col offset={1} span={22}><Divider /></Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{offset : 2, span : 20}}>
                                            <h5 style={{color : "#707070"}}>찾으시는 서적이 없나요?</h5>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={{offset : 1, span : 22}}>
                                            <ul style={{color : "#707070"}}>
                                                <li>핵심 단어를 띄어쓰기 하여 입력해주세요. 예시) 맨큐의 경제학 → 맨큐 경제</li>
                                                <li>오타가 있는지 다시 확인해보세요.</li>
                                            </ul>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col offset={1} span={22}><Divider /></Col>
                                    </Row>
                                </div>
                            }
                            <Footer></Footer>
                        </div>

                        :
                        step === 2 ?
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
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>거래방식<span style={{color : "#e95513"}}>*</span></span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 10, offset: 2 }}>
                                            <button
                                                class={dealType === 1 ? "register-button-active" : "register-button"}
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
                                                onClick={() => setDealType(1)}>북을박스</button>
                                        </Col>
                                        <Col xs={{ span: 10, offset: 0 }}>
                                            <button
                                                class={dealType === 0 ? "register-button-active" : "register-button"}
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
                                                onClick={() => { setDealType(0)}}>직거래</button>
                                        </Col>
                                    </Row>
                                    {
                                        dealType === 1 ?
                                        <div>
                                        <Row>
                                        <Col xs={{ span: 5, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>계좌선택<span style={{color : "#e95513"}}>*</span></span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            {
                                                userBankAccountList.length === 0?
                                                <div>
                                                    {clickedAddUserAccount? 
                                                        <div>
                                                            <select onChange={(e) => {
                                                                setSelectedBankId(e.target.value)
                                                            }} name="bankList"
                                                                style={{
                                                                    width: "100%", height: "40px", border: "none",
                                                                    borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                                                    backgroundColor: "transparent"
                                                                }}>
                                                                {
                                                                    bankList.length > 0 && bankList.map((value, index) => {
                                                                        return <option value={value._id} style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "10px" }} key={index}>
                                                                            {value.name}</option>
                                                                    })}
                                                            </select>
                                                <form onSubmit={handleSubmit(onUserBankAccountSubmit)}>
                                                    <Row style={{marginTop : "10px"}}>
                                                        <Col xs={{ span: 24 }}>
                                                            <label
                                                            style={{
                                                                width : "100%",
                                                                color: "rgba(51, 158, 172, 0.9)",
                                                                fontWeight: "800"
                                                            }}
                                                            >
                                                            계좌번호
                                                            </label>
                                                        </Col>
                                                    </Row>
                                                    <Row style={{ marginTop : "-10px", marginBottom: "10px" }}>
                                                        <Col xs={{ span: 24 }}>
                                                            <input
                                                            style={{
                                                                width: "100%",
                                                                height: "40px",
                                                                border: "none",
                                                                borderBottom: "#44a0ac solid 1.0px",
                                                                backgroundColor: "transparent",
                                                            }}
                                                            name="accountNumber"
                                                            ref={register({ required: true })}
                                                            ></input>
                                                        </Col>
                                                    </Row>
                                                    <Row id="ownerName">
                                                    <Col>
                                                        <Row>
                                                        <Col xs={{ span: 24 }}>  
                                                            <label
                                                            style={{
                                                                color: "rgba(51, 158, 172, 0.9)",
                                                                fontWeight: "800"
                                                            }}
                                                            >
                                                            예금주
                                                            </label>
                                                        </Col>
                                                        </Row>
                                                        <Row>
                                                        <Col style={{ marginTop : "-10px", marginBottom: "10px" }} xs={{ span: 24 }}>
                                                            <input
                                                            style={{
                                                                width: "100%",
                                                                height: "40px",
                                                                border: "none",
                                                                borderBottom: "#44a0ac solid 1.0px",
                                                                backgroundColor: "transparent",
                                                            }}
                                                            xs={{ span: 20, offset: 2 }}
                                                            name="depositorName"
                                                            ref={register({ required: true })}
                                                            ></input>
                                                        </Col>
                                                        </Row>
                                                    </Col>
                                                    </Row>
                                                    <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                                                    <Col xs={{ span : 24 }}>
                                                        <input
                                                        style={{
                                                            padding: "0",
                                                            width: "100%",
                                                            background: "rgba(51, 158, 172, 0.9)",
                                                            color: "#ffffff",
                                                            border: "none",
                                                            fontSize: "15px", height: "35px",
                                                            borderRadius : "16px"
                                                        }}
                                                        type="submit"
                                                        onClick={() => {
                                                            // window.location.reload();
                                                        }}
                                                        value="계좌 등록하기"
                                                        />
                                                    </Col>
                                                    </Row>
                                                </form>                                                                      
                                                    </div>
                                                    :
                                                    <div>
                                                        <button style={{
                                                            padding: "0",
                                                            width: "100%",
                                                            background: "rgba(51, 158, 172, 0.9)", color: "#ffffff",
                                                            border: "none", borderRadius: "14px", fontSize: "18px", height: "32px"
                                                        }}
                                                        onClick={() => {setClickedAddUserAccount(true)}}>
                                                            <span>계좌 등록하기</span>
                                                        </button>    
                                                    </div>}
                                                </div>
                                                :
                                                <select onChange={(e) => {
                                                    setSelectedUserBankAccount(e.target.value);
                                                }} 
                                                value = {selectedUserBankAccount}
                                                name="semester"
                                                    style={{
                                                        width: "100%", height: "40px", border: "none",
                                                        borderBottom: "rgba(51, 158, 172, 0.9) solid 2px",
                                                        backgroundColor: "transparent"
                                                    }}>
                                                    {
                                                        userBankAccountList.length > 0 && userBankAccountList.map((value, index) => {
                                                            return <option value={value} style={{ width: "100%", border: "rgba(51, 158, 172, 0.9) solid 2px", fontSize: "10px" }} key={index}>
                                                                {value.userBankAccount.accountNumber + " (" + value.bankName + ")"}</option>
                                                        })}
                                                </select>
                                            }

                                        </Col>
                                    </Row>
                                    </div>
                                    : null

                                    }
                                   
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 22, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>사진(최대 3장)<span style={{color : "#e95513"}}>*</span></span>
                                            {!isRegiImagesFilled && <p style={{ marginBottom: "-10px", fontSize : "12px" }}>1장 이상의 사진을 등록해 주세요.</p>}
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
                                        {imageDiv !== undefined ? imageDiv : null}
                                    </Row>
                                    <Row style={{marginBottom: "10px" }}>
                                        <Col xs={{ span: 20, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>책상태(택 1)<span style={{color : "#e95513"}}>*</span></span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 5, offset: 2 }} >
                                            <button
                                                class={qualityGeneral === "CLEAN" ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    setQualityGeneral("CLEAN");
                                                }}
                                                style={{fontSize : "12px"}}
                                            >깨끗</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityGeneral === "ALMOST_CLEAN" ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    setQualityGeneral("ALMOST_CLEAN");
                                                }}
                                                style={{fontSize : "12px"}}
                                                >대체로 깨끗</button>
                                        </Col>
                                        <Col xs={{ span: 5, offset: 1 }}>
                                            <button
                                                class={qualityGeneral === "USED" ? "register-button-active" : "register-button"}
                                                onClick={() => {
                                                    setQualityGeneral("USED");
                                                }}
                                                style={{fontSize : "12px"}}
                                                >사용감 많음</button>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col xs={{ span: 16, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>기타(중복 선택 가능)</span>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: "10px" }}>
                                        {
                                            [["SCRATCHED_AND_FOLDED", "긁힘"], ["UNDERLINED", "밑줄"], ["SOLVED", "푼제 풂"], ["NAME_WRITTEN", "이름 기입"], 
                                            ["WET", "젖음"], ["RIPPED", "찢어짐"], ["WRITTEN", "필기"], ["EXTRA", "기타 오염"]]
                                                .map((qualityArr, index) => {
                                                    if(index === 0 || index % 3 === 0){
                                                        return (
                                                            <Col xs={{ span: 5, offset: 2 }} style={{marginBottom : "5px"}}>
                                                                <button
                                                                    class={index < qualityExtra.length && 
                                                                        qualityExtra[index] === true ? "register-button-active" : "register-button"}
                                                                    onClick={() => {
                                                                        if(qualityExtra[index] === true) {
                                                                            let currQualityExtra= qualityExtra;
                                                                            currQualityExtra[index] = false;
                                                                            setQualityExtra(currQualityExtra);
                                                                        }
                                                                        else{
                                                                            let currQualityExtra= qualityExtra;
                                                                            currQualityExtra[index] = true;
                                                                            setQualityExtra(currQualityExtra);
                                                                        }
                                                                    }}
                                                                >{qualityArr[1]}</button>
                                                        </Col>
                                                        )
                                                    }
                                                    return (
                                                        <Col xs={{ span: 5, offset: 1 }} style={{marginBottom : "5px"}}>
                                                            <button
                                                                class={index < qualityExtra.length && 
                                                                    qualityExtra[index] === true ? "register-button-active" : "register-button"}
                                                                onClick={() => {
                                                                    if(qualityExtra[index] === true) {
                                                                        let currQualityExtra= qualityExtra;
                                                                        currQualityExtra[index] = false;
                                                                        setQualityExtra(currQualityExtra);
                                                                    }
                                                                    else{
                                                                        let currQualityExtra= qualityExtra;
                                                                        currQualityExtra[index] = true;
                                                                        setQualityExtra(currQualityExtra);
                                                                    }
                                                                }}
                                                            >{qualityArr[1]}</button>
                                                    </Col>
                                                    );
                                                })
                                        }
                                    </Row>
                                    <Row>
                                        <Col xs={{ span: 8, offset: 2 }}>
                                            <span style={{ color: "rgba(51, 158, 172, 0.9)", fontWeight: "800" }}>판매 희망가격<span style={{color : "#e95513"}}>*</span></span>
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
                                                    value = value.replace(/,/g, "")
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
                                                onClick={()=>{
                                                    if(selectedUserBankAccount == null){
                                                        setModalVisible(true);
                                                    }
                                                    else{
                                                        setIsFinalSubmit(true);
                                                    }
                                                }}
                                                >
                                                    <span>판매 등록하기</span>
                                            </button>
                                                        <Modal
                                                            title={null}
                                                            footer={null}
                                                            visible={modalVisible}
                                                            onOk={()=>{setModalVisible(true)}}
                                                            onCancel={()=>{setModalVisible(false)}}>
                                                                <div>
                                                                    <span>판매 등록을 위해서 계좌 등록 및</span>
                                                                </div>
                                                                <div>
                                                                    <span>선택을 필수적으로 진행해주세요.</span>
                                                                </div>
                                                                
                                                          </Modal>
                                        </Col>
                                    </Row>
                                </form>
                            </div>
                            : step === 3 ?
                                <Row style={{padding : "320px 0 320px 0"}}>
                                    <Col xs={{ span: 4, offset: 10 }} style={{ padding: "auto" }}>
                                        <BeatLoader
                                            size={"15px"}
                                            color={"#339eac"}
                                            loading={true}
                                        />
                                    </Col>
                                </Row>
                            : step === 4 ?
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
                                                    border: "none", borderRadius: "14px",
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
