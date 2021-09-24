import React, { useContext } from "react";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import { RiDeleteBin4Line, RiAddLine, RiSubtractLine } from "react-icons/ri";

import "./CartSidebar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";

function CartSidebar(props) {
  const { cartProducts, removeFromCart, increaseQuantity, decreaseQuantity } =
    useContext(AuthContext);

  return (
    <Offcanvas
      className="cart-canvas"
      show={props.show}
      onHide={props.handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="cart-canvas-title">Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="cart-offcanvas-body">
        <div className="cart-items-list">
          {cartProducts &&
            cartProducts.map((prod, index) => {
              return (
                <Card className="cart-product-card">
                  <Row className="cart-row">
                    <Col className="cart-image-col" lg={3} md={3} sm={3} xs={3}>
                      <img
                        src={`https://ecommerceappcj.herokuapp.com/${prod.product.image}`}
                        alt={prod.product.name}
                      />
                    </Col>
                    <Col className="cart-content-col" lg={9} md={9} sm={9} xs={9}>
                      <h6>{prod.product.name}</h6>
                      <p>Rs. {prod.product.price}/-</p>
                      <Row className="cart-product-card-row">
                        <Col className="cart-product-card-col" lg={2} md={2} sm={2} xs={2}>
                          <RiAddLine
                            onClick={() => {
                              increaseQuantity(prod.product._id, index);
                            }}
                            className="cart-quantity-button"
                          />
                        </Col>
                        <Col className="cart-product-card-col" lg={2} md={2} sm={2} xs={2}>
                          {prod.quantity}
                        </Col>
                        <Col className="cart-product-card-col" lg={2} md={2} sm={2} xs={2}>
                          <RiSubtractLine
                            onClick={() => {
                              decreaseQuantity(prod.product._id, index);
                            }}
                            className="cart-quantity-button"
                          />
                        </Col>
                      </Row>
                      <RiDeleteBin4Line
                        onClick={() => {
                          removeFromCart(prod.product._id);
                        }}
                        className="cart-delete-icon"
                      />
                    </Col>
                  </Row>
                </Card>
              );
            })}
        </div>
        <Link onClick={props.handleClose} to="/checkout">
          <button>PROCEED TO CHECKOUT</button>
        </Link>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;
