import React from 'react';
import './Reviewitem.css'
const Reviewitem = (props) => {
    
    const {name, quanatity, key, price} = props.product;
    return (
        <div  className="review-item">
            <div>
            <h4>{name}</h4>
            <p>Quantatity: {quanatity}</p>
            <p><small>${price}</small></p>
            <br/>
            <button  
            onClick = {() => {
                props.removeProduct(key)
            }}
            className="main-button">Remove</button>
            </div>
        </div>
    );
};

export default Reviewitem;