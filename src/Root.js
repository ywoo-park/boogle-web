import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";


class Root extends React.Component{
    render(){
      document.title = "북을 : BOOGLE";
      document.getElementsByTagName("META")[1].content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
      return(
        <BrowserRouter> 
            <App/>
        </BrowserRouter>
      )
    }
  }

export default Root;