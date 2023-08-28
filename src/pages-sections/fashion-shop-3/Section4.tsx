import { FC } from "react";
import Image from "next/image";
import { Box, Container, Grid, Stack, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import { H2, H3 } from "components/Typography";
import WhiteButton from "components/WhiteButton";

// custom styled components
const ContentBox = styled(Box)({
  top: 30,
  left: 30,
  right: 0,
  textAlign: "left",
  position: "absolute",
});

const Category2Wrapper = styled(Box)({
  width: "100%",
  height: "50%",
  position: "relative",
});

const Category2ButtonWrapper = styled(Box)({
  left: 0,
  right: 0,
  bottom: 30,
  textAlign: "center",
  position: "absolute",
});

const Section4: FC = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4}>
        Top Categories
      </H2>

      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
            <img
              width="100%"
              height="auto"
              alt="category"
              src="/assets/images/banners/car_parfume.png"
            />

            {/* <ContentBox>
              <H2 fontSize={24}>Car Parfume</H2>
              <H3 fontSize={22} fontWeight={400}>
                Collection
              </H3>
            </ContentBox> */}

            <FlexBox
              gap={2}
              justifyContent="center"
              sx={{ position: "absolute", bottom: 30, left: 0, right: 0 }}
            >
              <WhiteButton size="large">Car Parfume</WhiteButton>
            </FlexBox>
          </Box>
        </Grid>

        <Grid item md={6} xs={12}>
          <Stack spacing={3}>
            <SingleCategory
              url="/shop"
              buttonText="Man's Parfume"
              img="/assets/images/banners/man_parfume.png"
            />

            <SingleCategory
              url="/shop"
              buttonText="Woman's Parfume"
              img="/assets/images/banners/woman_parfume.png"
            />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

// ============================================================================
type SingleCategoryProps = { img: string; url: string; buttonText: string };
// ============================================================================

const SingleCategory: FC<SingleCategoryProps> = (props) => {
  const { img, url, buttonText } = props;

  return (
    <Category2Wrapper>
      <img  width="100%"
              height="auto" alt="category" src={img} />

      <Category2ButtonWrapper>
        <WhiteButton size="large">{buttonText}</WhiteButton>
      </Category2ButtonWrapper>
    </Category2Wrapper>
  );
};

export default Section4;
