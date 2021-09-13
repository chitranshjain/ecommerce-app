import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./ProductCard.css";

function ProductCard(props) {
  return (
    <Link className="product-card-link" to={`/product/${props.product._id}`}>
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
            {props.product.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            /-
          </span>
        </p>
      </Card>
    </Link>
  );
}

export default ProductCard;
