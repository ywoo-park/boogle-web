import React, { Component } from "react";
import CustomerInquiryForm from "../components/CustomerInquiry/CustomerInquiryForm"

class CustomerInquiry extends Component {
    state = {

    }

    render() {
        return (
            <section id = "customerinquiry">
                <CustomerInquiryForm></CustomerInquiryForm>
            </section>
        );
    };
}

export default CustomerInquiry;