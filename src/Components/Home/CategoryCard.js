import React from "react";
import { Card } from "react-bootstrap";
import "./CategoryCard.css";

function CategoryCard(props) {
  return (
    <Card className="home-category-card">
      <img
        src={`https://ecommerceappcj.herokuapp.com/${props.category.image}`}
        alt={props.category.name}
      />
      <p>{props.category.name}</p>
    </Card>
  );
}

export default CategoryCard;
