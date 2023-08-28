import { FC } from "react";
import { Container, Grid, useTheme } from "@mui/material";
import { BannerCard1 } from "components/banners";

const Section2: FC = () => {
  const { direction } = useTheme();

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <BannerCard1
            url="/shop"
            title="Aroma"
            subTitle="Starting At $29"
            img="/assets/images/banners/aroma.jpg"
            sx={{ borderRadius: 0 }}
          />
        </Grid>

        <Grid item md={6} xs={12}>
          <BannerCard1
            url="/shop"
            subTitle="25% Off"
            title="Parfume"
            img="/assets/images/banners/parfume.jpg"
            sx={{ borderRadius: 0 }}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Section2;
