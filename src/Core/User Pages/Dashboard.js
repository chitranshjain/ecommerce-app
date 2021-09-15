import React from "react";
import { Col, Row } from "react-bootstrap";
import CategoriesSubHeader from "../../Components/Shared/CategoriesSubHeader";

import "./Dashboard.css";
import Sidebar from "../../Components/User Dashboard/Sidebar";

function Dashboard(props) {
  return (
    <div className="dashboard-parent-div">
      <CategoriesSubHeader />
      <Row className="dashboard-parent-row">
        <Sidebar />
        <Col lg={9}></Col>
      </Row>
    </div>
  );
}

export default Dashboard;
