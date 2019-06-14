import * as actionTypes from '../actions/actionTypes';
import {updateObject } from '../../shared/utility';

const initialOrderState = {
    orders:[],
    loading:false,
    purchased:false

}

const fecthoderStart = (state,action) => {
    return updateObject(state,{loading:true})
}

const fecthOrderSuccess = (state,action) => {
    return updateObject(state,{
        orders:action.orders,
        loading:false
    });
}
const fecthOrderFailed = (state,action) => {
    return updateObject(state,{loading:false});
}
const purchaseOrderSuccess = (state,action) => {
    const newOrder = updateObject(action.orderData,{
        id:action.orderId
    });
    return updateObject(state,{
        loading:false,
        orders: state.orders.concat(newOrder),
        purchased:true
    });

}
const purchaseBurgerFailed = (state,action) => {
    return updateObject(state,{loading:false});
}

const purchaseBurgerStart = (state,action) => {

    return updateObject(state,{loading:true});

}

const purchaseInit = (state,action) => {

    return updateObject(state,{purchased:false});

}

const reducer = (state = initialOrderState, action) => {
    switch(action.type){
        case(actionTypes.FETCHED_ORDERS_START):  return fecthoderStart(state,action);

        case(actionTypes.FETCHED_ORDERS_SUCCES): return fecthOrderSuccess(state,action);

        case(actionTypes.FETCHED_ORDERS_FAILED): return fecthOrderFailed(state,action);
        
        case(actionTypes.PURCHASE_BURGER_FAILED): return purchaseBurgerFailed(state,action);

        case(actionTypes.PURCHASE_BURGER_SUCCESS): return purchaseOrderSuccess(state,action);

        case(actionTypes.PURCHASE_BURGER_START): return purchaseBurgerStart(state,action);

        case(actionTypes.PURCHASE_INIT): return purchaseInit(state,action);
        
        default: return state;
        
    }
};

export default reducer; 