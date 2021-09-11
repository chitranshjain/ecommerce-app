import React from "react";
import $ from "jquery";
import "./Header.css";
import { RiUser3Line, RiShoppingBagLine } from "react-icons/ri";

import logo from "../../Assets/logo.png";

function Header() {
  const toggleNavbar = () => {
    $(".header-links-main").toggleClass("show");
  };

  return (
    <div className="header-main-div">
      <div className="header-parent-parent">
        <div className="header-parent-div">
          <div className="header-logo-div">
            <div>
              <img src={logo} alt="MyShop" />
            </div>
          </div>
          <div className="header-links-div">
            <div>
              <div onClick={toggleNavbar} className="hamburger-div"></div>
              <div className="header-links-main">
                <div className="link-div active">
                  <p>Home</p>
                </div>
                <div className="links-div category-div">
                  <p>Categories</p>
                  <div className="links-dropdown">
                    <div className="dropdown-category">Smartphones</div>
                    <div className="dropdown-category">Headphones</div>
                    <div className="dropdown-category">Laptops</div>
                  </div>
                </div>
                <div className="link-div">
                  <RiUser3Line className="link-icon" />
                </div>
                <div className="link-div">
                  <RiShoppingBagLine className="link-icon" />
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
