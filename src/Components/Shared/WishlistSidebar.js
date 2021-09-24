import React, { useContext } from "react";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import { RiDeleteBin4Line } from "react-icons/ri";
import { AuthContext } from "../../Contexts/AuthContext";

import "./WishlistSidebar.css";

function WishlistSidebar(props) {
  const { wishlistProducts, addToCart, removeFromWishlist } =
    useContext(AuthContext);

  return (
    <Offcanvas
      className="wishlist-canvas"
      show={props.show}
      onHide={props.handleClose}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="wishlist-canvas-title">
          Wishlist
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="wishlist-offcanvas-body">
        {wishlistProducts &&
          wishlistProducts.map((product) => {
            return (
              <Card className="wishlist-product-card">
                <Row className="wishlist-row">
                  <Col className="wishlist-image-col" lg={3} md={3} sm={3} xs={3}>
                    <img
                      src={`https://ecommerceappcj.herokuapp.com/${product.image}`}
                      alt={product.name}
                    />
                  </Col>
                  <Col className="wishlist-content-col" lg={9} md={9} sm={9} xs={9}>
                    <h6>{product.name}</h6>
                    <p>Rs. {product.price}/-</p>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        addToCart(product._id);
                      }}
                    >
                      Add to Cart
                    </button>
                    <RiDeleteBin4Line
                      onClick={(event) => {
                        event.preventDefault();
                        removeFromWishlist(product._id);
                      }}
                      className="wishlist-delete-icon"
                    />
                  </Col>
                </Row>
              </Card>
            );
          })}
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default WishlistSidebar;
