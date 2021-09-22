import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ProductCard from "../Components/CategoryPage/ProductCard";

import "./SearchPage.css";

function SearchPage(props) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchQuery = props.match.params.query;

  useEffect(() => {
    getProducts();
  }, [props]);

  const getProducts = () => {
    axios({
      method: "get",
      url: "https://ecommerceappcj.herokuapp.com/api/products/",
    }).then((response) => {
      filterProducts(response.data.products);
    });
  };

  const filterProducts = (products) => {
    if (searchQuery === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts([]);
      const query = searchQuery.toLowerCase();
      products.forEach((product) => {
        const name = product.name.toLowerCase();
        if (name.includes(query)) {
          setFilteredProducts((prev) => {
            return [...prev, product];
          });
        }
      });
    }
  };

  return (
    <div className="search-parent-div">
      <Card>
        <Row className="products-row">
          {filteredProducts &&
            filteredProducts.map((product) => {
              return (
                <Col lg={3}>
                  <ProductCard product={product} />
                </Col>
              );
            })}
        </Row>
      </Card>
    </div>
  );
}

export default SearchPage;
