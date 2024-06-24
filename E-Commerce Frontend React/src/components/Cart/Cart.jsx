// Updated Cart component with list-like structure, total price, and checkout button

import React, { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCartItems,
  addToCart,
  removeFromCart,
} from "../../Redux/Reducers/cartSlice";
import styles from "./Cart.module.css";
import CheckoutModal from "../Checkout/Checkout";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Cart = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartStatus = useSelector((state) => state.cart.status);
  const cartError = useSelector((state) => state.cart.error);
  const [showModal, setShowModal] = useState(false);

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleAddToCart = (productId) => {
    dispatch(addToCart(productId));
  };

  const handleCheckout = () => {
    // Here you can integrate actual payment logic
    setShowModal(true);
    // Reset or handle cart after successful payment
  };

  if (cartStatus === "loading") {
    return <div>Loading...</div>;
  }

  if (cartStatus === "failed") {
    return <div>Error: {cartError}</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      <ul className={styles.cartList}>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <li key={item.productId._id} className={styles.cartItem}>
              <img
                src={item.productId.image.url}
                alt={item.productId.name}
                className={styles.itemImage}
              />
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>{item.productId.name}</p>
                <p className={styles.itemDescription}>
                  {item.productId.description}
                </p>
                <p className={styles.itemPrice}>${item.productId.price}</p>
                <div className={styles.quantityControls}>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId._id)}
                    className={styles.quantityButton}
                  >
                    -
                  </button>
                  <span className={styles.quantity}>{item.quantity}</span>
                  <button
                    onClick={() => handleAddToCart(item.productId._id)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
      <div className={styles.checkoutSection}>
        <p className={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</p>
        <button
          onClick={() => setIsCheckoutModalOpen(true)}
          className={styles.checkoutButton}
        >
          Checkout
        </button>
        {isCheckoutModalOpen && (
          <CheckoutModal
            totalPrice={totalPrice}
            onClose={() => setIsCheckoutModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
