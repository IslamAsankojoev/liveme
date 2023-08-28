import { Box, Container, Grid } from "@mui/material";
import Code from "components/Code";
import { BlogCard1, BlogCard2 } from "components/blog-cards";
import { H1, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import ProductCard1 from "components/product-cards/ProductCard1";
// data
import { products } from "__server__/__db__/gadget/data";
import ProductCard2 from "components/product-cards/ProductCard2";
import ProductCard3 from "components/product-cards/ProductCard3";
import ProductCard4 from "components/product-cards/ProductCard4";
import ProductCard5 from "components/product-cards/ProductCard5";
import ProductCard6 from "components/product-cards/ProductCard6";
import ProductCard7 from "components/product-cards/ProductCard7";
import ProductCard8 from "components/product-cards/ProductCard8";
import ProductCard9 from "components/product-cards/ProductCard9";
import ProductCard10 from "components/product-cards/ProductCard10";
import ProductCard11 from "components/product-cards/ProductCard11";
import ProductCard12 from "components/product-cards/ProductCard12";
import ProductCard13 from "components/product-cards/ProductCard13";
import ProductCard14 from "components/product-cards/ProductCard14";
import ProductCard15 from "components/product-cards/ProductCard15";
import ProductCard16 from "components/product-cards/ProductCard16";
import ProductCard17 from "components/product-cards/ProductCard17";
import ProductCard18 from "components/product-cards/ProductCard18";
import ProductCard19 from "components/product-cards/ProductCard19";
import ProductCard20 from "components/product-cards/ProductCard20";

const BlogCards = () => {
  const item = products[0];

  const category = {
    id: "f4c1291a-ff9e-4aa2-aa6c-95eb8b8bcc5e",
    name: "Headphone",
    icon: null,
    slug: "headphone",
    image: "/assets/images/banners/category-1.png",
    description: "3k orders this week",
    parent: [],
    for: { demo: "market-1", type: "top-categories" },
  };

  const image1 = "/assets/images/Health Shop/Product (3).png";

  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Product Cards</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/product-cards</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard1
              hoverEffect
              id={item.id}
              slug={item.slug}
              title="Product Card 1"
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              discount={item.discount}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard2
              slug={item.slug}
              title="Product Card 2"
              price={item.price}
              thumbnail={item.thumbnail}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard3
              key={item.id}
              slug={item.slug}
              title="Product Card 3"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard4
              title="Product Card 4"
              price={item.price}
              rating={item.rating}
              imgUrl={item.thumbnail}
              reviewCount={item.reviews.length}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard8
              id={item.id}
              key={item.id}
              slug={item.slug}
              price={item.price}
              title="Product Card 8"
              imgUrl={item.thumbnail}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard10
              hideRating
              id={item.id}
              slug={item.slug}
              price={item.price}
              title="Product Card 10"
              off={item.discount}
              rating={item.rating}
              imgUrl={image1}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard12
              id={item.title}
              slug={item.slug}
              title="Product Card 12"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard13
              id={item.id}
              slug={item.slug}
              title="Product Card 13"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={image1}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard14
              id={item.id}
              slug={item.slug}
              title="Product Card 14"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={image1}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard16
              id={item.id}
              slug={item.slug}
              title="Product Card 16"
              price={item.price}
              rating={item.rating}
              images={item.images}
              discount={item.discount}
              thumbnail={image1}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard17
              hideRating
              id={item.id}
              slug={item.slug}
              title="Product Card 17"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              status={item.status}
              imgUrl={image1}
              productColors={["red", "green", "blue"]}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard18
              product={{ ...item, thumbnail: image1, title: "Product Card 18" }}
            />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard20 product={{ ...item, thumbnail: image1 }} />
          </Grid>
        </Grid>

        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard15 title={item.title} available={item.title} imgUrl={image1} />
          </Grid> */}

        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard5 title="Product Card 5" imgUrl={item.thumbnail} />
          </Grid>

          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ProductCard6
              title={category.name}
              imgUrl={category.image}
              subtitle={category.description}
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <ProductCard7
              qty={2}
              id={item.id}
              slug={item.slug}
              name="Product Card 7"
              price={item.price}
              imgUrl={item.thumbnail}
            />
          </Grid> */}

        {/* <Grid item lg={4} md={4} sm={6} xs={12}>
            <ProductCard19
              key={item.id}
              slug={item.slug}
              title={item.title}
              price={item.price}
              image={item.thumbnail}
            />
          </Grid> */}

        {/* <Grid item sm={6} xs={12}>
            <ProductCard11 imgUrl={category.image} title="Product Card 11" off={10} />
          </Grid> */}

        {/* <Grid item sm={6} xs={12}>
            <ProductCard9
              id={item.id}
              key={item.id}
              slug={item.slug}
              title="Product Card 9"
              price={item.price}
              off={item.discount}
              rating={item.rating}
              imgUrl={item.thumbnail}
            />
          </Grid> */}
      </Container>
    </DocsLayout>
  );
};

export default BlogCards;
