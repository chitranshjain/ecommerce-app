import React from "react";
import $ from "jquery";
import "./Header.css";
import {
  RiUser3Line,
  RiShoppingBagLine,
  RiSearchLine,
  RiHeart3Line,
} from "react-icons/ri";

import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

function Header() {
  const toggleNavbar = () => {
    $(".header-links-main").toggleClass("show");
  };

  return (
    <div className="header-main-div">
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
              <input type="text" name="search" placeholder="Search" />
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
                <div className="link-div">
                  <RiUser3Line className="link-icon" />
                  <p>Chitransh</p>
                </div>
                <div className="link-div">
                  <RiHeart3Line className="link-icon" />
                  <p>Wishlist</p>
                </div>
                <div className="link-div">
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
