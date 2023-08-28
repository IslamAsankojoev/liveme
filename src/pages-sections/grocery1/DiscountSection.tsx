import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, Grid, styled } from "@mui/material";
import { H1, Paragraph } from "components/Typography";
import LazyImage from "components/LazyImage";

const Container = styled(Card)(({ theme }) => ({
  padding: "50px",
  background: "#efefef",
  transition: "all 0.3s",
  [theme.breakpoints.down("sm")]: {
    margin: "auto",
    padding: "30px 20px",
    "& .content": {
      marginBottom: 30,
      textAlign: "center",
      "& h1": { fontSize: 25 },
    },
  },
}));

const DiscountSection: FC = () => {
  const router = useRouter();

  return (
    <Container>
      <Link href="/sale-page-1">
        <Grid container>
          <Grid className="content" item sm={7} xs={12}>
            <Paragraph>Till 10 Dec, 2021</Paragraph>
            <H1>25% Special Off Today</H1>
            <H1>Only for Vegetables</H1>
            <Button
              color="primary"
              variant="contained"
              sx={{ mt: 5, fontSize: "12px" }}
              onClick={() => router.push("/sale-page-1")}
            >
              Shop Now
            </Button>
          </Grid>

          <Grid item sm={5}>
            <LazyImage
              width={900}
              height={528}
              alt="discount"
              src="/assets/images/Groceries Shop/vagitable.png"
            />
          </Grid>
        </Grid>
      </Link>
    </Container>
  );
};

export default DiscountSection;
