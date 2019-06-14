import React, { Component } from 'react';
import {connect} from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandlers from '../../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import { updateObject , checkValidity } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        orderForm:{

            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false
            },
                street: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Street'
                    },value:'',
                    validation: {
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipCode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Zip Code'
                    },value:'',
                    validation: {
                        required:true,
                        minlenght:5,
                        maxlength:5
                    },
                    valid:false,
                    touched:false
                },
                country: {
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },value:'',
                    valid:false,
                    validation: {
                        required:true
                    },
                    touched:false
                },
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },value:'',
                validation: {
                    required:true
                },
                valid:false,
                touched:false,
                isEmail:true
            },
        delivery: {
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'},
                ]
            },value:'fastest',
            valid:true
        }
        },
        formisValid:false
    }
orderHandler = (event) =>{
    event.preventDefault();
    // console.log(this.props.ingredients);
const formData = {}
for(let formElementIdentifier in this.state.orderForm){
    formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    // creatig key value pairs like {salad:2, cheese:3}
}
const order = {
    ingredients: this.props.ings,
    price: this.props.price,
    orderData: formData,
    userId : this.props.userId
}
this.props.onOrderBurger(order,this.props.token);
}

inputChangeHandler = (event,inputIdentifier) => {
// console.log(event.target.value);

const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],{
    value:event.target.value,
    valid:checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
    touched: true
});
const updatedOrderForm = updateObject(this.state.orderForm,{
    [inputIdentifier]:updatedFormElement})

let formisValid = true;
for(let inputIdentifier in updatedOrderForm){
    formisValid = updatedOrderForm[inputIdentifier].valid && formisValid
}
// console.log(formisValid)
this.setState({orderForm:updatedOrderForm,formisValid:formisValid});

}
render(){

    const formElementArray = [];
    for(let key in this.state.orderForm){
        formElementArray.push({
            id:key,
            config:this.state.orderForm[key]
        });
    }
    // console.log(formElementArray);

    let form = 
        <form onSubmit={this.orderHandler}>
        {/* <Input inputtype="input" elementType={} elementConfig={...} value={...}/> */}
        {formElementArray.map(formElement => (
            <Input key={formElement.id} 
            elementConfig={formElement.config.elementConfig}
            elementType={formElement.config.elementType}
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event,formElement.id)}
            invalid={formElement.config.valid}
            touched={formElement.config.touched}
            />
        ))}
        <Button btnType="Success" disabled={!this.state.formisValid}>ORDER</Button>
        </form>

    if(this.props.loading){
        form = <Spinner/>;
    }
        return(
            <div className={classes.ContactData}>
    <h4>Enter your contact data</h4>

                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const matchDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData,token) => dispatch(actions.purchaseBurger(orderData,token))
        };
    };

export default connect(mapStateToProps,matchDispatchToProps)(withErrorHandlers(ContactData,axios));