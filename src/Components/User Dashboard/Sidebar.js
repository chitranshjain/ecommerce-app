import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosWallet, IoIosPower } from "react-icons/io";
import { Card, Col, Row } from "react-bootstrap";

import "./Sidebar.css";

function Sidebar() {
  return (
    <Col lg={3}>
      <Card className="dashboard-greet-card">
        <Row>
          <Col className="greet-image-col" lg={3}>
            <img
              alt="Chitransh Jain"
              src={`https://ecommerceappcj.herokuapp.com/uploads/images/user/27e69b4c-d899-4536-9a2e-a1ceb8b7b1dd.jpeg`}
            />
          </Col>
          <Col className="user-greet-col" lg={9}>
            <p>Hello,</p>
            <h6>Chitransh Jain</h6>
          </Col>
        </Row>
      </Card>
      <Card className="dashboard-actions-card">
        <Row className="dashboard-action-row">
          <Col className="action-icon-col" lg={3}>
            <FaUserAlt className="action-icon" />
          </Col>
          <Col className="action-text-col" lg={9}>
            <h5>Account Settings</h5>
          </Col>
        </Row>
        <hr />
        <Row className="dashboard-action-row">
          <Col className="action-icon-col" lg={3}>
            <IoIosWallet className="action-icon" />
          </Col>
          <Col className="action-text-col" lg={9}>
            <h5>My Orders</h5>
          </Col>
        </Row>
        <hr />
        <Row className="dashboard-action-row">
          <Col className="action-icon-col" lg={3}>
            <IoIosPower className="action-icon" />
          </Col>
          <Col className="action-text-col" lg={9}>
            <h5>Log Out</h5>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}

export default Sidebar;
