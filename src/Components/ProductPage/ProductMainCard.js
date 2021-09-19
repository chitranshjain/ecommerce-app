import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import "./ProductMainCard.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";

function ProductMainCard(props) {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    getWishlist();
    getCart();
  }, []);

  const getWishlist = () => {
    setWishlist([]);
    const wish = reactLocalStorage.getObject("userWishlist");
    if (wish.wishlist) {
      setWishlist(wish.wishlist);
    }
  };

  const addToWishlist = () => {
    setWishlist((prev) => {
      return [...prev, props.product._id];
    });

    const values = [...wishlist];
    values.push(props.product._id);
    const list = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", list);
    toast.success("Added To Wishlist");
  };

  const removeFromWishlist = () => {
    let values = [...wishlist];
    values = values.filter((prod) => prod !== props.product._id);
    setWishlist(values);
    const list = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", list);
    toast.success("Removed From Wishlist");
  };

  const getCart = () => {
    setCart([]);
    const items = reactLocalStorage.getObject("userCart");
    if (items.cart) {
      setCart(items.cart);
    }
  };

  const addToCart = () => {
    setCart((prev) => {
      return [...prev, props.product._id];
    });

    const values = [...cart];
    values.push(props.product._id);
    const list = {
      cart: values,
    };

    toast.success("Added To Cart");
    reactLocalStorage.setObject("userCart", list);
  };

  const removeFromCart = () => {
    let values = [...cart];
    values = values.filter((prod) => prod !== props.product._id);
    setCart(values);
    const list = {
      cart: values,
    };

    toast.success("Removed From Cart");
    reactLocalStorage.setObject("userCart", list);
  };

  return (
    <Card className="product-page-card">
      <Row className="product-page-row">
        <Col className="product-image-col" lg={4}>
          <div className="product-image-div">
            {wishlist &&
            wishlist.length > 0 &&
            wishlist.find((prod) => prod === props.product._id) ? (
              <BsHeartFill
                onClick={removeFromWishlist}
                className="liked-icon wishlist-icon"
              />
            ) : (
              <BsHeart
                onClick={addToWishlist}
                className="unliked-icon wishlist-icon"
              />
            )}
            <img
              src={`https://ecommerceappcj.herokuapp.com/${props.product.image}`}
              alt={props.product.name}
            />
          </div>
          <Row>
            <Col className="product-page-button-col cart-btn">
              {cart &&
              cart.length > 0 &&
              cart.find((prod) => prod === props.product._id) ? (
                <button onClick={removeFromCart}>
                  <RiShoppingCart2Fill className="icon" />
                  REMOVE FROM CART
                </button>
              ) : (
                <button onClick={addToCart}>
                  <RiShoppingCart2Fill className="icon" />
                  ADD TO CART
                </button>
              )}
            </Col>
            <Col className="product-page-button-col buy-btn">
              <button>
                <AiFillThunderbolt className="icon" /> BUY NOW
              </button>
            </Col>
          </Row>
        </Col>
        <Col className="product-desc-col" lg={8}>
          <h4>{props.product.name}</h4>
          <div className="price-div">
            <h3>
              Rs.{" "}
              {props.product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              /-
            </h3>
            <p>
              Rs.
              {(props.product.price + 1000)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </p>
            <p>{((1000 / props.product.price) * 100).toFixed(0)}% off</p>
          </div>
          <Row className="product-desc-row">
            <Col lg={2}>
              <p>Description</p>
            </Col>
            <Col lg={10}>
              <p>{props.product.description}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}

export default ProductMainCard;
