import React, { Component } from 'react';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';


import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});


const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {
  
  componentDidMount(){

    this.props.onTryAutoSignup();
     
  }
  render() {
    let routes = (
      <Switch>      
<Route path="/Auth" exact component={asyncAuth}/>
<Route path="/" exact component={BurgerBuilder}/>
<Redirect to="/"/>
      </Switch>
    );

    if(this.props.isAutheticated){
      routes = (
<Switch>
<Route path="/Auth" exact component={asyncAuth}/>
<Route path="/Checkout" component={asyncCheckout}/>
<Route path="/orders" component={asyncOrders}/>
<Route path="/logout" exact component={Logout}/>
<Route path="/" exact component={BurgerBuilder}/>
<Redirect to="/"/> 
</Switch>
      )
    }
    return (
      <div>        
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    isAutheticated: state.auth.token !== null
  }
}

const matchDispatchToProps = (dispatch) => {
  return {
onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(App));
