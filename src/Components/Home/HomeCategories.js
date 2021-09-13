import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import CategoryCard from "./CategoryCard";

import "./HomeCategories.css";

function HomeCategories() {
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
    <div className="category-cards-parent-div">
      <div className="category-cards-div">
        {categories &&
          categories.map((category) => {
            return (
              <Link to={`/${category.id}`}>
                <CategoryCard category={category} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default HomeCategories;
