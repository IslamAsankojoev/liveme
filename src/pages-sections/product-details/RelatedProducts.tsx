import { FC } from "react";
import { Box, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H3 } from "components/Typography";
import Product from "models/Product.model";

// ===================================================
type RelatedProductsProps = { productsData: Product[] };
// ===================================================

const RelatedProducts: FC<RelatedProductsProps> = ({ productsData }) => {
  return (
    <Box mb={7.5}>
      <H3 mb={3}>Related Products</H3>

      <Grid container spacing={8}>
        {productsData.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <ProductCard1
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
              hoverEffect
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RelatedProducts;
