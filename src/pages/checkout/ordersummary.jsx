import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";
import { convertDollars } from "../../utils/moneyformat";
import { DeliveryOption } from "./deliveroptions";

export function OrderSummary({ cart, delivery, loadCart }) {
  const [editingItemId, setEditingItemId] = useState(null);
  const [qtyInput, setQtyInput] = useState(1);

  const cancelEdit = () => {
    setEditingItemId(null);
  };

  const startEdit = (cartItem) => {
    setEditingItemId(cartItem.productId);
    setQtyInput(cartItem.quantity);
  };

  const saveQuantity = async (productId) => {
    const quantity = Number(qtyInput);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) return;
    await axios.put(`/api/cart-items/${productId}`, { quantity });
    await loadCart();
    setEditingItemId(null);
  };

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
          const onQtyChange = (e) => {
            const val = e.target.value;

            if (val === "") { setQtyInput(""); return; }
            const n = Number(val);
            if (Number.isFinite(n)) {
              const clamped = Math.max(1, Math.min(10, Math.trunc(n)));
              setQtyInput(clamped);
            }
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
                    {editingItemId === cartItem.productId ? (
                      <>
                        <input
                          className="quantity-input"
                          type="number"
                          min="1"
                          max="10"
                          value={qtyInput}
                          onChange={onQtyChange}
                          style={{ width: 60, marginLeft: 8 }}
                        />
                        <span
                          className="link-primary"
                          style={{ marginLeft: 8 }}
                          onClick={() => saveQuantity(cartItem.productId)}
                        >
                          Save
                        </span>
                        <span
                          className="link-primary"
                          style={{ marginLeft: 8 }}
                          onClick={cancelEdit}
                        >
                          Cancel
                        </span>
                      </>
                    ) : (
                      <span
                        className="update-quantity-link link-primary"
                        onClick={() => startEdit(cartItem)}
                      >
                        Update
                      </span>
                    )}
                    <span
                      className="delete-quantity-link link-primary"
                      onClick={deleteCartItem}
                    >
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
