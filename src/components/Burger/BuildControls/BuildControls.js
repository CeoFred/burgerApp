    import React  from 'react'

    import classes from './BuildControls.css';
    import BuildControl from './BuildControl/BuildControl';

    const controls = [
            { label: 'Salad', type: 'salad'},
            { label: 'Bacon', type: 'bacon'},
            { label: 'Cheese', type: 'cheese'},
            { label: 'Meat', type: 'meat'},

    ];

    const buildControls = (props) => {
    return <div className={classes.BuildControls}>
    <p>CurrentPrice: $<strong>{props.totalPrice.toFixed(2)}</strong></p>
        {controls.map(ctrl => (
            <BuildControl 
            disabled={props.disabled[ctrl.type]}

            key={ctrl.label} 
             label={ctrl.label} 
             added={() => props.ingredientsAdded(ctrl.type)}
             removed={() => props.ingredientsRemoved(ctrl.type)}/>
        ))}
        <button
         className={classes.OrderButton} 
         disabled={!props.purchaseable}
         onClick={props.ordered}>{props.isAuth ?'ORDER NOW': 'SIGNUP TO ORDER'}</button>

        </div> 
    }

    export default buildControls;