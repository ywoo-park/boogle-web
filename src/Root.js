import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";

export default function Root() {
  
  React.useEffect(() => {
    document.title = "북을 : BOOGLE"
  }, [])

  return (
        <BrowserRouter> 
            <App/>
        </BrowserRouter>
  )
}

/*
class Root extends React.Component{

  componentWillMount(){
    document.title = "북을 : BOOGLE";
  }

    render(){
      document.getElementsByTagName("META")[1].content="width=device-width, initial-scale=1, shrink-to-fit=no, user-scalable=no"
      return(
        
      )
    }
  }

export default Root;
*/