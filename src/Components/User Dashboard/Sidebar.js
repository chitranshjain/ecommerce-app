import React from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoIosWallet, IoIosPower } from "react-icons/io";
import { Card, Col, Row } from "react-bootstrap";
import { getAuth, signOut } from "@firebase/auth";

import "./Sidebar.css";
import { reactLocalStorage } from "reactjs-localstorage";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

function Sidebar() {
  const auth = getAuth();
  const history = useHistory();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        reactLocalStorage.remove("loggedInUser");
        toast.success("Successfully logged out");
        history.push("/");
      })
      .catch(() => {
        toast.error("An error occurred. Please try again");
      });
  };

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
        <Row onClick={logOut} className="dashboard-action-row">
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
