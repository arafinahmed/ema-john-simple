import React from 'react';
import { Link } from 'react-router-dom';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    let total = 0;
    for(let i=0; i<cart.length; i++){
        const pd = cart[i];
        total = total + pd.price*pd.quanatity;
         
    }

    let shipping = 0;
    if(total>15){
        shipping = 4.99;
    }
    else if(total>0){
        shipping = 12.99;
    }
    if(total>35){
        shipping = 0;
    }
    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    const tax = formatNumber(total/10);
    const grandTotal = formatNumber(total + shipping + tax);

    
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Shipping cost: {shipping}</small></p>
            <p><small>Tax: {tax}</small></p>
            <h5>Total: {grandTotal}</h5>
            <br/>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;