import React from 'react';
import ReactDOM from 'react-dom';
import {loadStripe} from '@stripe/stripe-js';

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { useState } from 'react';

const CheckoutForm = (props) => {
     const [perror, setPerror] = useState(null);
     const [payment, setPayment] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if(error){
        setPerror(error.message);
        setPayment(null);
    }
    else{
        setPayment(paymentMethod);
        const data = {id: paymentMethod.id, last4: paymentMethod.last4};
        setPerror(null);
        props.orderConfirm(data);
        
    }
    console.log('stripe integrated', error, paymentMethod);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {
          perror && <p style={{color:'red'}}> {perror}</p>
      }
      {
          payment && <p style={{color:'green'}}>Payment Successful</p>
      }
    </form>
  );
};

export default CheckoutForm;