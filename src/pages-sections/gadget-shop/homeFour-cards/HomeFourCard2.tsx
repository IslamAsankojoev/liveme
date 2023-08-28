import { FC } from "react";
import Link from "next/link";
import { styled } from "@mui/material";
import { H5 } from "components/Typography";
import LazyImage from "components/LazyImage";
import BazaarCard from "components/BazaarCard";

// styled component
const StyledCard = styled(BazaarCard)(({ theme }) => ({
  borderRadius: "0px",
  height: "100%",
  boxShadow: theme.shadows[4],
  transition: "all 250ms ease-in-out",
  "&:hover": { boxShadow: theme.shadows[2] },
}));

// ========================================================================
type Props = { title: string; imgUrl: string; headingStyle?: object };
// ========================================================================

const HomeFourCard2: FC<Props> = ({ imgUrl, title, headingStyle }) => {
  return (
    <Link href="/sale-page-1">
      <StyledCard>
        <LazyImage alt={title} src={imgUrl} width={527} height={532} />
        <H5 sx={headingStyle ? headingStyle : { pb: "1rem", pl: "1.5rem" }}>
          {title}
        </H5>
      </StyledCard>
    </Link>
  );
};

export default HomeFourCard2;
