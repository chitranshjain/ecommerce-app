import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { AiFillThunderbolt } from "react-icons/ai";

import "./ProductMainCard.css";

function ProductMainCard(props) {
  return (
    <Card className="product-page-card">
      <Row className="product-page-row">
        <Col className="product-image-col" lg={4}>
          <div className="product-image-div">
            <img
              src={`https://ecommerceappcj.herokuapp.com/${props.product.image}`}
              alt={props.product.name}
            />
          </div>
          <Row>
            <Col className="product-page-button-col cart-btn">
              <button>
                <RiShoppingCart2Fill className="icon" />
                ADD TO CART
              </button>
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
