import React from 'react';

import classes from './Input.css';

const Input = (props) => {
    let inputElement = null;

    const InputClasses = [classes.InputElement];

if(!props.invalid && props.touched){
    InputClasses.push(classes.Invalid);
}

    switch(props.elementType){
        case('input'):
        inputElement = <input 
        className={InputClasses.join(' ')} 
        {...props.elementConfig} 
        value={props.value}  onChange={props.changed}/>;
        break;

    case('textarea'):
    inputElement = <textarea 
    className={InputClasses.join(' ')}
     {...props.elementConfig}
      value={props.value} onChange={props.changed} />;
    break;

    case('select'):
    inputElement = (<select onChange={props.changed}
    className={InputClasses.join(' ')}
      value={props.value}>
      {props.elementConfig.options.map(option => (
          <option value={option.value} key={option.value} >
          {option.displayValue}</option>
      ))}
    </select>);
    break;

    default:
    inputElement = <input
     className={InputClasses.join(' ')} 
    {...props.elementConfig}  
    value={props.value} onChange={props.changed}/>;
    }
    return(
        <div className={classes.Input}>
        <label className={classes.Label}>{props.label}
        {inputElement}
        </label>
        </div>
    );
};

export default Input;
