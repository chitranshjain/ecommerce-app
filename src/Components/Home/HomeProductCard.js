import React from "react";
import { Card } from "react-bootstrap";
import "./HomeProductCard.css";

function HomeProductCard(props) {
  return (
    <Card className="home-product-card">
      <img
        src={`https://ecommerceappcj.herokuapp.com/${props.product.image}`}
        alt={props.product.name}
      />
      <h6>{props.product.name}</h6>
      <p>From Rs. {props.product.price} /-</p>
    </Card>
  );
}

export default HomeProductCard;
