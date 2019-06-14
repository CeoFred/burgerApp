import React from 'react'

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToogle from '../SideDrawer/DrawerToogle/DrawerToogle';

const toolbar = (props) => {
    return  <header className={classes.Toolbar}>
        <DrawerToogle clicked={props.DrawerToogleClick}/>
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
        <NavigationItems auth={props.auth}/>
        </nav>
    </header>

};

export default toolbar