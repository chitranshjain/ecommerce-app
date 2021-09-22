import React, { useContext } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsHeart, BsHeartFill } from "react-icons/bs";

import "./ProductMainCard.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

function ProductMainCard(props) {
  const {
    wishlist,
    cart,
    addToWishlist,
    removeFromWishlist,
    addToCart,
    removeFromCart,
  } = useContext(AuthContext);

  return (
    <Card className="product-page-card">
      <Row className="product-page-row">
        <Col className="product-image-col" lg={4}>
          <div className="product-image-div">
            {wishlist &&
            wishlist.length > 0 &&
            wishlist.find((prod) => prod === props.product._id) ? (
              <BsHeartFill
                onClick={(e) => {
                  e.preventDefault();
                  removeFromWishlist(props.product._id);
                }}
                className="liked-icon wishlist-icon"
              />
            ) : (
              <BsHeart
                onClick={(e) => {
                  e.preventDefault();
                  addToWishlist(props.product._id);
                }}
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
              cart.find((prod) => prod.productId === props.product._id) ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(props.product._id);
                  }}
                >
                  <RiShoppingCart2Fill className="icon" />
                  REMOVE FROM CART
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(props.product._id);
                  }}
                >
                  <RiShoppingCart2Fill className="icon" />
                  ADD TO CART
                </button>
              )}
            </Col>
            <Col className="product-page-button-col buy-btn">
              <button>
                <Link
                  className="dummy-link"
                  to={`/checkout/${props.product._id}`}
                >
                  <AiFillThunderbolt className="icon" /> BUY NOW
                </Link>
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
