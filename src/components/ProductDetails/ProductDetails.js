import React from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {key} = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/product/'+key)
        .then(res => res.json())
        .then(data => 
            setProduct(data))
    }, [key])
    console.log(product);
    return (
        <div>
            <h1>{key}Product detail</h1>
            {
                product && 
                <Product showButton={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;