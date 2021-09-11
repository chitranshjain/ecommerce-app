import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

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
              <Card className="home-category-card">
                <img
                  src={`https://ecommerceappcj.herokuapp.com/${category.image}`}
                  alt={category.name}
                />
                <p>{category.name}</p>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default HomeCategories;
