import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Offcanvas, Row } from "react-bootstrap";
import { reactLocalStorage } from "reactjs-localstorage";
import { RiDeleteBin4Line } from "react-icons/ri";

import "./WishlistSidebar.css";
import { toast } from "react-toastify";

function WishlistSidebar(props) {
  const [wishlist, setWishlist] = useState();
  const [cart, setCart] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState();

  useEffect(() => {
    getWishlist();
    getCart();
  }, []);

  const getWishlist = () => {
    setWishlistProducts([]);
    const list = reactLocalStorage.getObject("userWishlist");
    const userWishlist = list.wishlist;
    setWishlist(list.wishlist);
    userWishlist &&
      userWishlist.forEach((productId) => {
        axios({
          method: "get",
          url: `https://ecommerceappcj.herokuapp.com/api/products/product/${productId}`,
        }).then((response) => {
          setWishlistProducts((prev) => {
            return [...prev, response.data.product];
          });
        });
      });
  };

  const removeFromWishlist = (productId) => {
    let values = [...wishlist];
    values = values.filter((prod) => prod !== productId);
    setWishlist(values);
    const list = {
      wishlist: values,
    };

    reactLocalStorage.setObject("userWishlist", list);
    getWishlist();
  };

  const getCart = () => {
    setCart([]);
    const items = reactLocalStorage.getObject("userCart");
    if (items.cart) {
      setCart(items.cart);
    }
  };

  const addToCart = (productId) => {
    setCart((prev) => {
      removeFromWishlist(productId);
      return [...prev, { productId, quantity: 1 }];
    });

    const values = [...cart];
    values.push({ productId, quantity: 1 });
    const list = {
      cart: values,
    };

    toast.success("Added To Cart");

    reactLocalStorage.setObject("userCart", list);
  };

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
                  <Col className="wishlist-image-col" lg={3}>
                    <img
                      src={`https://ecommerceappcj.herokuapp.com/${product.image}`}
                      alt={product.name}
                    />
                  </Col>
                  <Col className="wishlist-content-col" lg={9}>
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
