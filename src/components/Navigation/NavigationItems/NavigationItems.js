import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => {

return <ul className={classes.NavigationItems}>
 <NavigationItem link='/' active>
     Burger Builder
     </NavigationItem>

 {props.auth?
<NavigationItem link='/orders'>
    Orders
</NavigationItem> 
: null}

<NavigationItem link={props.auth?'/logout':'/Auth'}>
    {props.auth?'Logout':'LogIn'}
</NavigationItem>
    </ul>
}

export default navigationItems