import React,{Component} from 'react'

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

   
class orderSummary extends Component{
    // componentWillUpdate(){
    //     console.log('OrderSumary');
    // }
    render(){
        
    const ingredientSummary =  Object.keys(this.props.ingredients)
    .map(igkey => {
        return  (
        <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>:
            {this.props.ingredients[igkey]}
        </li>)
;
//    {props.ingredientSummary[key]} , accessing the value of the key
 
    });
        return(

                <Aux>
                    <h3>Your Order</h3>
                    <p>A delicious burger with the following ingredients</p>
                    <ul>
                        {ingredientSummary}
                    </ul>
            <p><strong>Total:${this.props.price.toFixed(2)}</strong></p>
                    <p>Continue to checkout</p>
            
                    <Button btnType="Danger" clicked={this.props.purchaseCancled}>CANCEL</Button>
                    <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            
                </Aux>
            )
            
        
    }
} ;

export default orderSummary;