import dayjs from "dayjs";
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
                    <span className="update-quantity-link link-primary">
                      Update
                    </span>
                    <span className="delete-quantity-link link-primary">
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
