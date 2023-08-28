import { FC, ReactNode } from "react";
import { Box, BoxProps, styled } from "@mui/material";
import LazyImage from "components/LazyImage";

// custom styled components
const CardWrapper = styled(Box)({
  overflow: "hidden",
  position: "relative",
});

const CardContent = styled(Box)(({ theme }) => ({
  top: 0,
  left: 32,
  zIndex: 1,
  height: "100%",
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  justifyContent: "center",
  ...(theme.direction === "rtl" && {
    left: "auto",
    right: 32,
    textAlign: "right",
  }),
}));

// ========================================================
type BannerCard1Props = { img: string; children: ReactNode };
// ========================================================

const BannerCard3: FC<BannerCard1Props & BoxProps> = ({
  img,
  children,
  ...props
}) => {
  return (
    <CardWrapper {...props}>
      <LazyImage alt="category" height={239} width={330} src={img} />
      <CardContent>{children}</CardContent>
    </CardWrapper>
  );
};

export default BannerCard3;
