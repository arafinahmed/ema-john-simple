import React from 'react';
import { useForm } from 'react-hook-form';
import './Ship.css'
import { useAuth } from '../Login/useAuth';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { useState } from 'react';




const Ship = () => {
    const { register, handleSubmit, errors } = useForm();
    const [shipmentAdded, setShipmentAdded] = useState(null);
    const [orderId, setOrderId] = useState(null);
    const stripePromise = loadStripe('pk_test_Up5ZVvGDaufTuBqaaMMgtc3000FbsXBZ7I');
    const onSubmit = data => {
        setShipmentAdded(data);
        
    }
    const orderConfirm = (paymentMethod) => {
        //TODO: MOVE AFTER PAYMENT
        console.log(auth.user.email);
        const savedCart = getDatabaseCart();
        const order = { email: auth.user.email, cart: savedCart, shipment: shipmentAdded,
        paymentMethod: paymentMethod };

        fetch('https://stark-anchorage-80275.herokuapp.com/placeorder', {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => res.json())
            .then(order => {
                console.log('success', order);
                setOrderId(order._id);                
                //alert('Successfully placed your order');
                processOrder();
            })

    }

    const auth = useAuth();

    return (

        <div className="side">
            <div style={{display:shipmentAdded &&'none'}} className="ship-form">
                <form  onSubmit={handleSubmit(onSubmit)}>
                    <h3>Shipment Information</h3>
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
                </form></div>
                <div style={{display:shipmentAdded ? 'block': 'none'}} className="ship-form">
                <h3>Payment Information</h3>
                <Elements stripe={stripePromise}>
                    <CheckoutForm orderConfirm={orderConfirm}></CheckoutForm>
                </Elements>
                <div>
                    {
                        orderId && <h3>Order Success {orderId}</h3>
                    }
                </div>
            </div>
        </div>
    )
};

export default Ship;