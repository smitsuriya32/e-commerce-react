import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import styles from "./ProductDetails.module.css";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigateTo = useNavigate();
  const { isAuthorized, user, token } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  if (!isAuthorized) {
    navigateTo("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/products/getProductById/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProduct(res.data.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error.res.data.message);
      });
  }, []);

  const addToCart = async (productId) => {
    try {
      let bearer_token = `Bearer ${token}`;
      const response = await axios.post(
        `http://127.0.0.1:5000/api/v1/cart/addToCart`,
        { productId, userId: user._id },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            authorization: bearer_token,
          },
        }
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Error adding product to cart");
    }
  };

  return (
    <section className={styles.productDetailSection}>
      <div className={styles.productDetailContainer}>
        <h3>Product Details</h3>
        <div className={styles.productDetailBanner}>
          <img
            src={product.image?.url}
            alt={product.name}
            className={styles.productDetailImage}
          />
          <p className={styles.productDetailTitle}>
            Title: <span> {product.name}</span>
          </p>
          <p className={styles.productDetailDescription}>
            Description: <span>{product.description}</span>
          </p>
          <p className={styles.productDetailPrice}>
            Price: <span>{product.price}</span>
          </p>
          <button
            onClick={() => addToCart(product._id)}
            className={styles.productDetailAddToCartBtn}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
