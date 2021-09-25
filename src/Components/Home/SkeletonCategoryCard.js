import React from "react";
import { Card } from "react-bootstrap";
import { Skeleton } from "react-skeleton-generator";

function SkeletonCategoryCard() {
  return (
    <Card style={{margin: "8px 24px", border: "none"}}>
      <Skeleton.SkeletonThemeProvider>
        <Skeleton width="80px" height="80px" />
        <Skeleton
          count={1}
          widthMultiple={["100%"]}
          heightMultiple={["14px"]}
        />{" "}
      </Skeleton.SkeletonThemeProvider>
    </Card>
  );
}

export default SkeletonCategoryCard;
