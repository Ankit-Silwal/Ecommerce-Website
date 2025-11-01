import dayjs from "dayjs";
import axios from "axios";
import { convertDollars } from "../../../public/moneyformat";
import { DeliveryOption } from "./deliveroptions";

export function OrderSummary({ cart, delivery, loadCart }) {
  return (
    <div className="order-summary">
      {delivery.length > 0 &&
        cart.map((cartItem) => {
          const selectedDeliveryOption = delivery.find((deliveryOption) => {
            return deliveryOption.id == cartItem.deliveryOptionId;
          });
          const deleteCartItem = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`);
            await loadCart();
          };
          const updateQuantity = async () => {
            const input = window.prompt(
              "Enter new quantity (1-10):",
              String(cartItem.quantity)
            );
            if (input === null) return;
            const quantity = Number(input);
            if (!Number.isInteger(quantity) || quantity < 1) return;
            await axios.put(`/api/cart-items/${cartItem.productId}`, {
              quantity,
            });
            await loadCart();
          };
          return (
            <div key={cartItem.productId} className="cart-item-container">
              <div className="delivery-date">
                Delivery date:{" "}
                {selectedDeliveryOption &&
                  dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format(
                    "dddd, MMMM D"
                  )}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image" src={`/${cartItem.product.image}`} alt={cartItem.product.name} />

                <div className="cart-item-details">
                  <div className="product-name">{cartItem.product.name}</div>
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
                    <span className="update-quantity-link link-primary" onClick={updateQuantity}>
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}>
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOption delivery={delivery} cartItem={cartItem} loadCart={loadCart} />
              </div>
            </div>
          );
        })}
    </div>
  );
}
