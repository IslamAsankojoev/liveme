import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Grid, styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import { H3, H5, Tiny } from "components/Typography";
import Category from "models/Category.model";

// styled component
const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  gap: "1rem",
  height: "100%",
  display: "flex",
  padding: "1.5rem",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    textAlign: "center",
    flexDirection: "column",
  },
}));

// ===========================================================
type Props = { categories: Category[] };
// ===========================================================

const Section3: FC<Props> = ({ categories = [] }) => {
  return (
    <Box>
      <H3 fontSize={25} mb={3}>
        Shop By Category
      </H3>

      <Grid container spacing={3}>
        {categories.map((item) => (
          <Grid item lg={4} xs={6} key={item.id}>
            <Link href={`/product/search/${item.slug}`}>
              <StyledBazaarCard hoverEffect>
                <Image
                  width={46}
                  height={46}
                  alt={item.name}
                  src={item.image}
                />

                <Box>
                  <Tiny color="primary.main">{item.description}</Tiny>
                  <H5>{item.name}</H5>
                </Box>
              </StyledBazaarCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Section3;
