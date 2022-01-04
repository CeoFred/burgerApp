import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';



class BurgerBuilder extends Component {

    state = {
        purchasing: false,


    }

    componentDidMount() {
        this.props.onInitIngredients();
    }
    updatePurchaseState(ingredients) {

        const sum = Object.keys(ingredients).map(key => {
            return ingredients[key];
            // getting the values
        })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;

    }

    //     addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const upadtedCount = oldCount + 1;
    //     const upadtedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     upadtedIngredients[type] =  upadtedCount;
    // // const priceAddition = INGREDIENT_PRICES[type];
    // // const oldPrice = this.state.totalPrice;
    // // const newPrice = oldPrice + priceAddition;

    //     this.setState({totalPrice: newPrice,ingredients: upadtedIngredients});
    //     this.updatePurchaseState(upadtedIngredients);
    // }

    //     removeIngredientHandler = (type) => {
    //         const oldCount = this.state.ingredients[type];
    //         if(oldCount === 0) return;
    //         const upadtedCount = oldCount - 1;
    //         const upadtedIngredients = {
    //             ...this.state.ingredients
    //         };
    //         upadtedIngredients[type] =  upadtedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceAddition;

    //         this.setState({totalPrice: newPrice,ingredients: upadtedIngredients});
    //     this.updatePurchaseState(upadtedIngredients);

    //     }

    puchaseHandler = () => {

        if (this.props.authenticated) {
            this.setState({ purchasing: !this.state.purchasing });
        } else {
            this.props.onsetAuthRedirectPath('/Checkout');
            this.props.history.push('/Auth');
        }

    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push(
            '/Checkout');
    }
    
    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        // {salda:true,meat:false}
        let Order = null;


        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.props.ings) {

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />

                    <BuildControls
                        isAuth={this.props.authenticated}
                        ordered={this.puchaseHandler}
                        totalPrice={this.props.price}
                        disabled={disabledInfo}
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsRemoved={this.props.onIngredientRemoved}
                        purchaseable={this.updatePurchaseState(this.props.ings)} />
                </Aux>
            );

            Order = <OrderSummary
                price={this.props.price}
                purchaseCancled={this.puchaseHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ings} />

        }

        return (
            <Aux>
                <Modal modalClosed={this.puchaseHandler}
                    show={this.state.purchasing}>
                    {Order}
                </Modal>
                {burger}
            </Aux>

        );
    }
}

//set the state in our redux store to an object property to be used by components
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        authenticated: state.auth.token !== null
    };
}

const mapDispatchToProps = dispatch => {
    return {
        //action creators used ,locate function at store/actions/burgerBuilder
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onsetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
