import Link from 'next/link'
import { FC, useState } from 'react'
import { Add, Remove } from '@mui/icons-material'
import { Avatar, Box, Button, Chip, Grid, Theme, useMediaQuery } from '@mui/material'
import LazyImage from 'components/LazyImage'
import BazaarRating from 'components/BazaarRating'
import { H1, H2, H3, H6 } from 'components/Typography'
import { useAppContext } from 'contexts/AppContext'
import { FlexBox, FlexRowCenter } from '../../components/flex-box'
import Product from 'models/Product.model'
import { currency } from 'lib'
import productVariants from 'data/product-variants'
import { getOneImage } from 'utils/getOneImage'
import { sortBy } from 'lodash'
import { sortedGallery } from 'utils/sortedGallery'

// ================================================================
type ProductIntroProps = { product: IProduct }
// ================================================================

const ProductIntro: FC<ProductIntroProps> = ({ product }) => {
  const { id, price, name, sale_price, short_description, full_description, gallery, category } =
    product

  const { state, dispatch } = useAppContext()
  const [selectedImage, setSelectedImage] = useState(getOneImage(gallery))
  const [selectVariants, setSelectVariants] = useState({
    option: 'option 1',
    type: 'type 1',
  })

  // HANDLE CHAMGE TYPE AND OPTIONS
  const handleChangeVariant = (variantName: string, value: string) => () => {
    setSelectVariants((state) => ({
      ...state,
      [variantName.toLowerCase()]: value,
    }))
  }

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find((item) => item.id === id)

  // HANDLE SELECT IMAGE
  const handleImageClick = (thumbnail: IThumbnail) => () => setSelectedImage(thumbnail)

  // HANDLE CHANGE CART
  const handleCartAmountChange = (amount: number) => () => {
    // dispatch({
    //   type: "CHANGE_CART_AMOUNT",
    //   payload: { price, qty: amount, imgUrl: getOneImage(gallery).link, id, name },
    // });
  }

  return (
    <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Grid container
          
          sx={{
            "@media (max-width: 600px)": {
              flexDirection: 'column-reverse'
            }
          }}>
            <Grid item md={3} display='flex' alignItems='center'>
              <Grid
                container
                sx={{
                  gap: '5px',
                  justifyContent: 'center',
                  '@media (max-width: 600px)': {
                    overflowX: 'scroll',
                    flexWrap: 'nowrap',
                  }
                }}
              >
                {sortedGallery(gallery).thumbnails.map((thumbnail) => (
                  <Grid
                    item
                    key={thumbnail?.id}
                    width={64}
                    height={84}
                    minWidth={64}
                    bgcolor="white"
                    border="1.5px solid"
                    borderRadius="5px"
                    overflow="hidden"
                    sx={{
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                      "&:last-child": {
                        "@media (min-width: 900px)": {
                          width: gallery.thumbnails.length % 2 === 0 ? 64 : 128,
                          height: gallery.thumbnails.length % 2 === 0 ? 84 : 168,
                        }
                      }
                    }}
                    ml={thumbnail?.id === 0 ? 'auto' : 0}
                    
                    borderColor={selectedImage.id === thumbnail?.id ? 'primary.main' : 'grey.400'}
                  >
                    {/* <Avatar
                      src={thumbnail.link}
                      variant="square"
                      sx={{ height: 'auto', width: '100%' }}
                    /> */}
                    <Button
                    onClick={handleImageClick(thumbnail)}
                    sx={{
                      backgroundImage: `url(${thumbnail.link})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      height: '100%',
                      width: '100%',
                    }}
                    >

                    </Button>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item md={9}>
              <FlexBox justifyContent="center" mb={2}>
                <LazyImage
                  alt={name}
                  width={460}
                  height={600}
                  loading="eager"
                  src={selectedImage.link}
                  sx={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              </FlexBox>
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center" >
          <FlexBox height='100%' flexDirection='column' justifyContent='center'>
            <H1 mb={1}>{name}</H1>

            <FlexBox alignItems="center" mb={1}>
              <Box>Brand:</Box>
              <H6>Xiaomi</H6>
            </FlexBox>

            <FlexBox alignItems="center" mb={2}>
              <Box lineHeight="1">Rated:</Box>
              <Box mx={1} lineHeight="1">
                <BazaarRating color="warn" fontSize="1.25rem" value={4} readOnly />
              </Box>
              <H6 lineHeight="1">(50)</H6>
            </FlexBox>

            {productVariants.map((variant) => (
              <Box key={variant.id} mb={2}>
                <H6 mb={1}>{variant.title}</H6>

                {variant.values.map(({ id, value }) => (
                  <Chip
                    key={id}
                    label={value}
                    onClick={handleChangeVariant(variant.title, value)}
                    sx={{ borderRadius: '4px', mr: 1, cursor: 'pointer' }}
                    color={
                      selectVariants[variant.title.toLowerCase()] === value ? 'primary' : 'default'
                    }
                  />
                ))}
              </Box>
            ))}

            <Box pt={1} mb={3}>
              <H2 color="primary.main" mb={0.5} lineHeight="1">
                {currency(price)}
              </H2>
              <Box color="inherit">Stock Available</Box>
            </Box>

            {!cartItem?.qty ? (
              <Button
                color="primary"
                variant="contained"
                onClick={handleCartAmountChange(1)}
                sx={{ mb: 4.5, px: '1.75rem', height: 40, width: '200px' }}
              >
                Add to Cart
              </Button>
            ) : (
              <FlexBox alignItems="center" mb={4.5}>
                <Button
                  size="small"
                  sx={{ p: 1 }}
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty - 1)}
                >
                  <Remove fontSize="small" />
                </Button>

                <H3 fontWeight="600" mx={2.5}>
                  {cartItem?.qty.toString().padStart(2, '0')}
                </H3>

                <Button
                  size="small"
                  color="primary"
                  variant="outlined"
                  onClick={handleCartAmountChange(cartItem?.qty + 1)}
                >
                  <Add fontSize="small" />
                </Button>
              </FlexBox>
            )}

            <FlexBox alignItems="center" gap={1} mb={2}>
              <Box>Sold By:</Box>
              <Link href="/shops/scarlett-beauty">
                <H6>Mobile Store</H6>
              </Link>
            </FlexBox>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProductIntro
