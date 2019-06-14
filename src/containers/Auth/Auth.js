import React, { Component } from 'react';
import {connect}  from 'react-redux';
import {Redirect} from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionType from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/spinner';
import {checkValidity} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType:'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Email Address'
                },
                value:'',
                validation: {
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password: {
                elementType:'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Password'
                },value:'',
                validation: {
                    required:true,
                    minLength: 6
                },
                valid:false,
                touched:false
            }
        }, formisValid:false,
        isSignUp: true
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/'){
            this.props.onSetAuthRedirect();
        }
    }

    
    
    inputChangeHandler = (event,controlName) => {

    const updatedControls = {
        ...this.state.controls,
        [controlName] : {
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched: true
        }
    };

    let formisValid = true;
for(let inputIdentifier in updatedControls){
    formisValid = updatedControls[inputIdentifier].valid && formisValid
}

    this.setState({controls:updatedControls,formisValid})
// console.log(updatedControls);
    
}   
submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value,
        this.state.controls.password.value,
        this.state.isSignUp);
} 
switchAuthModeHandler = () => {
this.setState( prevState => {
    return {
        isSignUp: !prevState.isSignUp
    }
})
}

    render(){
        const formElementArray = [];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form = 
        <form onSubmit={this.submitHandler}>
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

        <Button btnType="Success" disabled={!this.state.formisValid}>{this.state.isSignUp? 'SIGN UP': 'SIGN IN'}</Button>
        </form>
        if(this.props.loading){
            form = <Spinner/>
        }
        let redirect = null;
        if(this.props.authenticated){
            redirect = <Redirect to={this.props.authRedirectPath}/>
        }

        let error;
if(this.props.errorMessage){
    error = this.props.errorMessage;
}
let success;
if(this.props.loggedIn){
    success = 'Logged In';
}

        return(
            <div className={classes.Auth}>
            {redirect}
<span style={{color:'red'}}>{error}</span>
<span style={{color:'gren',fontSize:'20px'}}>{success}</span>
                {form}
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger">{this.state.isSignUp? 'SWITCH TO SIGN IN': 'SWITCH TO SIGN UP'}</Button>
                </div>
        );
    }
}

const mapStateToProps = state => {

    return {
        errorMessage : state.auth.errorMessage,
        loading:state.auth.loading,
        loggedIn: state.auth.token,
        authenticated: state.auth.token,
        buildingBurger: state.burgerBuilder.building ,
        authRedirectPath: state.auth.authRedirectPath
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actionType.auth(email,password,isSignUp)),
        onSetAuthRedirect : () => dispatch(actionType.setAuthRedirectPath('/'))
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(Auth);