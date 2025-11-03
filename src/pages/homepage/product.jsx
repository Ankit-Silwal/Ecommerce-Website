import { useState, useRef, useEffect } from "react";
import { convertDollars } from "../../utils/moneyformat";
import axios from "axios";

export function Product({ product, loadCart }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const hideAddedTimeoutRef = useRef(null);

  const changeQuantity = (e) => {
    const quantitySelected = Number(e.target.value);
    setQuantity(quantitySelected);
  };

  const addToCart = async () => {
    if (isAdding) return;
    setIsAdding(true);
    try {
      await axios.post("/api/cart-items", {
        productId: product.id,
        quantity,
      });

      await loadCart();

      setIsAdded(true);
      if (hideAddedTimeoutRef.current) {
        clearTimeout(hideAddedTimeoutRef.current);
      }
      hideAddedTimeoutRef.current = setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    } finally {
      setIsAdding(false);
    }
  };

  useEffect(() => {
    return () => {
      if (hideAddedTimeoutRef.current) {
        clearTimeout(hideAddedTimeoutRef.current);
      }
    };
  }, []);
  return (
    <div className="product-container">
      <div className="product-image-container">
        <img className="product-image" data-testid="product-image" src={`/${product.image}`} alt={product.name} />
      </div>

      <div className="product-name limit-text-to-2-lines">{product.name}</div>

      <div className="product-rating-container">
        <img
          className="product-rating-stars" data-testid="product-rating-stars-image"
          src={`/images/ratings/rating-${Math.round(
            product.rating.stars * 10
          )}.png`}
          alt={`${product.rating.stars} stars`}
        />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">{convertDollars(product.priceCents)}</div>

      <div className="product-quantity-container">
        <select value={quantity} onChange={changeQuantity}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div className="product-spacer"></div>
      {isAdded && (
        <div 
        className="added-to-cart" 
        aria-live="polite" 
        style={{opacity:isAdded?1:0}}
        >
          <img src="/images/icons/checkmark.png" alt="" />
          Added
        </div>
      )}
      <button
        className="add-to-cart-button button-primary" data-testid="add-to-cart-button"
        onClick={addToCart}
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
