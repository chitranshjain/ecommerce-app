import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { reactLocalStorage } from "reactjs-localstorage";
import { Card, Col, Row } from "react-bootstrap";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";

function BuyNow(props) {
  const [product, setProduct] = useState();
  const [user, setUser] = useState();

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
              <button>PROCEED TO PAY</button>
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
