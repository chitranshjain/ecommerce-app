import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./Header.css";
import {
  RiUser3Line,
  RiShoppingBagLine,
  RiSearchLine,
  RiHeart3Line,
} from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import { getAuth } from "firebase/auth";

import logo from "../../Assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import AuthModal from "./AuthModal";
import { reactLocalStorage } from "reactjs-localstorage";
import axios from "axios";
import WishlistSidebar from "./WishlistSidebar";
import CartSidebar from "./CartSidebar";

function Header() {
  const toggleNavbar = () => {
    $(".header-links-main").toggleClass("show");
  };

  const auth = getAuth();
  const [authStatus, setAuthStatus] = useState(false);
  const [authModalShow, setAuthModalShow] = useState(false);
  const [wishlistSidebarShow, setWishlistSidebarShow] = useState(false);
  const [cartSidebarShow, setCartSidebarShow] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

  useEffect(() => {
    getAuthStatus();
  }, []);

  const getAuthStatus = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthStatus(true);
        const user = reactLocalStorage.getObject("loggedInUser");
        setLoggedInUser(user.user);
      } else {
        setAuthStatus(false);
      }
    });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  const submitSearch = (event) => {
    if (event.key === "Enter") {
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <div className="header-main-div">
      <ToastContainer position="bottom-center" />
      {wishlistSidebarShow && (
        <WishlistSidebar
          show={wishlistSidebarShow}
          handleClose={() => {
            setWishlistSidebarShow(false);
          }}
        />
      )}
      {cartSidebarShow && (
        <CartSidebar
          show={cartSidebarShow}
          handleClose={() => {
            setCartSidebarShow(false);
          }}
        />
      )}
      <div className="header-parent-parent">
        <div className="header-parent-div">
          <div className="header-logo-div">
            <Link to="/">
              <div>
                <img src={logo} alt="MyShop" />
              </div>
            </Link>
            <div className="header-search-bar">
              <RiSearchLine className="icon" />
              <input
                type="text"
                name="search"
                placeholder="Search"
                value={searchQuery}
                onChange={handleChange}
                onKeyPress={submitSearch}
              />
            </div>
          </div>
          <div className="header-links-div">
            <div>
              <div onClick={toggleNavbar} className="hamburger-div"></div>
              <div className="header-links-main">
                {/* <div className="links-div category-div">
                  <p>Categories</p>
                  <div className="links-dropdown">
                    <div className="dropdown-category">Smartphones</div>
                    <div className="dropdown-category">Headphones</div>
                    <div className="dropdown-category">Laptops</div>
                  </div>
                </div> */}
                {authStatus ? (
                  loggedInUser && (
                    <div
                      onClick={() => {
                        history.push(`/user/${loggedInUser._id}`);
                      }}
                      className="link-div"
                    >
                      <RiUser3Line className="link-icon" />
                      <p>
                        {loggedInUser.name.substring(
                          0,
                          loggedInUser.name.indexOf(" ")
                        )}
                      </p>
                    </div>
                  )
                ) : (
                  <div className="link-div">
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        setAuthModalShow(true);
                      }}
                    >
                      Login
                    </button>
                  </div>
                )}
                <AuthModal
                  show={authModalShow}
                  onHide={() => {
                    setAuthModalShow(false);
                  }}
                />
                <div
                  onClick={() => {
                    setWishlistSidebarShow((prev) => !prev);
                  }}
                  className="link-div"
                >
                  <RiHeart3Line className="link-icon" />
                  <p>Wishlist</p>
                </div>
                <div
                  onClick={() => {
                    setCartSidebarShow((prev) => !prev);
                  }}
                  className="link-div"
                >
                  <RiShoppingBagLine className="link-icon" />
                  <p>Cart</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
