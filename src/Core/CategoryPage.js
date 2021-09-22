import React, { useEffect, useState } from "react";
import axios from "axios";

import "./CategoryPage.css";
import CategoriesSubHeader from "../Components/Shared/CategoriesSubHeader";
import { Card, Col, Form, Row } from "react-bootstrap";
import ProductCard from "../Components/CategoryPage/ProductCard";

function CategoryPage(props) {
  const categoryId = props.match.params.categoryId;
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategory();
  }, [props]);

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
          {/* <Col className="category-page-filters-col" lg={2}>
            <Card className="category-page-filters-card">
              <h4>Filters</h4>
              <hr />
              <h5>Price</h5>
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="< 10000"
              />
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="10000-25000"
              />
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="25000-50000"
              />
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="50000-100000"
              />
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="> 100000"
              />
              <hr />
              <h5>Sort By</h5>
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="Price - High To Low"
              />
              <Form.Check
                className="filters-checkbox"
                type="checkbox"
                label="Price - Low To High"
              />
            </Card>
          </Col> */}
          <Col className="category-page-products-col" lg={12}>
            {category && (
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
            )}
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CategoryPage;
