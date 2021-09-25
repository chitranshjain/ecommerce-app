import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import $ from "jquery";

import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  const getOrders = () => {
    const user = reactLocalStorage.getObject("loggedInUser");
    const userId = user.user._id;
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/orders/${userId}`,
    }).then((response) => {
      setOrders(response.data.orders);
    });
  };

  return (
    <div className="orders-parent-div">
      <Card>
        {orders &&
          orders.map((order) => {
            return (
              <Card className="order-card">
                <Row className="order-card-row">
                  <Col lg={6} sm={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Order ID{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order._id}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} sm={12} xs={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Order Date{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order.orderedAt}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="order-card-row">
                  <Col lg={6} sm={12} xs={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Shipping Date{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order.shippedAt}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} sm={12} xs={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Delivery Date{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order.deliveredAt}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="order-card-row">
                  <Col lg={6} sm={12} xs={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Order Amount{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order.orderAmount}
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={6} sm={12} xs={12}>
                    <Row className="order-details-row">
                      <Col lg={6} md={6} sm={6} xs={6}>
                        Order Status{" "}
                      </Col>
                      <Col lg={6} md={6} sm={6} xs={6}>
                        {order.status === "placed"
                          ? "Placed"
                          : order.status === "shipped"
                          ? "Shipped"
                          : order.status === "delivered"
                          ? "Delivered"
                          : "Cancelled"}
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <hr />

                <Row className="order-card-product-row">
                  <Col lg={9} md={6} sm={9} xs={9}>
                    <p>
                      <strong>Product Name</strong>
                    </p>
                  </Col>
                  <Col lg={1} md={2} sm={3} xs={3}>
                    <p>
                      <strong>Quantity</strong>
                    </p>
                  </Col>
                  <Col
                    className="hidden-sm hidden-xs"
                    lg={1}
                    md={2}
                    sm={0}
                    xs={0}
                  >
                    <p>
                      <strong>Price</strong>
                    </p>
                  </Col>
                  <Col
                    className="hidden-sm hidden-xs"
                    lg={1}
                    md={2}
                    sm={0}
                    xs={0}
                  >
                    <p>
                      <strong>Total Cost</strong>
                    </p>
                  </Col>
                </Row>
                {order.products &&
                  order.products.map((prod) => {
                    return (
                      <Row className="order-card-product-row">
                        <Col lg={9} md={6} sm={9} xs={9}>
                          <p>{prod.productId.name}</p>
                        </Col>
                        <Col lg={1} md={2} sm={3} xs={3}>
                          <p>{prod.quantity}</p>
                        </Col>
                        <Col
                          className="hidden-sm hidden-xs"
                          lg={1}
                          md={2}
                          sm={0}
                          xs={0}
                        >
                          <p>Rs. {prod.productId.price}</p>
                        </Col>
                        <Col
                          className="hidden-sm hidden-xs"
                          lg={1}
                          md={2}
                          sm={0}
                          xs={0}
                        >
                          <p>Rs. {prod.total}</p>
                        </Col>
                      </Row>
                    );
                  })}
              </Card>
            );
          })}
      </Card>
    </div>
  );
}

export default Orders;
