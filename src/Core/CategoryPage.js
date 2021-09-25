import React, { useEffect, useState } from "react";
import axios from "axios";

import "./CategoryPage.css";
import CategoriesSubHeader from "../Components/Shared/CategoriesSubHeader";
import { Card, Col, Row } from "react-bootstrap";
import ProductCard from "../Components/CategoryPage/ProductCard";
import SkeletonProductCard from "../Components/Home/SkeletonProductCard";
import $ from "jquery";
import { Skeleton } from "react-skeleton-generator";

function CategoryPage(props) {
  const categoryId = props.match.params.categoryId;
  const [category, setCategory] = useState();
  const skeleton = ["", "", "", "", "", "", "", "", "", "", ""];

  useEffect(() => {
    getCategory();
  }, [props]);

  useEffect(() => {
    $(document).ready(function () {
      $(this).scrollTop(0);
    });
  }, []);

  const getCategory = () => {
    setCategory();
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/categories/${categoryId}`,
    }).then((response) => {
      setCategory(response.data.category);
    });
  };

  return (
    <div className="category-page-parent-div">
      <CategoriesSubHeader />
      <div className="category-page-main">
        <Row className="category-page-row">
          <Col className="category-page-products-col" lg={12}>
            {category ? (
              <Card className="category-page-products-card">
                <h5>{category.name}</h5>
                <hr />
                <Row className="products-row">
                  {category &&
                    category.products &&
                    category.products.map((product) => {
                      return (
                        <Col lg={3} md={4} sm={6} xs={12}>
                          <ProductCard product={product} />
                        </Col>
                      );
                    })}
                </Row>
              </Card>
            ) : (
              <Skeleton.SkeletonThemeProvider>
                <Card className="category-page-products-card">
                  <h5>
                    <Skeleton width="180px" height="28px" />
                  </h5>
                  <hr />
                  <Row className="products-row">
                    {skeleton.map(() => {
                      return (
                        <Col lg={3} md={4} sm={6} xs={12}>
                          <SkeletonProductCard />
                        </Col>
                      );
                    })}
                  </Row>
                </Card>
              </Skeleton.SkeletonThemeProvider>
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CategoryPage;
