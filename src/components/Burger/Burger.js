 import React from 'react';

 import classes from './Burger.css';
 import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
 
 const burger = (props) => {
    // const transformedIngredients2 = Object.keys(props.ingredients).map(igKey => { 
    //     // creates and array of 4 items for each ingredient depending on the value of the key eg [1,2,3,4]
    //     return [...Array(props.ingredients[igKey])]
    // })
    //  console.log(transformedIngredients2)
    //  getting key of the object ingradient we are recieving and looping throgh them

    let transformedIngredients = Object.keys(props.ingredients)
     .map(igKey => {
        //  igKey = salad,cheese,meat etc
        // [...Array()] returns a number of array spaces. e.g [...Array(3)] return 3 empty array [ , , ] 
        // [...Array(props.ingredients[igKey])] returns an array of the value of the keys
        // [...[ , ][ , , ][ , , , ]] then the spread operator does 
        // [ , , , , , , , ] i.e has a length of eight and would
        //  return eight burgers all stil having their names and type
         return [...Array(props.ingredients[igKey])].map((_,i) => {

            // igkey still has the key name and can
            //  be retrieved for each item in the array
return <BurgerIngredient key={igKey + i} type={igKey} />; 
});
     } )
     .reduce((arr, el) => {
         return arr.concat(el)
     }, []);
     
     if(transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
     }
   //   console.log(transformedIngredients);

    return (

            <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
            </div>
                );
};

export default burger;