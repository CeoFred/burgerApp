import React from 'react'

import classes from './DrawerToogle.css';

const DrawerToogle = (props) => {
return <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
</div>
};

export default DrawerToogle;