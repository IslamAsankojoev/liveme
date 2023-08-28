import { FC } from "react";
import Link from "next/link";
import { Box, Button, Card, Grid, styled } from "@mui/material";
import Image from "next/image";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph } from "components/Typography";
import LazyImage from "components/LazyImage";

// styled components
const ContentBox = styled(Card)({
  height: 220,
  display: "flex",
  alignItems: "center",
  "& .content": { width: "50%" },
});

const RightContent = styled(FlexRowCenter)(({ theme }) => ({
  width: "50%",
  height: "100%",
  flexDirection: "column",
  borderRadius: "0px 50% 50% 0px",
  background: theme.palette.primary[200],
  "& p": { fontSize: 13, lineHeight: 1.4 },
}));

const LeftContent = styled(Box)(({ theme }) => ({
  width: "50%",
  height: "100%",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  "& img": { width: "90%" },
  [theme.breakpoints.down("sm")]: { "& img": { width: "100%" } },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#fff",
  fontWeight: 400,
  fontSize: "12px",
  marginTop: "16px",
  padding: "4px 12px",
  background: theme.palette.primary.main,
  "&:hover": { background: theme.palette.primary[400] },
}));

const Section2: FC = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={6}>
        <ContentBox>
          <RightContent px="20px">
            <Image
              alt="shop"
              width={40}
              height={40}
              src="/assets/images/Health Shop/Vector (1).png"
            />
            <Paragraph sx={{ mt: 2 }}>Our Pharmacists are</Paragraph>
            <Paragraph>here to Help People</Paragraph>
          </RightContent>

          <LeftContent px="10px">
            <LazyImage
              alt="shop"
              width={1000}
              height={1223}
              src="/assets/images/Health Shop/Doctor.png"
            />
          </LeftContent>
        </ContentBox>
      </Grid>

      <Grid item xs={12} sm={6} md={6}>
        <ContentBox sx={{ px: "20px" }}>
          <Box className="content">
            <Paragraph sx={{ fontSize: 12 }}>BEAUTY PACK</Paragraph>
            <H4 fontWeight="700">CREAM BRIGHT</H4>
            <H4 fontWeight="700">UP TO 25%</H4>
            <StyledButton LinkComponent={Link} href="/shops/scarlett-beauty">
              Shop Now
            </StyledButton>
          </Box>

          <Box className="content">
            <LazyImage
              alt="shop"
              width={800}
              height={800}
              src="/assets/images/Health Shop/Product (4).png"
            />
          </Box>
        </ContentBox>
      </Grid>
    </Grid>
  );
};

export default Section2;
