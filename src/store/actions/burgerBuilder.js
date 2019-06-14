import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


// these are action creators

export const addIngredient = (name) => {
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
}

export const removeIngredient = (name) => {
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}   

export const fecthIngredientsFailed = ( ) => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}   

//action with middlware
export const initIngredient = () => {
    // dispatch an action after async 
    return dispatch => {
        axios.get('https://burger-app-f1fd6.firebaseio.com/ingredients.json')
    .then(res => {
        dispatch(setIngredients(res.data))
    })
    .catch(error =>{
        dispatch(fecthIngredientsFailed())
    });
        
    };
}

