
import React,{Component} from 'react';
import {connect} from 'react-redux';


import Auxi from '../Auxi';
import classes from './Layout.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class layout extends Component{

    state = {
        showSideDrawer:false
    }

    SideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToogleHandler = () => {
        this.setState( (prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        }
        )
    }

    render(){
        return(
            <Auxi>
            <Toolbar auth={this.props.token} DrawerToogleClick={this.sideDrawerToogleHandler}/>
                <SideDrawer auth={this.props.token} open={this.state.showSideDrawer}
                 closed={this.SideDrawerCloseHandler}/>
                    <main className={classes.Content}>
                        {this.props.children}
                    </main>
            </Auxi>
    
            );
        
    }
        
}
    // higher order component Auxi used
 
const mapStateToProps = state => {
    return {
        token:state.auth.token
    }
}
export default connect(mapStateToProps)(layout);