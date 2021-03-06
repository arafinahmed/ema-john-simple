import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, processOrder } from '../../utilities/databaseManager';
import fakeData from '../../fakeData';
import Reviewitem from '../Reviewitem/Reviewitem';
import Cart from '../Cart/Cart';
import './Review.css'
import happyImage from '../../images/giphy.gif'
import { Link } from 'react-router-dom';
import { useAuth } from '../Login/useAuth';


const Review = () => {
    const auth = useAuth();
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const removeProduct = (proKey) => {
        const newCart = cart.filter(pd => pd.key!== proKey);
        setCart(newCart);
        removeFromDatabaseCart(proKey);
    }

    const handlePlaceOrder = () => {
        setCart([]);
        processOrder();
        setOrderPlaced(true);
    }
    
    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quanatity = savedCart[key];
            const newCart = [...cart, product]
            
            return product;
        });
        setCart(cartProducts);
       

    }, [])
    
    let thankyou;
    if(orderPlaced){
        thankyou = <img src={happyImage}></img>
    }
    return (
        <div className="review-container">
            <div className="item-container">
            <h1>Cart Items: {cart.length}</h1>
            {
                cart.map(pd => <Reviewitem
                product = {pd}
                removeProduct = {removeProduct}
                key = {pd.key}></Reviewitem>)
                
            }
            {
                thankyou
            }
            {
                !cart.length && <h1>Your cart is empty
                    <a href="/"> Keep Shopping</a>
                </h1>
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/ship">
                    {   auth.user ?
                        <button  className="main-button">Proceed order</button> :
                        <button  className="main-button">Log in to Proceed</button>
                    }
                    </Link>
                </Cart>
            </div>
            

        </div>
    );
};

export default Review;