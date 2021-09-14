import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HomeProductCard.css";

function HomeProductCard(props) {
  return (
    <Link className="product-card-link" to={`/product/${props.product._id}`}>
      <Card className="home-product-card">
        <img
          src={`https://ecommerceappcj.herokuapp.com/${props.product.image}`}
          alt={props.product.name}
        />
        <h6>{props.product.name}</h6>
        <p>From Rs. {props.product.price} /-</p>
      </Card>
    </Link>
  );
}

export default HomeProductCard;
