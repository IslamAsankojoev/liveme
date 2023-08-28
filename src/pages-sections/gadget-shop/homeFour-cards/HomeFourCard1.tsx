import { FC } from "react";
import Link from "next/link";
import { alpha, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { H3, Paragraph, Small } from "components/Typography";

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.background.paper, 1),
  padding: "1rem 0",
  alignItems: "center",
  transition: "all 250ms ease-in-out",
  "&:hover": { boxShadow: theme.shadows[2] },
  [theme.breakpoints.down("sm")]: { "&": { padding: "1rem" } },
}));

// =============================================================================
type HomeFourCard1Props = { body: string; title: string; imgUrl: string };
// =============================================================================

const HomeFourCard1: FC<HomeFourCard1Props> = ({ title, body, imgUrl }) => {
  return (
    <Link href="/sale-page-1">
      <StyledGrid container>
        <Grid item sm={6} xs={6}>
          <BazaarImage
            src={imgUrl}
            alt="apple-watch-1"
            sx={{
              mx: "auto",
              maxWidth: "100%",
              maxHeight: "155px",
              p: "0.5rem",
            }}
          />
        </Grid>

        <Grid item sm={6} xs={6}>
          <H3 lineHeight={1.3}>{title}</H3>

          <Paragraph color="grey.600" mt="0.5rem" mb="1rem" maxWidth="150px">
            {body}
          </Paragraph>

          <Small fontWeight="700" borderBottom={2}>
            {title}
          </Small>
        </Grid>
      </StyledGrid>
    </Link>
  );
};

export default HomeFourCard1;
