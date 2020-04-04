import React, { useState, useEffect } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
const Shop = () => {
    
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => res.json())
        .then(data => {
            console.log(data, 'data from data base');
            setProducts(data);
        })
    }, [])
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length){
            const prevCart = productKeys.map(pdKey => {
                const product = products.find(pd => pd.key === pdKey);
                product.quanatity = savedCart[pdKey];
                return product;
            });
            setCart(prevCart);
        }
    }, [products]);


    const handleAddProduct = (product) =>{
        //console.log('Product added', product);
        const sameProduct = cart.find(pd => pd.key===product.key);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quanatity + 1;
            sameProduct.quanatity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart = [...others, sameProduct];
        }
        else{
            product.quanatity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);        
        addToDatabaseCart(product.key, count)
    }
    
    
    return (
        <div className="shop-container">
            
            <div className="product-container">
                {
                    products.map(pro => 
                    <Product
                    key = {pro.key} 
                    showButton = {true}
                    handleAddProduct = {handleAddProduct}
                    product = {pro}></Product>)
                }
            </div>
            
            <div className="cart-container">
                <Cart
                cart = {cart}> <Link to="/review">
                <button className="main-button">Review order</button>
                </Link>
                </Cart>

            </div>
            
        </div>
    );
};

export default Shop;