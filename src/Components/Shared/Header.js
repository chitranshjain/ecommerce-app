import React, { useEffect, useState, useContext } from "react";
import $ from "jquery";
import "./Header.css";
import {
  RiUser3Line,
  RiShoppingBagLine,
  RiSearchLine,
  RiHeart3Line,
} from "react-icons/ri";
import { ToastContainer } from "react-toastify";

import logo from "../../Assets/logo.png";
import { Link, useHistory } from "react-router-dom";
import AuthModal from "./AuthModal";
import WishlistSidebar from "./WishlistSidebar";
import CartSidebar from "./CartSidebar";
import { AuthContext } from "../../Contexts/AuthContext";

function Header() {
  const { authStatus, userDetails } = useContext(AuthContext);
  const [authModalShow, setAuthModalShow] = useState(false);
  const [wishlistSidebarShow, setWishlistSidebarShow] = useState(false);
  const [cartSidebarShow, setCartSidebarShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();

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
              <div className="header-links-main">
                {authStatus ? (
                  userDetails && (
                    <div
                      onClick={() => {
                        history.push(`/user/${userDetails.id}`);
                      }}
                      className="link-div"
                    >
                      <RiUser3Line className="link-icon" />
                      <p>{userDetails.fname}</p>
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
