import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const PaymentForm = () => {
  const cardElementOptions = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#F7A14C",
        color: "#000",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#fce883" },
        "::placeholder": { color: "#F7A14C" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const stripe = useStripe();
  const element = useElements();
  const [amount, setAmount] = useState(0);

  const handlePay = async (e) => {
    e.preventDefault();
    const { token, error } = await stripe.createToken(
      element.getElement(CardElement)
    );
    if (error) {
      console.log("Error at payment: ", error);
    } else {
      console.log("Token: ", token);
      try {
        await axios.post(
          "https://swdprojectapi.azurewebsites.net/api/payments",
          {
            amount: amount,
            stripeToken: token.id,
          }
        );
        console.log("Success");
        toast.success("Thanh toán thành công");
      } catch (error) {
        console.log("Error at Payment: ", error);
        if (error.message == "Your card is not supported.") {
          toast.error("Thẻ không được hỗ trợ");
        }
        if (error.message == "Your postal code is incomplete.") {
          toast.error("Vui lòng nhập đầy đủ thông tin");
        }
      }
    }
  };

  console.log(amount);

  return (
    <>
      <form onSubmit={handlePay}>
        <CardElement options={cardElementOptions} />
        <input type="text" onChange={(e) => setAmount(e.target.value)} />
        <button className="py-4 bg-blue-400 rounded-lg px-7">Pay</button>
      </form>
    </>
  );
};

export default PaymentForm;
