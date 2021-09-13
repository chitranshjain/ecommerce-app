import React from "react";
import { Card } from "react-bootstrap";

import "./ProductCard.css";

function ProductCard(props) {
  return (
    <Card className="product-card">
      <img
        src={`https://ecommerceappcj.herokuapp.com/${props.product.image}`}
        alt={props.product.name}
      />
      <h6>{props.product.name}</h6>
      <p>{props.product.description.substring(0, 40)}...</p>
      <p className="product-cost">
        Starts from{" "}
        <span>
          Rs.{" "}
          {props.product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          /-
        </span>
      </p>
    </Card>
  );
}

export default ProductCard;
