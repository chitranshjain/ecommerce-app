import React from "react";
import { Col, Row } from "react-bootstrap";

import "./Footer.css";

function Footer() {
  return (
    <div className="footer-parent-div">
      <Row>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>ABOUT</h4>
          <p>About Us</p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>Stores</p>
          <p>MyShop Wholesale</p>
          <p>Press</p>
          <p>Corporate Information</p>
        </Col>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>HELP</h4>
          <p>Payments</p>
          <p>Shipping</p>
          <p>Cancellation & Returns</p>
          <p>FAQ</p>
          <p>Report Infringement</p>
        </Col>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>POLICY</h4>
          <p>Return Policy</p>
          <p>Terms Of Use</p>
          <p>Security</p>
          <p>Privacy</p>
          <p>Sitemap</p>
          <p>EPR Compliance</p>
        </Col>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>SOCIAL</h4>
          <p>Facebook</p>
          <p>Instagram</p>
          <p>Twitter</p>
        </Col>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>Mail Us</h4>
          <p>
            Flipkart Internet Private Limited, <br />
            Buildings Alyssa, <br />
            Begonia & Clove Embassy <br />
            Tech Village, <br />
            Outer Ring Road, Devarabeesanahalli <br />
            Village, Bengaluru, 560103, <br />
            Karnataka, India
          </p>
        </Col>
        <Col className="footer-col" lg={2} md={4} sm={6}>
          <h4>Registered Office Address</h4>
          <p>
            Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove
            Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village,
            Bengaluru, 560103, Karnataka, India <br />
            CIN : U51109KA2012PTC066107 <br />
            Telephone: 1800 202 9898
          </p>
        </Col>
      </Row>
      <hr />
      <center>
        <p>© {new Date().getFullYear()}, MyShop Inc. </p>
      </center>
    </div>
  );
}

export default Footer;
