import "./checkout.css";
import { CheckoutHeader } from "./checkout-header";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderSummary } from "./ordersummary";
import { PaymentSummary } from "./paymentsummary";
export function CheckOut({ cart ,paymentSummery}) {
  const [delivery, setDelivery] = useState([]);
  useEffect(() => {
    axios
      .get("/api/delivery-options?expand=estimatedDeliveryTime")
      .then((response) => {
        setDelivery(response.data);
      })}, []);
  return (
    <>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} delivery={delivery} />
          <PaymentSummary paymentSummery={paymentSummery}/>
        </div>
      </div>
    </>
  );
}