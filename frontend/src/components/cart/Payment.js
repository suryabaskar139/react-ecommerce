import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateShippping } from "../cart/Shipping";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { toast } from "react-toastify";
import { orderCompleted } from "../../slices/cartSlice";

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { user } = useSelector((state) => state.authState);
  const { items: cartItems, shippingInfo } = useSelector(
    (state) => state.cartState
  );
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postalCode: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
  }

  console.log("order", order);

  useEffect(() => {
    validateShippping(shippingInfo, navigate);
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      document.querySelector("#pay_btn").disabled = true;
      const { data } = await axios.post("/api/v1/payment/process", paymentData);
      const clientSecret = data.client_secret;
      const result = stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: { name: user.name, email: user.email },
        },
      });
      if (result.error) {
        toast((await result).error.message, {
          position: toast.POSITION.TOP_RIGHT,
          type:'error'
        })
        document.querySelector("#pay_btn").disabled = false;
      }
      else{
         if((await result).paymentIntent.status === 'succeeded'){
           toast('Payment Success',{
             position : toast.POSITION.TOP_RIGHT,
             type: 'success'
           })
           dispatch(orderCompleted())
           navigate('/order/success')
         }
         else{
          toast('Please try Again',{
            position : toast.POSITION.TOP_RIGHT,
            type: 'warning'
          })
         }
      }
    } catch (error) {}
  };

  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-4">Card Info</h1>
          <div className="form-group">
            <label htmlFor="card_num_field">Card Number</label>
            <CardNumberElement
              type="text"
              id="card_num_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_exp_field">Card Expiry</label>
            <CardExpiryElement
              type="text"
              id="card_exp_field"
              className="form-control"
              value=""
            />
          </div>

          <div className="form-group">
            <label htmlFor="card_cvc_field">Card CVC</label>
            <CardCvcElement
              type="text"
              id="card_cvc_field"
              className="form-control"
              value=""
            />
          </div>

          <button id="pay_btn" type="submit" className="btn btn-block py-3">
            Pay - {`$${orderInfo && orderInfo.totalPrice}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
