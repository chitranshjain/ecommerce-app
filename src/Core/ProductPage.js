import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductMainCard from "../Components/ProductPage/ProductMainCard";
import SimilarProductsCarousel from "../Components/ProductPage/SimilarProductsCarousel";

import CategoriesSubHeader from "../Components/Shared/CategoriesSubHeader";
import "./ProductPage.css";

function ProductPage(props) {
  const [product, setProduct] = useState();
  const productId = props.match.params.productId;

  useEffect(() => {
    getProduct();
  }, [props]);

  const getProduct = () => {
    setProduct();
    axios({
      method: "get",
      url: `https://ecommerceappcj.herokuapp.com/api/products/product/${productId}`,
    }).then((response) => {
      setProduct(response.data.product);
      console.log(response.data.product);
    });
  };

  return (
    <div>
      <CategoriesSubHeader />
      <div className="product-page-parent-div">
        {product && <ProductMainCard product={product} />}
        {product && (
          <SimilarProductsCarousel
            productId={productId}
            categoryId={product.category}
          />
        )}
      </div>
    </div>
  );
}

export default ProductPage;
