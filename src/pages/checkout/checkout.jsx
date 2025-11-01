import "./checkout.css";
import { convertDollars } from "../../../public/moneyformat";
import { CheckoutHeader } from "./checkout-header";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
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
          <div className="order-summary">
            {delivery.length > 0 && cart.map((cartItem) => {
              const selectedDeliveryOption = delivery.find((deliveryOption) => {
                return deliveryOption.id == cartItem.deliveryOptionId;
              });
              return (
                <div key={cartItem.productId} className="cart-item-container">
                  <div className="delivery-date">
                    Delivery date: {selectedDeliveryOption &&
                      dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs)
                        .format('dddd, MMMM D')
                    }
                  </div>

                  <div className="cart-item-details-grid">
                    <img
                      className="product-image"
                      src={cartItem.product.image}
                    />

                    <div className="cart-item-details">
                      <div className="product-name">
                        {cartItem.product.name}
                      </div>
                      <div className="product-price">
                        {convertDollars(cartItem.product.priceCents)}
                      </div>
                      <div className="product-quantity">
                        <span>
                          Quantity:{" "}
                          <span className="quantity-label">
                            {cartItem.quantity}
                          </span>
                        </span>
                        <span className="update-quantity-link link-primary">
                          Update
                        </span>
                        <span className="delete-quantity-link link-primary">
                          Delete
                        </span>
                      </div>
                    </div>

                    <div className="delivery-options">
                      <div className="delivery-options-title">
                        Choose a delivery option:
                      </div>
                      {delivery.map((deliveryOption) => {
                        let priceString = "FREE Shipping";
                        if (deliveryOption.priceCents > 0) {
                          priceString = `${convertDollars(
                            deliveryOption.priceCents
                          )}-Shipping`;
                        }
                        return (
                          <div
                            key={deliveryOption.id}
                            className="delivery-option"
                          >
                            <input
                              type="radio"
                              checked={deliveryOption.id == cartItem.deliveryOptionId}
                              className="delivery-option-input"
                              name={`delivery-option-${cartItem.productId}`}
                            />
                            <div>
                              <div className="delivery-option-date">
                                {dayjs(
                                  deliveryOption.estimatedDeliveryTimeMs
                                ).format("dddd, MMMM D")}
                              </div>
                              <div className="delivery-option-price">
                                {priceString}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="payment-summary">
            <div className="payment-summary-title">Payment Summary</div>
            {paymentSummery && (
              <>
                <div className="payment-summary-row">
                <div>Items ({paymentSummery.totalItems})</div>
                <div className="payment-summary-money">{convertDollars(paymentSummery.productCostCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Shipping &amp; handling:</div>
                <div className="payment-summary-money">{convertDollars(paymentSummery.shippingCostCents)}</div>
              </div>

              <div className="payment-summary-row subtotal-row">
                <div>Total before tax:</div>
                <div className="payment-summary-money">{convertDollars(paymentSummery.totalCostBeforeTaxCents)}</div>
              </div>

              <div className="payment-summary-row">
                <div>Estimated tax (10%):</div>
                <div className="payment-summary-money">{convertDollars(paymentSummery.taxCents)}</div>
              </div>

              <div className="payment-summary-row total-row">
                <div>Order total:</div>
                <div className="payment-summary-money">{convertDollars(paymentSummery.totalCostCents)}</div>
              </div>

              <button className="place-order-button button-primary">
                Place your order
              </button>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}