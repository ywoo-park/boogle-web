import React, { useState } from 'react';
import useForm from 'react-hook-form';
import { Modal, Button, Col, Row, Icon } from 'antd';
import { useHistory, withRouter, Link } from "react-router-dom";
import axios from 'axios';

import './Search.css';

import host from '../../server-settings/ServerApiHost';

export default function Search(props,{ location, match, history }) {

    const [inputValue, setInputValue] = useState();
    const [resdata, setResdata] = useState();
    const [searchType, setSearchType] = useState("");
    const [keyword, setKeyword] = useState("");
    const [onFocus, setOnFocus] = useState("");
    const [onBlur, setOnBlur] = useState("");

    const updateInputValue = (e) => {

        setKeyword(e.target.value)

        if (searchType === "sell") {
            getAllSearchedSellItems(e.target.value);
        } else {
            getAllSearchedBuyItems(e.target.value);
        }
    }

    const updateInputValueByKeyword = (keyword) => {

        if(searchType === "sell"){
            getAllSearchedSellItems(keyword);
        }
        else {
            getAllSearchedBuyItems(keyword);
        }
    }

    const getAllSearchedBuyItems = async (keyword) => {
        if(isNaN(keyword) || (!isNaN(keyword) && keyword.length < 4)){
            axios.get(host + '/naver/bookApi/buy/title?keyword=' + keyword + "&itemResListSortType=" + props.sortType1 +
                "&itemNotRegisteredResListSortType=" + props.sortType2)
                .then((response) => {

                        if(response.data != null){

                            const items = response.data;

                            if(items!= undefined){
                                setResdata(items);
                            }
                        }

                        if(response.data.itemResList.length == 0 && response.data.itemNotRegisteredResList.length == 0){
                            getAllSearchedSellItems("");
                        }
                    }
                );
        }
        else{
            axios.get(host + '/naver/bookApi/buy/isbn?keyword=' + keyword)
                .then((response) => {

                        if(response.data != null){

                            const items = response.data;

                            if(items.itemResList!= undefined && items.itemResList.length > 0 && keyword !=''){
                                setResdata(items);
                            }

                            if(keyword == ''){
                                setResdata(null);
                            }

                        }
                    }
                );
        }

    }

    const getAllSearchedSellItems = async (keyword) => {

        if(props.sellSortType != undefined){
            if(isNaN(keyword) || (!isNaN(keyword) && keyword.length < 4)){

                axios.get(host  + '/naver/bookApi/sell/title?keyword=' + keyword + "&sortType=" + props.sellSortType)
                    .then((response) => {
                            if(response.data != null){

                                const items = response.data;

                                if(items!= undefined){
                                    setResdata(items);
                                }

                            }
                        }
                    );
            }
            else{
                axios.get(host + '/naver/bookApi/sell/isbn?keyword=' + keyword)
                    .then((response) => {
                            if(response.data != null){

                                const items = response.data;

                                if(items!= undefined && items.length > 0 && keyword !=''){
                                    setResdata(items);
                                }

                                if(keyword == ''){
                                    setResdata(null);
                                }

                            }
                        }
                    );
            }}


    }

    const onFocusHandler = () =>{
        setOnFocus("search-result-col");
        props.focusOnSearch(true);
    }

    const onBlurHandler = () => {
        setOnBlur("search-result-col-before-focus");
    }

    React.useEffect(() => {
        if(searchType == "" || searchType == props.searchType)
            setSearchType(props.searchType);
    }, [])

    React.useEffect(() => {
        if(resdata != null){
            props.updateInputValue(resdata);
        }
    }, [resdata])

    React.useEffect(() => {
        if(props.passedKeyword){
            updateInputValueByKeyword(props.passedKeyword)
        }
    }, [props.passedKeyword])

    React.useEffect(() => {
        if(props.sortType1 != null){
            getAllSearchedBuyItems(keyword);
        }
    }, [props.sortType1])

    React.useEffect(() => {
        if(props.sortType2 != null){
            getAllSearchedBuyItems(keyword);
        }
    }, [props.sortType2])

    React.useEffect(() => {
        if(props.sellSortType != null){
            getAllSearchedSellItems(keyword);
        }
    }, [props.sellSortType])

    return (
        <form className="search-form">
            <input onFocus={onFocusHandler} onBlur={onBlurHandler}
                   className="search-input" type="text" name="name"
                   onChange={evt => updateInputValue(evt)}
                   onKeyPress = {(e) => {
                       if(e.key == 'Enter'){
                           e.preventDefault();
                           e.target.blur();
                       }}}
                   placeholder={props.placeHolder} />
            <Icon className="search-input-button" type="search" theme="outlined" style={{ color: "white", margin: "auto" }}></Icon>
        </form>
    );
}