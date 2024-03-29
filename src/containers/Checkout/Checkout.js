import React, { Component } from 'react';
import {Route,Redirect} from 'react-router-dom';
import {connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
// import * as actions from '../../store/actions/index';

class Checkout extends Component{

    checkoutCancelledHandler = ()  =>{
this.props.history.goBack();
    }
    checkoutContinuedHandler = () =>{
this.props.history.replace('Checkout/contact-data');
    }
    render(){
        let summary = <Redirect to="/" />
        if(this.props.ings){

        let purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                  {purchaseRedirect}
<CheckoutSummary 
                checkoutContinued={this.checkoutContinuedHandler} 
                checkoutCancelled={this.checkoutCancelledHandler} 
                ingredients={this.props.ings}/>
<Route path={this.props.match.path + '/contact-data'} component={ContactData} />
                </div>

            );

        }
        return summary
            
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}; 


export default connect(mapStateToProps)(Checkout);
