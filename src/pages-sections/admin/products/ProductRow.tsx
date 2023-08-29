import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Delete, Edit, RemoveRedEye } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarSwitch from "components/BazaarSwitch";
import { Paragraph, Small } from "components/Typography";
import { currency } from "lib";
import {
  StyledTableRow,
  CategoryWrapper,
  StyledTableCell,
  StyledIconButton,
} from "../StyledComponents";
import { useMutation } from "react-query";
import { ProductServices } from "api/product.service";
import { sortedGallery } from "utils/sortedGallery";

// ========================================================================
type ProductRowProps = { product: IProduct, refetch: () => void };
// ========================================================================

const ProductRow: FC<ProductRowProps> = ({ product, refetch }) => {
  // @ts-ignore
  const { category, name, price, id, published, gallery, sale_price, categoryName } = product;

  const router = useRouter();
  const [productPulish, setProductPublish] = useState(published);

  const {mutate: publishProduct} = useMutation('publish product', ({id, values}:{id:number, values:IProduct}) => ProductServices.update( id, values), {
    onSuccess: () => {
      setProductPublish((state) => !state)
    }
  })

  const {mutate: deleteProduct, isLoading: deleteLoading} = useMutation('delete product', (id:number) => ProductServices.delete(id), {
    onSuccess: () => {
      refetch()
    }
  })

  const handlePublish = async () => {
    publishProduct({
      id,
      values: {
        published: !productPulish
      }
    })
  }

  return (
    <StyledTableRow tabIndex={-1} role="checkbox">
      <StyledTableCell align="left">
        <FlexBox alignItems="center" gap={1.5}>
          <Avatar src={sortedGallery(gallery).thumbnails[0].link || null} sx={{ borderRadius: "8px" }} />
          <Box>
            <Paragraph>{name}</Paragraph>
            <Small color="grey.600"># {id}</Small>
          </Box>
        </FlexBox>
      </StyledTableCell>

      <StyledTableCell align="left">
        <CategoryWrapper>
          <Typography
          variant="body2"
          color={
            category?.name ?? 'grey.disabled'
          }>
          {category?.name ?? 'No category'}
          </Typography>
        </CategoryWrapper>
      </StyledTableCell>

      <StyledTableCell align="left">{currency(price)}</StyledTableCell>

      <StyledTableCell align="left">{currency(sale_price)}</StyledTableCell>

      <StyledTableCell align="left">
        <BazaarSwitch
          color="info"
          checked={productPulish}
          onChange={handlePublish}
        />
      </StyledTableCell>

      <StyledTableCell align="center">
        <StyledIconButton
          onClick={() => router.push(`/admin/products/${id}`)}
        >
          <Edit />
        </StyledIconButton>

        <StyledIconButton>
          <RemoveRedEye />
        </StyledIconButton>

        <StyledIconButton>
          {deleteLoading ? <CircularProgress color="inherit" sx={{position:'absolute'}}/> : null}
          <Delete onClick={()=>{
            deleteProduct(id)
          }}/>
        </StyledIconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ProductRow;
