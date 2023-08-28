import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Box, Container, Grid, styled } from "@mui/material";
import BazaarCard from "components/BazaarCard";
import CategoryIcon from "components/icons/Category";
import CategorySectionHeader from "components/CategorySectionHeader";
import Category from "models/Category.model";
import { Paragraph } from "components/Typography";

const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  gap: 8,
  display: "flex",
  borderRadius: 8,
  padding: "0.75rem",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": { boxShadow: theme.shadows[3] },
  [theme.breakpoints.down(375)]: { flexDirection: "column" },
}));

// ============================================================
type Props = { categories: Category[] };
// ============================================================

const Section10: FC<Props> = ({ categories }) => {
  return (
    <Container sx={{ mb: "70px" }}>
      <CategorySectionHeader
        seeMoreLink="#"
        title="Categories"
        icon={<CategoryIcon color="primary" />}
      />

      <Grid container spacing={3}>
        {categories.map((item, ind) => (
          <Grid item lg={2} md={3} sm={4} xs={6} key={ind}>
            <Link href={`/product/search/${item.slug}`}>
              <StyledBazaarCard elevation={1}>
                <Image width={52} height={52} alt="fashion" src={item.image} />
                <Paragraph fontWeight="600">{item.name}</Paragraph>
              </StyledBazaarCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section10;
