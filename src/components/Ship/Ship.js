import React from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Ship = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => { 
        //TODO: MOVE AFTER PAYMENT
        console.log(auth.user.email);
        const savedCart = getDatabaseCart();
        const order = {email: auth.user.email, cart: savedCart};
        
        fetch('http://localhost:4000/placeorder', {
            method:'POST',
            body:JSON.stringify(order),
            headers: {
               "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log('success', data);
            alert('Successfully placed your order');
            processOrder();
        })
    }

    const auth = useAuth();

    return (

        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

            <input name="name" defaultValue={auth.user.name} placeholder="Name" ref={register({ required: true })} />
            {errors.name && <span className="error">Name field is required</span>}

            <input name="email" defaultValue={auth.user.email} placeholder="Email" ref={register({ required: true })} />
            {errors.email && <span className="error">Email field is required</span>}

            <input name="Add1" placeholder="Address" ref={register({ required: true })} />
            {errors.Add1 && <span className="error">Address 1  field is required</span>}

            <input name="Add2" placeholder="Address" ref={register} />
            <input name="city" placeholder="City" ref={register({ required: true })} />
            {errors.city && <span className="error">City field is required</span>}
            <input name="country" placeholder="Country" ref={register({ required: true })} />
            {errors.country && <span className="error">Country field is required</span>}
            <input name="ZipCode" placeholder="Zip Code" ref={register({ required: true })} />
            {errors.ZipCode && <span className="error">Zip code field is required</span>}

            <input type="submit" />
        </form>
    )
};

export default Ship;