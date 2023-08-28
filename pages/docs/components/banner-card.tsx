import { Box, Container, Grid, useTheme } from "@mui/material";
import Code from "components/Code";
import { H1, H4, Paragraph, Span } from "components/Typography";
import { BannerCard1, BannerCard2, BannerCard3 } from "components/banners";
import { NavLink3 } from "components/nav-link";
import DocsLayout from "components/layouts/DocsLayout";

const BannerCard = () => {
  const { direction } = useTheme();

  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Banner Card</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/banners</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <BannerCard1
              url="#"
              title="For Men's"
              subTitle="Starting At $29"
              img="/assets/images/banners/men's-fashion.jpg"
              contentPosition={direction === "rtl" ? "right" : "left"}
            />
          </Grid>

          <Grid item lg={4} md={6} xs={12}>
            <BannerCard2
              url="#"
              text3="Sale"
              text2="Black Friday"
              text1="Up to 20% Off"
              img="/assets/images/banners/banner2.jpg"
            />
          </Grid>

          <Grid item lg={4} md={6} xs={12}>
            <BannerCard3
              img="/assets/images/banners/banner-18.jpg"
              sx={{ height: "100%" }}
            >
              <Paragraph fontSize={13} letterSpacing={1.2}>
                NEW ARRIVALS
              </Paragraph>

              <H4 fontSize={20} lineHeight={1} my={2}>
                SKI CLOTHES SALE
                <br />
                <Span fontWeight={400} color="primary.main">
                  Up to 35% Off
                </Span>
              </H4>

              <NavLink3
                href="#"
                text="Shop Now"
                color="dark.main"
                hoverColor="dark.main"
              />
            </BannerCard3>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default BannerCard;
