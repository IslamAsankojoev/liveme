import { FC, useState } from "react";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { Box, Container, styled, Tab, Tabs } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import ProductIntro from "pages-sections/product-details/ProductIntro";
import ProductReview from "pages-sections/product-details/ProductReview";
import AvailableShops from "pages-sections/product-details/AvailableShops";
import RelatedProducts from "pages-sections/product-details/RelatedProducts";
import FrequentlyBought from "pages-sections/product-details/FrequentlyBought";
import ProductDescription from "pages-sections/product-details/ProductDescription";
import {
  getFrequentlyBought,
  getRelatedProducts,
} from "utils/__api__/related-products";
import Product from "models/Product.model";
import api from "utils/__api__/products";

// styled component
const StyledTabs = styled(Tabs)(({ theme }) => ({
  minHeight: 0,
  marginTop: 80,
  marginBottom: 24,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    minHeight: 40,
    fontWeight: 600,
    textTransform: "capitalize",
  },
}));

// ===============================================================
type ProductDetailsProps = {
  product: Product;
  relatedProducts: Product[];
  frequentlyBought: Product[];
};
// ===============================================================

const ProductDetails: FC<ProductDetailsProps> = (props) => {
  const { frequentlyBought, relatedProducts, product } = props;

  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(0);

  const handleOptionClick = (_, value: number) => setSelectedOption(value);

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <ShopLayout1>
      <Container sx={{ my: 4 }}>
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? <ProductIntro product={product} /> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION AND REVIEW */}
        <StyledTabs
          textColor="primary"
          value={selectedOption}
          indicatorColor="primary"
          onChange={handleOptionClick}
        >
          <Tab className="inner-tab" label="Description" />
          <Tab className="inner-tab" label="Review (3)" />
        </StyledTabs>

        <Box mb={6}>
          {selectedOption === 0 && <ProductDescription />}
          {selectedOption === 1 && <ProductReview />}
        </Box>

        {frequentlyBought && (
          <FrequentlyBought productsData={frequentlyBought} />
        )}

        <AvailableShops />

        {relatedProducts && <RelatedProducts productsData={relatedProducts} />}
      </Container>
    </ShopLayout1>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await api.getSlugs();

  return {
    paths: paths, //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const relatedProducts = await getRelatedProducts();
  const frequentlyBought = await getFrequentlyBought();
  const product = await api.getProduct(params.slug as string);

  return { props: { frequentlyBought, relatedProducts, product } };
};

export default ProductDetails;
