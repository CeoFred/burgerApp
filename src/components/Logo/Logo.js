import React from 'react';

import image from '../../assets/images/logo.png';
import classes from './Logo.css';

const logo = (props) => {
 return <div className={classes.Logo}>
    <img alt='Logo' src={image} style={{height: props.height}}/>
    </div>
};

export default logo;