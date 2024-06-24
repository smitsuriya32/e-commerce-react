import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Products.module.css";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../Redux/Reducers/cartSlice";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { isAuthorized, user, token } = useContext(Context);
  const navigateTo = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:5000/api/v1/products/getAllProducts", {
          withCredentials: true,
        })
        .then((res) => {
          setProducts(res.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const cartAdd = async (productId) => {
    // try {
    //   let bearer_token = `Bearer ${token}`;
    //   // console.log("Bearer token:", bearer_token);
    //   const response = await axios.post(
    //     `http://127.0.0.1:5000/api/v1/cart/addToCart`,
    //     { productId, userId: user._id },
    //     {
    //       withCredentials: true,
    //       headers: {
    //         "Content-Type": "application/json",
    //         authorization: bearer_token,
    //       },
    //     }
    //   );
    //   // console.log(response.data.message);
    //   // console.log("Product added to cart:", response.data);
    //   toast.success(response.data.message);
    // } catch (error) {
    //   console.error("Error adding product to cart:", error);
    //   toast.error("Error adding product to cart");
    // }
    dispatch(addToCart(productId));
  };

  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className={styles.jobs}>
      <div className="container">
        <h1 style={{ color: "grey" }}>Products</h1>
        <div className={styles.banner}>
          {products &&
            products.map((element) => (
              <div className={styles.card} key={element._id}>
                <img
                  src={element.image.url}
                  alt={element.name}
                  className={styles.image}
                />
                <div className={styles.cardContent}>
                  <p className={styles.name}>{element.name}</p>
                  <p className={styles.description}>{element.description}</p>
                  <p className={styles.price}>${element.price}</p>
                  <button
                    onClick={() => cartAdd(element._id)}
                    className={styles.button}
                  >
                    Add To Cart
                  </button>
                  <Link
                    className={styles.prodDetailsBtn}
                    to={`/product/${element._id}`}
                  >
                    Product Details
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
