import "./checkout.css";
import { CheckoutHeader } from "./checkout-header";
import axios from "axios";
import { useEffect, useState } from "react";
import { OrderSummary } from "./ordersummary";
import { PaymentSummary } from "./paymentsummary";
export function CheckOut({ cart ,paymentSummery,loadCart}) {
  const [delivery, setDelivery] = useState([]);
useEffect(() => {
  const fetchDelivery = async () => {
    const response = await axios.get("/api/delivery-options?expand=estimatedDeliveryTime");
    setDelivery(response.data);
  };

  fetchDelivery();
}, [cart]);

  return (
    <>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} delivery={delivery} loadCart={loadCart} />
          <PaymentSummary paymentSummery={paymentSummery} loadCart={loadCart} />
        </div>
      </div>
    </>
  );
}