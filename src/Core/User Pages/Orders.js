import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";

import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrders();
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
                  <Col>
                    <Row className="order-details-row">
                      <Col>Order ID </Col>
                      <Col>{order._id}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="order-details-row">
                      <Col>Order Date </Col>
                      <Col>{order.orderedAt}</Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="order-card-row">
                  <Col>
                    <Row className="order-details-row">
                      <Col>Shipping Date </Col>
                      <Col>{order.shippedAt}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="order-details-row">
                      <Col>Delivery Date </Col>
                      <Col>{order.deliveredAt}</Col>
                    </Row>
                  </Col>
                </Row>
                <Row className="order-card-row">
                  <Col>
                    <Row className="order-details-row">
                      <Col>Order Amount </Col>
                      <Col>{order.orderAmount}</Col>
                    </Row>
                  </Col>
                  <Col>
                    <Row className="order-details-row">
                      <Col>Order Status </Col>
                      <Col>
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
                  <Col lg={9}>
                    <p>
                      <strong>Product Name</strong>
                    </p>
                  </Col>
                  <Col lg={1}>
                    <p>
                      <strong>Quantity</strong>
                    </p>
                  </Col>
                  <Col lg={1}>
                    <p>
                      <strong>Price</strong>
                    </p>
                  </Col>
                  <Col lg={1}>
                    <p>
                      <strong>Total Cost</strong>
                    </p>
                  </Col>
                </Row>
                {order.products &&
                  order.products.map((prod) => {
                    return (
                      <Row className="order-card-product-row">
                        <Col lg={9}>
                          <p>{prod.productId.name}</p>
                        </Col>
                        <Col lg={1}>
                          <p>{prod.quantity}</p>
                        </Col>
                        <Col lg={1}>
                          <p>Rs. {prod.productId.price}</p>
                        </Col>
                        <Col lg={1}>
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
