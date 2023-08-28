import { FC } from "react";
import { Button, Grid, styled } from "@mui/material";
import { Paragraph } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
import ProductCard13 from "components/product-cards/ProductCard13";
import CategorySectionCreator from "components/CategorySectionCreator";
import Product from "models/Product.model";

const SubTitle = styled(Paragraph)(({ theme }) => ({
  fontSize: 12,
  marginTop: "-20px",
  marginBottom: "20px",
  color: theme.palette.grey[600],
}));

// ========================================================
type AllProductsProps = { products: Product[]; title?: string };
// ========================================================

const AllProducts: FC<AllProductsProps> = ({
  products,
  title = "All Products",
}) => {
  return (
    <CategorySectionCreator title={title} seeMoreLink="#">
      <SubTitle>Best collection in 2021 for you!</SubTitle>

      <Grid container spacing={3}>
        {products.map((item) => (
          <Grid key={item.id} item md={4} sm={6} xs={12}>
            <ProductCard13
              id={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
            />
          </Grid>
        ))}
      </Grid>

      <FlexRowCenter mt={6}>
        <Button variant="contained" color="primary" sx={{ fontSize: 13 }}>
          Load More...
        </Button>
      </FlexRowCenter>
    </CategorySectionCreator>
  );
};

export default AllProducts;
