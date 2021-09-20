import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";

import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState();
  const [productsCost, setProductsCost] = useState(0);
  const [user, setUser] = useState();

  useEffect(() => {
    getCart();
    getCartItems();
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    const user = reactLocalStorage.getObject("loggedInUser");
    const currentUser = user.user;
    setUser(currentUser);
  };

  const getCartItems = () => {
    setCartProducts([]);
    const list = reactLocalStorage.getObject("userCart");
    const userCart = list.cart;
    setCart(list.cart);
    let cost = 0;
    userCart &&
      userCart.forEach((prod) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${prod.productId}`,
        }).then((response) => {
          cost += prod.quantity * parseInt(response.data.product.price);
          setProductsCost(cost);
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
    getCartItems();
    findTotalCost();
  };

  const addToWishlist = (productId) => {
    const list = reactLocalStorage.getObject("userWishlist");
    const wishlist = list.wishlist;

    const values = [...wishlist];
    values.push(productId);
    const newList = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", newList);
    removeFromCart(productId);
    toast.success("Moved To Wishlist");
  };

  const getCart = () => {
    setCart([]);
    const items = reactLocalStorage.getObject("userCart");
    if (items.cart) {
      setCart(items.cart);
    }
  };

  const findTotalCost = (products) => {
    let cost = 0;
    products &&
      products.forEach((prod) => {
        cost += prod.quantity * prod.product.price;
      });
    setProductsCost(cost);
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
    findTotalCost(val2);
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
    findTotalCost(val2);
  };

  return (
    <div className="checkout-parent-div">
      <Row className="checkout-main-row">
        <Col className="checkout-main-cols" lg={9}>
          <Card className="checkout-products-card">
            <h5>Checkout</h5>
            <hr />
            {cartProducts &&
              cartProducts.map((prod, index) => {
                return (
                  <Card className="checkout-product-card">
                    <Row className="checkout-card-row">
                      <Col className="checkout-card-image-col" lg={2}>
                        <img
                          src={`https://ecommerceappcj.herokuapp.com/${prod.product.image}`}
                          alt={prod.product.name}
                        />
                      </Col>
                      <Col className="checkout-card-content-col" lg={10}>
                        <h5>{prod.product.name}</h5>
                        <p>Cost : {prod.product.price}</p>
                        <p>Total Cost : {prod.product.price * prod.quantity}</p>
                        <Row className="checkout-product-card-row">
                          <Col className="checkout-product-card-col" lg={2}>
                            <RiAddLine
                              onClick={() => {
                                increaseQuantity(prod.product._id, index);
                              }}
                              className="checkout-quantity-button"
                            />
                          </Col>
                          <Col className="checkout-product-card-col" lg={2}>
                            {prod.quantity}
                          </Col>
                          <Col className="checkout-product-card-col" lg={2}>
                            <RiSubtractLine
                              onClick={() => {
                                decreaseQuantity(prod.product._id, index);
                              }}
                              className="checkout-quantity-button"
                            />
                          </Col>
                          <Col className="checkout-product-card-col" lg={3}>
                            <button
                              style={{ backgroundColor: "#ff9f00" }}
                              onClick={() => {
                                removeFromCart(prod.product._id);
                              }}
                            >
                              REMOVE ITEM
                            </button>
                          </Col>
                          <Col className="checkout-product-card-col" lg={3}>
                            <button
                              onClick={() => {
                                addToWishlist(prod.product._id);
                              }}
                            >
                              MOVE TO WISHLIST
                            </button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                );
              })}
            <button>PROCEED TO PAY</button>
          </Card>
        </Col>
        <Col className="checkout-main-cols" lg={3}>
          <Card className="checkout-cost-card">
            <h5>Price Details</h5>
            <hr />
            <p>Products Cost : {productsCost}</p>
            <p>Delivery Charges : FREE</p>
            <hr />
            <h5>Total cost : {productsCost}</h5>
          </Card>
          <Card className="checkout-user-card">
            {user && (
              <Row>
                <Col className="greet-image-col" lg={3}>
                  <img
                    alt="Chitransh Jain"
                    src={`https://ecommerceappcj.herokuapp.com/${user.image}`}
                  />
                </Col>
                <Col className="user-greet-col" lg={9}>
                  <h6>Chitransh Jain</h6>
                  <p>{user.address}</p>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Checkout;
