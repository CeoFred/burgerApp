import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from '../../axios-orders';

import Order from '../../components/Order/Order';
import withErrorHandlers from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';

class Orders extends Component {

    componentDidMount(){
      this.props.onload(this.props.token, this.props.userId);
    }
    
    render(){
        let orders = <Spinner/>
    if(!this.props.loading){
        orders = (<div>
                {this.props.orders.map(order => (
                  <Order 
                 price={order.price}
                 key={order.id}
                 ingredients={order.ingredients}/>
                ))
                }
            </div>

        );
    };
        return orders;
    }
}

const mapStateToProps = (state) => {
return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
 }
}

const matchDispatchToProps = dispatch => {
    return {
        onload: (token,id) => dispatch(actionTypes.fecthOrders(token,id))
    };
};

export default connect(mapStateToProps, matchDispatchToProps)(withErrorHandlers(Orders,axios));