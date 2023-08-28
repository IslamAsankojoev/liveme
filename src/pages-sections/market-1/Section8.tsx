import { FC } from "react";
import Link from "next/link";
import LazyImage from "components/LazyImage";
import { Container, Grid } from "@mui/material";

const Section8: FC = () => {
  return (
    <Container sx={{ mb: "70px" }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Link href="/">
            <LazyImage
              width={385}
              height={342}
              alt="banner"
              src="/assets/images/banners/banner-1.png"
            />
          </Link>
        </Grid>

        <Grid item xs={12} md={8}>
          <Link href="/">
            <LazyImage
              width={790}
              height={342}
              alt="banner"
              src="/assets/images/banners/banner-2.png"
            />
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Section8;
