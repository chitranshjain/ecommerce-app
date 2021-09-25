import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";

import "./Checkout.css";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState();
  const [productsCost, setProductsCost] = useState(0);
  const [user, setUser] = useState();
  const history = useHistory();
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    getCart();
    getCartItems();
    getUserInfo();
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
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

  const placeOrder = () => {
    return axios({
      method: "post",
      url: "https://ecommerce-payment-gateway.herokuapp.com/api/",
      data: {
        amount: productsCost * 100,
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.data.order;
      } else {
        toast.error("Payment failed");
      }
    });
  };

  const storeOrder = () => {
    let date = new Date();
    const day = weekday[date.getDay()];
    const orderProducts = [];
    cartProducts.forEach((prod) => {
      orderProducts.push({
        productId: prod.product._id,
        quantity: prod.quantity,
        total: prod.quantity * prod.product.price,
      });
    });
    axios({
      method: "post",
      url: "https://ecommerceappcj.herokuapp.com/api/orders",
      data: {
        userId: user._id,
        orderAmount: productsCost,
        status: "placed",
        orderedAt: `${day}, ${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()}`,
        shippedAt: "Not yet shipped",
        deliveredAt: "Not yet delivered",
        products: orderProducts,
      },
    }).then(() => {
      toast.success("Order placed successfully!");
      reactLocalStorage.setObject("userCart", { cart: [] });
      history.push("/");
    });
  };

  const paymentHandler = async () => {
    const getToken = () => {
      placeOrder().then((data) => {
        const options = {
          key: "rzp_test_4ejoQixs8cAUSa",
          name: "MERN Ecommerce",
          description: "Thank You for shopping with us.",
          currency: "INR",
          order_id: data.id,
          handler: async (response) => {
            storeOrder();
          },
          theme: {
            color: "#f1bc19",
          },
        };
        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      });
    };

    await getToken();
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
                      <Col
                        className="checkout-card-image-col"
                        lg={2}
                        md={2}
                        sm={3}
                        xs={3}
                      >
                        <img
                          src={`https://ecommerceappcj.herokuapp.com/${prod.product.image}`}
                          alt={prod.product.name}
                        />
                      </Col>
                      <Col
                        className="checkout-card-content-col"
                        lg={10}
                        md={10}
                        sm={9}
                        xs={9}
                      >
                        <h5>{prod.product.name}</h5>
                        <p>Cost : {prod.product.price}</p>
                        <p>Total Cost : {prod.product.price * prod.quantity}</p>
                        <Row className="checkout-product-card-row">
                          <Col
                            className="checkout-product-card-col"
                            lg={2}
                            md={4}
                            sm={4}
                            xs={4}
                          >
                            <RiAddLine
                              onClick={() => {
                                increaseQuantity(prod.product._id, index);
                              }}
                              className="checkout-quantity-button"
                            />
                          </Col>
                          <Col
                            className="checkout-product-card-col"
                            lg={2}
                            md={4}
                            sm={4}
                            xs={4}
                          >
                            {prod.quantity}
                          </Col>
                          <Col
                            className="checkout-product-card-col"
                            lg={2}
                            md={4}
                            sm={4}
                            xs={4}
                          >
                            <RiSubtractLine
                              onClick={() => {
                                decreaseQuantity(prod.product._id, index);
                              }}
                              className="checkout-quantity-button"
                            />
                          </Col>
                          <Col
                            className="checkout-product-card-col"
                            lg={3}
                            md={6}
                            sm={6}
                            xs={6}
                          >
                            <button
                              style={{ backgroundColor: "#ff9f00" }}
                              onClick={() => {
                                removeFromCart(prod.product._id);
                              }}
                            >
                              REMOVE ITEM
                            </button>
                          </Col>
                          <Col
                            className="checkout-product-card-col"
                            lg={3}
                            md={6}
                            sm={6}
                            xs={6}
                          >
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
            {cartProducts.length > 0 && (
              <button onClick={paymentHandler}>PROCEED TO PAY</button>
            )}
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
