import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { RiDeleteBin4Line, RiAddLine, RiSubtractLine } from "react-icons/ri";

import "./CartSidebar.css";
import { toast } from "react-toastify";

function CartSidebar(props) {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState();

  useEffect(() => {
    getCart();
    getCartItems();
  }, []);

  const getCartItems = () => {
    setCartProducts([]);
    const list = reactLocalStorage.getObject("userCart");
    const userCart = list.cart;
    setCart(list.cart);
    userCart &&
      userCart.forEach((prod) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${prod.productId}`,
        }).then((response) => {
          setCartProducts((prev) => {
            return [
              ...prev,
              { product: response.data.product, quantity: prod.quantity },
            ];
          });
        });
      });
  };

  const removeFromCart = (productId) => {
    let values = [...cart];
    values = values.filter((prod) => prod.productId !== productId);
    setCart(values);
    const list = {
      cart: values,
    };

    reactLocalStorage.setObject("userCart", list);
    toast.success("Removed From Cart");
    getCartItems();
  };

  const getCart = () => {
    setCart([]);
    const items = reactLocalStorage.getObject("userCart");
    if (items.cart) {
      setCart(items.cart);
    }
  };

  const increaseQuantity = (productId, index) => {
    const val1 = [...cart];
    const index1 = cart.findIndex((prod) => prod.productId === productId);
    val1[index1].quantity = val1[index1].quantity + 1;
    reactLocalStorage.setObject("userCart", {
      cart: val1,
    });
    setCart(val1);

    const val2 = [...cartProducts];
    val2[index].quantity = val2[index].quantity + 1;
    setCartProducts(val2);
  };

  const decreaseQuantity = (productId, index) => {
    const val1 = [...cart];
    const index1 = cart.findIndex((prod) => prod.productId === productId);
    if (val1[index1].quantity > 1) {
      val1[index1].quantity = val1[index1].quantity - 1;
      reactLocalStorage.setObject("userCart", {
        cart: val1,
      });
      setCart(val1);
    } else {
      toast.error("Quantity cannot be lesser than 1");
      return;
    }

    const val2 = [...cartProducts];
    if (val2[index].quantity > 1) {
      val2[index].quantity = val2[index].quantity - 1;
      setCartProducts(val2);
    }
  };

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
                    <Col className="cart-image-col" lg={3}>
                      <img
                        src={`https://ecommerceappcj.herokuapp.com/${prod.product.image}`}
                        alt={prod.product.name}
                      />
                    </Col>
                    <Col className="cart-content-col" lg={9}>
                      <h6>{prod.product.name}</h6>
                      <p>Rs. {prod.product.price}/-</p>
                      <Row className="cart-product-card-row">
                        <Col className="cart-product-card-col" lg={2}>
                          <RiAddLine
                            onClick={() => {
                              increaseQuantity(prod.product._id, index);
                            }}
                            className="cart-quantity-button"
                          />
                        </Col>
                        <Col className="cart-product-card-col" lg={2}>
                          {prod.quantity}
                        </Col>
                        <Col className="cart-product-card-col" lg={2}>
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
        <button>PROCEED TO CHECKOUT</button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;
