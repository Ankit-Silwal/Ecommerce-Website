import "./orders.css";
import { OrdersHeader } from "./orders_header";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { convertDollars } from "../../../public/moneyformat";
import dayjs from "dayjs";
export function Orders({ paymentSummary }) {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders?expand=products").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <>
      <OrdersHeader paymentSummary={paymentSummary} />
      <div className="orders-page">
        <div className="page-title">Your Orders</div>
        {orders.length === 0 && (
          <div
            style={{ textAlign: "center", padding: "40px 20px", color: "#666" }}
          >
            <p>No orders found. Start shopping!</p>
          </div>
        )}

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div className="order-container">
                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format("MMMM D")}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{convertDollars(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">
                  {order.products.map((orderProduct) => {
                    return (
                      <Fragment key={orderProduct.productId}>
                        <div className="product-image-container">
                          <img src={orderProduct.product.image} alt={orderProduct.name} />
                        </div>

                        <div className="product-details">
                          <div className="product-name">
                            {orderProduct.product.name}
                          </div>
                          <div className="product-delivery-date">
                            Arriving on: {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM D')}
                          </div>
                          <div className="product-quantity">Quantity: {orderProduct.quantity}</div>
                          <button className="buy-again-button button-primary">
                            <img
                              className="buy-again-icon"
                              src="/images/icons/buy-again.png"
                            />
                            <span className="buy-again-message">
                              Add to Cart
                            </span>
                          </button>
                        </div>

                        <div className="product-actions">
                          <Link to="/tracking">
                            <button className="track-package-button button-secondary">
                              Track package
                            </button>
                          </Link>
                        </div>
                      </Fragment>
                    );
                  })}

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
