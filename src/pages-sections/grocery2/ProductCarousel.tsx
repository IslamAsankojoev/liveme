import { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
import Carousel from "components/carousel/Carousel";
import ProductCard1 from "components/product-cards/ProductCard1";
import useWindowSize from "hooks/useWindowSize";
import Product from "models/Product.model";

// =======================================================
type ProductCarouselProps = { title: string; products: Product[] };
// =======================================================

const ProductCarousel: FC<ProductCarouselProps> = (props) => {
  const { products, title } = props;

  const width = useWindowSize();
  const [visibleSlides, setVisibleSlides] = useState(3);

  useEffect(() => {
    if (width < 500) setVisibleSlides(1);
    else if (width < 950) setVisibleSlides(2);
    else setVisibleSlides(3);
  }, [width]);

  return (
    <Box>
      <H3 fontSize={25} mb={3}>
        {title}
      </H3>

      <Carousel
        step={3}
        showDots
        showArrowOnHover={true}
        arrowButtonColor="inherit"
        totalSlides={products.length}
        visibleSlides={visibleSlides}
      >
        {products.map((item) => (
          <Box py={0.5} key={item.id}>
            <ProductCard1
              hideRating
              showProductSize
              id={Number(item.id)}
                name={item.title}
                price={item.price}
                rating={item.rating}
            />
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

// set default component props
ProductCarousel.defaultProps = {
  products: [],
  title: "Best Seller in Your Area",
};

export default ProductCarousel;
