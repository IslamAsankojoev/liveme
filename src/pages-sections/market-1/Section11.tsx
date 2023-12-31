import { FC } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard1 from "components/product-cards/ProductCard1";
import CategorySectionHeader from "components/CategorySectionHeader";
import Product from "models/Product.model";

// ====================================================
type Props = { moreItems: Product[] };
// ====================================================

const Section11: FC<Props> = ({ moreItems }) => {
  return (
    <Container sx={{ mb: "70px" }}>
      <CategorySectionHeader title="More For You" seeMoreLink="#" />

      <Grid container spacing={3}>
        {moreItems.map((item) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <ProductCard1
              hoverEffect
              id={Number(item.id)}
                name={item.title}
                price={item.price}
                rating={item.rating}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section11;
