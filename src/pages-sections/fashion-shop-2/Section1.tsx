import { FC } from "react";
import { Box, Container } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import { CarouselCard1 } from "components/carousel-cards";
import MainCarouselItem from "models/Market-1.model";

// ======================================================
type Props = { carouselData?: MainCarouselItem[] };
// ======================================================

const Section1: FC<Props> = ({ carouselData }) => {
  return (
    <Box bgcolor="grey.100" mb={7.5}>
      <Container sx={{ py: 4 }}>
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
      </Container>
    </Box>
  );
};

export default Section1;
