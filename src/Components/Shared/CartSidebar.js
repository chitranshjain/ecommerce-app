import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { RiDeleteBin4Line } from "react-icons/ri";

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
      userCart.forEach((productId) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${productId}`,
        }).then((response) => {
          setCartProducts((prev) => {
            return [...prev, response.data.product];
          });
        });
      });
  };

  const removeFromCart = (productId) => {
    let values = [...cart];
    values = values.filter((prod) => prod !== productId);
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

  return (
    <Offcanvas
      className="wishlist-canvas"
      show={props.show}
      onHide={props.handleClose}
      placement="end"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="wishlist-canvas-title">
          Cart
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="wishlist-offcanvas-body">
        {cartProducts &&
          cartProducts.map((product) => {
            return (
              <Card className="wishlist-product-card">
                <Row className="wishlist-row">
                  <Col className="wishlist-image-col" lg={3}>
                    <img
                      src={`https://ecommerceappcj.herokuapp.com/${product.image}`}
                      alt={product.name}
                    />
                  </Col>
                  <Col className="wishlist-content-col" lg={9}>
                    <h6>{product.name}</h6>
                    <p>Rs. {product.price}/-</p>
                    <button>Add to Cart</button>
                    <RiDeleteBin4Line
                      onClick={() => {
                        removeFromCart(product._id);
                      }}
                      className="wishlist-delete-icon"
                    />
                  </Col>
                </Row>
              </Card>
            );
          })}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default CartSidebar;
