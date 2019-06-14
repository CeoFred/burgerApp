import * as actionTypes from '../actions/actionTypes';
import  {updateObject}  from  '../../shared/utility';

const initialState = {
    
    ingredients: null,
        totalPrice: 4,
        loading:false,
        error:false,
        building:false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese :0.4,
    meat: 1.3,
    bacon:0.7
}


const addIngrdients = (state,action) => {

    const updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1}
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient); //returns an object of updated Ingredients
    const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state,updatedState);
}

const removeIngredients = (state, action) => {

    const updatedIng = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1}
    const updatedIngs = updateObject(state.ingredients,updatedIng); //returns an object of updated Ingredients
    const updated = {
        ingredients: updatedIngs,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building:true
    }
    return updateObject(state,updated);

}

const fecthIngFailed = (state,actio) => {
    
    return updateObject(state,{
        error:true,
        loading:false
    });
}

const setIngredient = (state, action) => {

    return updateObject(state,{
        ingredients:{
            salad:action.ingredients.salad,
            bacon: action.ingredients.bacon,
            cheese: action.ingredients.cheese,
            meat:action.ingredients.meat
        },
        error:false,
        loading:false,
        totalPrice: 4,
        building:false
    });
}

const reducer = (state = initialState, action) => {
    switch(action.type){

case(actionTypes.ADD_INGREDIENT):return addIngrdients(state,action);
//should have been 
// return {
            // ...state,
            //ingredients: {
            //  ...state.ingredients, deep cloning of state object is mandatory to update the states
            //  [action.ingredient] : state.ingredients[action.ingredientName] + 1
            // }, totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    //
            //--> This is hanndled by the utility function updatedObect, which returns the above object
// }
    case(actionTypes.REMOVE_INGREDIENT):   return removeIngredients(state,action);

    case(actionTypes.SET_INGREDIENTS): return setIngredient(state,action);

    case(actionTypes.FETCH_INGREDIENTS_FAILED): return fecthIngFailed(state,action);

    default: return state;   
    }

};

export default reducer;