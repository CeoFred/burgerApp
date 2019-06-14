import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import * as actions from '../../../store/actions/index';

 class Logout extends Component {

    componentWillMount(){
        this.props.onLogout();
    }

    render(){
        return  <Redirect to="/"/>
    }
}

const matchDispatchToProps = (dispatch) => {
    return  {
        onLogout: () => dispatch(actions.logout())
    }
};

export default connect(null,matchDispatchToProps)(Logout);