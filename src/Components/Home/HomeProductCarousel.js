import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";

import "./HomeProductCarousel.css";

function HomeProductCarousel() {
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories();
    axios({
      method: "get",
      url: "https://ecommerceappcj.herokuapp.com/api/categories",
    }).then((response) => {
      setCategories(response.data.categories);
    });
  };

  return (
    <div>
      {categories &&
        categories.map((category) => {
          return (
            <div className="home-products-carousel-parent-div">
              <div className="products-carousel-header">
                <div>
                  <h4>{category.name}</h4>
                </div>
                <div>
                  <button>VIEW ALL</button>
                </div>
              </div>
              <hr />
              <div className="products-carousel-div">
                <Row>
                  {category.products &&
                    category.products.map((product, index) => {
                      if (index < 6) {
                        return (
                          <Col lg={2}>
                            <Card className="home-product-card">
                              <img
                                src={`https://ecommerceappcj.herokuapp.com/${product.image}`}
                                alt={product.name}
                              />
                              <h6>{product.name}</h6>
                              <p>From Rs. {product.price} /-</p>
                            </Card>
                          </Col>
                        );
                      } else {
                        return <div></div>;
                      }
                    })}
                </Row>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default HomeProductCarousel;
