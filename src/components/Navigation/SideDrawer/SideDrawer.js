import React from 'react';


import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Auxi from '../../../hoc/Auxi';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Auxi>
<BackDrop clicked={props.closed} show={props.open}/>
<div className={attachedClasses.join(' ')} onClick={props.closed}>
    <div className={classes.Logo}>
<Logo/>

</div>

    <nav>
        <NavigationItems auth={props.auth}/>
    </nav>

</div>
</Auxi>

    );
}

export default sideDrawer;