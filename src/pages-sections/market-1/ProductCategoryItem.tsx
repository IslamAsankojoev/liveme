import { FC, HtmlHTMLAttributes } from "react";
import { styled, SxProps } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import BazaarCard from "components/BazaarCard";
import { H4 } from "components/Typography";

// styled component
const StyledBazaarCard = styled(BazaarCard)(({ theme }) => ({
  gap: "1rem",
  display: "flex",
  borderRadius: 5,
  cursor: "pointer",
  alignItems: "center",
  padding: "0.75rem 1rem",
  "&:hover": { boxShadow: theme.shadows[2] },
}));

// ==============================================================================
interface ProductCategoryItemProps extends HtmlHTMLAttributes<HTMLElement> {
  isSelected?: boolean;
  imgUrl?: string;
  title: string;
  sx: SxProps;
}
// ==============================================================================

const ProductCategoryItem: FC<ProductCategoryItemProps> = ({
  title,
  imgUrl,
  isSelected,
  sx = {},
  ...others
}) => {
  return (
    <StyledBazaarCard
      elevation={isSelected ? 2 : 0}
      sx={{ bgcolor: isSelected ? "white" : "grey.100", ...sx }}
      {...others}
    >
      {imgUrl && <BazaarImage alt="" width={30} src={imgUrl} />}

      <H4 lineHeight="1" textTransform="capitalize">
        {title}
      </H4>
    </StyledBazaarCard>
  );
};

export default ProductCategoryItem;
