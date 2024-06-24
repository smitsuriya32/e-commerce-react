import React, { useContext, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      // console.log(user);
      const response = await axios.get(
        "http://localhost:5000/api/v1/users/logout",
        { withCredentials: true }
      );
      // console.log(response);
      toast.success(response.data.message);
      setIsAuthorized(false);
      localStorage.clear();
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  return (
    <>
      <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
        <div className="container">
          <div className="logo">
            <img src="JobZee-logos__white.png" alt="logo" />
          </div>
          <ul className={!show ? "menu" : "show-menu menu"}>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to={"/products"} onClick={() => setShow(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link to={"/cart"} onClick={() => setShow(false)}>
                Cart
              </Link>
            </li>
            <li>
              <Link to={"/contact"} onClick={() => setShow(false)}>
                Contact
              </Link>
            </li>
            ) : (<></>)<button onClick={handleLogout}>Logout</button>
          </ul>
          <div className="hamburger">
            <GiHamburgerMenu onClick={() => setShow(!show)} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
