import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Skeleton } from "react-skeleton-generator";
import HomeProductCard from "./HomeProductCard";

import "./HomeProductCarousel.css";
import SkeletonProductCard from "./SkeletonProductCard";

function HomeProductCarousel() {
  const [categories, setCategories] = useState();
  const skeleton = ["", "", "", "", "", ""];

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
      {categories
        ? categories.map((category) => {
            return (
              <div className="home-products-carousel-parent-div">
                <div className="products-carousel-header">
                  <div>
                    <h4>{category.name}</h4>
                  </div>
                  <div>
                    <Link to={`/${category.id}`}>
                      <button>VIEW ALL</button>
                    </Link>
                  </div>
                </div>
                <hr />
                <div className="products-carousel-div">
                  <Row>
                    {category.products &&
                      category.products.map((product, index) => {
                        if (index < 6) {
                          return (
                            <Col lg={2} md={4} sm={6}>
                              <HomeProductCard product={product} />
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
          })
        : skeleton.map(() => {
            return (
              <Skeleton.SkeletonThemeProvider>
                <div className="home-products-carousel-parent-div">
                  <div className="products-carousel-header">
                    <div>
                      <Skeleton width="160px" height="30px" borderRadius="0%" />
                    </div>
                    <div>
                      <Skeleton width="100px" height="40px" borderRadius="0%" />
                    </div>
                  </div>
                  <hr />
                  <div className="products-carousel-div">
                    <Row>
                      {skeleton.map(() => {
                        return (
                          <Col lg={2} md={4} sm={6}>
                            <SkeletonProductCard />
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                </div>
              </Skeleton.SkeletonThemeProvider>
            );
          })}
    </div>
  );
}

export default HomeProductCarousel;
