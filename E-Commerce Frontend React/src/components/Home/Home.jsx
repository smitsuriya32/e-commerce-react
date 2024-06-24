import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Your S'Mart Cart</h1>
      <p className={styles.description}>
        Discover the best products at unbeatable prices. From the latest
        electronics to stylish apparel, we have everything you need to make your
        shopping experience extraordinary.
      </p>
      <p className={styles.description}>
        Enjoy seamless shopping with our user-friendly interface and secure
        checkout process. Whether you're shopping for yourself or looking for
        the perfect gift, you'll find it here.
      </p>
      <p className={styles.description}>
        Join our community of satisfied customers and start exploring today.
        Happy shopping!
      </p>
    </div>
  );
};

export default Home;
