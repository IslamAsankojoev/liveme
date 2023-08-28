import { Box, Container, Grid, Paper } from "@mui/material";
import Code from "components/Code";
import { H1, Paragraph } from "components/Typography";
import { CarouselCard1 } from "components/carousel-cards";
import Carousel from "components/carousel/Carousel";
import DocsLayout from "components/layouts/DocsLayout";
import ProductCard3 from "components/product-cards/ProductCard3";
import { useCallback, useEffect, useState } from "react";
import api from "utils/__api__/fashion-shop";

const carouselData = [
  {
    title: "Fashionable Collection",
    imgUrl: "/assets/images/products/bag.png",
    description: "Get Free Shipping on all orders over $99.00",
    buttonText: "Shop Now",
    buttonLik: "#",
  },
  {
    title: "Fashionable Collection",
    imgUrl: "/assets/images/products/nike-black.png",
    description: "Get Free Shipping on all orders over $99.00",
    buttonText: "Shop Now",
    buttonLik: "#",
  },
];

const CarouselPage = () => {
  const [products, setProducts] = useState([]);

  const fetchData = useCallback(async () => {
    const products = await api.getFlashDeals();
    setProducts(products);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Carousel</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/carousel</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, p: 2 }}>
              <Carousel
                spacing="0px"
                totalSlides={2}
                infinite={true}
                showDots={true}
                autoPlay={false}
                visibleSlides={1}
                showArrow={false}
              >
                {carouselData.map((item, ind) => (
                  <CarouselCard1
                    key={ind}
                    buttonColor="dark"
                    title={item.title}
                    imgUrl={item.imgUrl}
                    buttonLik={item.buttonLik}
                    buttonText={item.buttonText}
                    description={item.description}
                  />
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, p: 2 }}>
              <Carousel
                infinite={true}
                visibleSlides={4}
                totalSlides={products.length}
              >
                {products.map((item) => (
                  <ProductCard3
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    off={item.discount}
                    rating={item.rating}
                    imgUrl={item.thumbnail}
                  />
                ))}
              </Carousel>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper sx={{ borderRadius: 2, p: 2 }}>
              <Carousel
                infinite={true}
                visibleSlides={5}
                totalSlides={products.length}
              >
                {products.map((item) => (
                  <ProductCard3
                    hideReview
                    hideFavoriteIcon
                    key={item.id}
                    slug={item.slug}
                    title={item.title}
                    price={item.price}
                    off={item.discount}
                    rating={item.rating}
                    imgUrl={item.thumbnail}
                  />
                ))}
              </Carousel>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default CarouselPage;
