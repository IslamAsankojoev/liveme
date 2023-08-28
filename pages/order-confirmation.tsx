import Link from "next/link";
import Image from "next/image";
import { NextPage } from "next";
import { Button, Container, styled } from "@mui/material";
import SEO from "components/SEO";
import BazaarCard from "components/BazaarCard";
import { H1, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";

// custom styled components
const Wrapper = styled(BazaarCard)({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px",
});

const OrderConfirmation: NextPage = () => {
  return (
    <ShopLayout1>
      <SEO title="Order Confirmation" />

      <Container sx={{ mt: 4, mb: 20 }}>
        <Wrapper>
          <Image
            width={116}
            height={116}
            alt="complete"
            src="/assets/images/illustrations/party-popper.svg"
          />
          <H1 lineHeight={1.1} mt="1.5rem">
            Your order is completed!
          </H1>

          <Paragraph color="grey.800" mt="0.3rem">
            You will be receiving confirmation email with order details.
          </Paragraph>

          <StyledButton
            color="primary"
            disableElevation
            variant="contained"
            className="button-link"
            LinkComponent={Link}
            href="/market-1"
          >
            Browse products
          </StyledButton>
        </Wrapper>
      </Container>
    </ShopLayout1>
  );
};

export default OrderConfirmation;
