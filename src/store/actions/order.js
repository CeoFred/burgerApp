import * as actionTypes from './actionTypes';

import axios from '../../axios-orders';





export const purchaseBurgerSucess = (id,orderData) => {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData: orderData
    };
};

export const purchaseBurgerFailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error:error
    }
}
export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
        .then(response => {
            // console.log(response.data.name)
            dispatch(purchaseBurgerSucess(response.data, orderData));
        })
        .catch (err =>
            {
        dispatch(purchaseBurgerFailed(err));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
}

export  const fechedOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCHED_ORDERS_SUCCES,
        orders:orders
    };
};


export const fechedOrderFail = (err) => {
    return {
        type: actionTypes.FETCHED_ORDERS_FAILED,
        err:err
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCHED_ORDERS_START
    };
};

export const fecthOrders = (token,userId) => {
    return (dispatch) => {
const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="'  + userId + '"';
        dispatch(fetchOrdersStart())
        axios.get('/orders.json'+queryParams)
        .then(res => {
            const fecthOrders = [];
            for(let key in res.data){
                fecthOrders.push({
                    ...res.data[key],
                    id:key 
                });
            }
            dispatch(fechedOrderSuccess(fecthOrders));
        })
        .catch(err => {
            dispatch(fechedOrderFail(err));
        });
    }
    
};
