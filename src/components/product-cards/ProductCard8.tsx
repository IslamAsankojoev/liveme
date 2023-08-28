import { FC } from "react";
import Link from "next/link";
import { SxProps } from "@mui/material";
import HoverBox from "components/HoverBox";
import LazyImage from "components/LazyImage";
import { FlexBox } from "components/flex-box";
import BazaarCard from "components/BazaarCard";
import { H6, Span } from "components/Typography";
import { calculateDiscount, currency } from "lib";

// =======================================================
type ProductCardProps = {
  sx?: SxProps;
  slug: string;
  price: number;
  title: string;
  imgUrl: string;
  id: string | number;
};
// =======================================================

const ProductCard8: FC<ProductCardProps> = (props) => {
  const { imgUrl, price, title, slug, sx = {} } = props;

  return (
    <BazaarCard sx={{ p: 2, ...sx }}>
      <Link href={`/product/${slug}`}>
        <HoverBox mb={1.5} borderRadius="8px">
          <LazyImage
            alt={title}
            width={500}
            height={500}
            src={imgUrl || "/assets/images/products/Rectangle 116.png"}
          />
        </HoverBox>

        <Span title={title} mb={0.5} color="inherit" ellipsis display="block">
          {title}
        </Span>

        <FlexBox alignItems="center">
          <H6 color="primary.main" mr={0.5}>
            {currency(price)}
          </H6>

          <Span color="grey.600">
            <del>{calculateDiscount(price, 35)}</del>
          </Span>
        </FlexBox>
      </Link>
    </BazaarCard>
  );
};

export default ProductCard8;
