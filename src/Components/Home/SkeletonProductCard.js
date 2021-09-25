import React from "react";
import { Card } from "react-bootstrap";
import { Skeleton } from "react-skeleton-generator";

function SkeletonProductCard() {
  return (
    <Card style={{ margin: "8px 24px", border: "none" }}>
      <Skeleton.SkeletonThemeProvider>
        <Skeleton width="160px" height="100px" />
        <Skeleton
          count={1}
          widthMultiple={["90%"]}
          heightMultiple={["14px"]}
        />{" "}
      </Skeleton.SkeletonThemeProvider>
    </Card>
  );
}

export default SkeletonProductCard;
