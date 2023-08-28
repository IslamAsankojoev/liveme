import { FC } from "react";
import Link from "next/link";
import { Box, Container, Grid } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import RankBadge from "components/icons/RankBadge";
import DottedStar from "components/icons/DottedStar";
import ProductCard4 from "components/product-cards/ProductCard4";
import ProductCard5 from "components/product-cards/ProductCard5";
import CategorySectionHeader from "components/CategorySectionHeader";
import Brand from "models/Brand.model";
import Product from "models/Product.model";

// =================================================================
type Props = { topRatedBrands: Brand[]; topRatedList: Product[] };
// =================================================================

const Section4: FC<Props> = ({ topRatedBrands, topRatedList }) => {
  return (
    <Box mb={7.5}>
      <Container>
        <Grid container spacing={4}>
          {/* TOP RATINGS AREA */}
          <Grid item lg={6} xs={12}>
            <CategorySectionHeader
              icon={<RankBadge />}
              title="Top Ratings"
              seeMoreLink="#"
            />

            <BazaarCard sx={{ p: 2 }}>
              <Grid container spacing={4}>
                {topRatedList.map((item) => (
                  <Grid item md={3} sm={6} xs={6} key={item.title}>
                    <Link href={`/product/${item.slug}`}>
                      <ProductCard4
                        title={item.title}
                        price={item.price}
                        rating={item.rating}
                        imgUrl={item.thumbnail}
                        reviewCount={item.reviews.length}
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </BazaarCard>
          </Grid>

          {/* FEATURED BRANDS AREA */}
          <Grid item lg={6} xs={12}>
            <CategorySectionHeader
              icon={<DottedStar />}
              title="Featured Brands"
              seeMoreLink="#"
            />

            <BazaarCard sx={{ p: 2 }}>
              <Grid container spacing={3}>
                {topRatedBrands.map(({ id, name, image, slug }) => (
                  <Grid item sm={6} xs={12} key={id}>
                    <Link href={`/product/search/${slug}`}>
                      <ProductCard5 title={name} imgUrl={image} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </BazaarCard>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Section4;
