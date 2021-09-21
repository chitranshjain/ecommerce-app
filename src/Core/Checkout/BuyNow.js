import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { Card, Col, Row } from "react-bootstrap";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { useHistory } from "react-router";

function BuyNow(props) {
  const [product, setProduct] = useState();
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
    getProduct();
    getUserInfo();
  }, [props]);

  const getUserInfo = () => {
    const user = reactLocalStorage.getObject("loggedInUser");
    const currentUser = user.user;
    setUser(currentUser);
  };

  const getProduct = () => {
    const productId = props.match.params.productId;
    setProduct();
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/products/product/${productId}`,
    }).then((response) => {
      setProduct(response.data.product);
      setProduct((prev) => {
        return { ...prev, quantity: 1 };
      });
    });
  };

  const increaseQuantity = () => {
    let values = { ...product };
    if (values.quantity < product.stockQuantity) {
      values.quantity++;
    } else {
      toast.error("Maximum stock quantity reached");
    }
    setProduct(values);
  };

  const decreaseQuantity = (productId, index) => {
    const values = { ...product };
    if (values.quantity > 1) {
      values.quantity--;
    } else {
      toast.error("Quantity cannot be lesser than 1");
    }

    setProduct(values);
  };

  const placeOrder = () => {
    return axios({
      method: "post",
      url: "https://ecommerce-payment-gateway.herokuapp.com/api/",
      data: {
        amount: parseInt(product.price) * parseInt(product.quantity) * 100,
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
    axios({
      method: "post",
      url: "https://ecommerceappcj.herokuapp.com/api/orders",
      data: {
        userId: user._id,
        orderAmount: product.price * product.quantity,
        status: "placed",
        orderedAt: `${day}, ${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()}`,
        shippedAt: "Not yet shipped",
        deliveredAt: "Not yet delivered",
        products: [
          {
            productId: props.match.params.productId,
            quantity: product.quantity,
            total: product.quantity * product.price,
          },
        ],
      },
    }).then(() => {
      toast.success("Order placed successfully!");
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
            // await completeBooking(response.razorpay_payment_id);
            // console.log(response.razorpay_payment_id);
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
      {product && (
        <Row className="checkout-main-row">
          <Col className="checkout-main-cols" lg={9}>
            <Card className="checkout-products-card">
              <h5>Checkout</h5>
              <hr />
              <Card className="checkout-product-card">
                <Row className="checkout-card-row">
                  <Col className="checkout-card-image-col" lg={2}>
                    <img
                      src={`https://ecommerceappcj.herokuapp.com/${product.image}`}
                      alt={product.name}
                    />
                  </Col>
                  <Col className="checkout-card-content-col" lg={10}>
                    <h5>{product.name}</h5>
                    <p>Cost : {product.price}</p>
                    <p>Total Cost : {product.price * product.quantity}</p>
                    <Row className="checkout-product-card-row">
                      <Col className="checkout-product-card-col" lg={2}>
                        <RiAddLine
                          onClick={increaseQuantity}
                          className="checkout-quantity-button"
                        />
                      </Col>
                      <Col className="checkout-product-card-col" lg={2}>
                        {product.quantity}
                      </Col>
                      <Col className="checkout-product-card-col" lg={2}>
                        <RiSubtractLine
                          onClick={decreaseQuantity}
                          className="checkout-quantity-button"
                        />
                      </Col>
                      <Col className="checkout-product-card-col" lg={3}></Col>
                      <Col className="checkout-product-card-col" lg={3}></Col>
                    </Row>
                  </Col>
                </Row>
              </Card>
              <button onClick={paymentHandler}>PROCEED TO PAY</button>
            </Card>
          </Col>
          <Col className="checkout-main-cols" lg={3}>
            <Card className="checkout-cost-card">
              <h5>Price Details</h5>
              <hr />
              <p>Products Cost : {product.price}</p>
              <p>Delivery Charges : FREE</p>
              <hr />
              <h5>Total cost : {product.price * product.quantity}</h5>
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
      )}
    </div>
  );
}

export default BuyNow;
