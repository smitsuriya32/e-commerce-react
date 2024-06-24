// CheckoutModal.js
import React, { useContext, useState } from "react";
import styles from "./Checkout.module.css";
import { Context } from "../../main";
import { useDispatch } from "react-redux";
import { clearCart } from "../../Redux/Reducers/cartSlice";

const CheckoutModal = ({ totalPrice, onClose }) => {
  const { user } = useContext(Context);
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: `${user.name}`,
    address: `${user.address}`,
    paymentDetails: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    dispatch(clearCart());
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContent}>
        {!isSubmitted ? (
          <>
            <h2>Checkout</h2>
            <form onSubmit={handleSubmit}>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
              />
              <input
                name="paymentDetails"
                value={formData.paymentDetails}
                onChange={handleChange}
                placeholder="Payment Details"
              />
              <button className={styles.ckoutBtn} type="submit">
                Checkout - ${totalPrice}
              </button>
              <button onClick={onClose}>Close</button>
            </form>
          </>
        ) : (
          <>
            <p className={styles.successMessage}>Order placed successfully.</p>
            <div className={styles.centerButton}>
              <button onClick={onClose}>Close</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
