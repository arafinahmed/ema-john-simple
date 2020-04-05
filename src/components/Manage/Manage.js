import React from 'react';


const Manage = () => {
    const f = {test: 'test the data'};
    const addProduct = () => {
        
        fetch('https://stark-anchorage-80275.herokuapp.com/addProduct', {
            method:'POST',
            body:JSON.stringify(f),
            headers: {
               "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log('post success');
        })
    }
    return (
        <div>
            <h1>Add new product</h1>
            <button onClick={addProduct}>Add product</button>
        </div>
    );
};

export default Manage;