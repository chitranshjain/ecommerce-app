import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./CategoriesSubHeader.css";

function CategoriesSubHeader() {
  const [categories, setCategories] = useState([]);

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
    <div className="category-subheader-parent-div">
      <div className="category-subheader-div">
        {categories &&
          categories.map((category) => {
            return (
              <Link to={`/${category.id}`}>
                <Card className="subheader-category-card">
                  <p>{category.name}</p>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default CategoriesSubHeader;
