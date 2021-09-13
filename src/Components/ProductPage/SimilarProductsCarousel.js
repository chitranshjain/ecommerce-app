import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeProductCard from "../Home/HomeProductCard";

import "./SimilarProductsCarousel.css";

function SimilarProductsCarousel(props) {
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    setCategory();
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/categories/${props.categoryId}`,
    }).then((response) => {
      setCategory(response.data.category);
    });
  };
  return (
    <div>
      {category && (
        <div className="similar-products-carousel-parent-div">
          <div className="products-carousel-header">
            <div>
              <h4>Similar Products</h4>
            </div>
            <div>
              <Link to={`/${props.categoryId}`}>
                <button>VIEW ALL</button>
              </Link>
            </div>
          </div>
          <hr />
          <div className="products-carousel-div">
            <Row>
              {category.products &&
                category.products.map((product, index) => {
                  if (index < 6 && product._id !== props.productId) {
                    return (
                      <Col lg={2} md={4} sm={6}>
                        <Link
                          className="product-card-link"
                          to={`/product/${product._id}`}
                        >
                          <HomeProductCard product={product} />
                        </Link>
                      </Col>
                    );
                  }
                })}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default SimilarProductsCarousel;
