import React, { useContext } from "react";
import styles from "./Contact.module.css";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";

const Contact = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Contact Us</h1>
      <div className={styles.info}>
        <h2>Smit Suriya</h2>
        <p>I am a Software Developer</p>
        <p>📞 +91 6353924547</p>
        <p>✉ smitsuriya3203@gmail.com</p>
      </div>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" className={styles.input} />
        <input type="email" placeholder="Your Email" className={styles.input} />
        <textarea
          placeholder="Your Message"
          className={styles.input}
        ></textarea>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Contact;
