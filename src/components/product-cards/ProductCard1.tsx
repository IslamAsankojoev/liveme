import Link from 'next/link'
import { FC, Fragment, useCallback, useState } from 'react'
import { Add, Favorite, Remove, RemoveRedEye } from '@mui/icons-material'
import { Box, Button, Chip, IconButton, styled } from '@mui/material'
import { useSnackbar } from 'notistack'
import FavoriteBorder from '@mui/icons-material/FavoriteBorder'
import LazyImage from 'components/LazyImage'
import BazaarCard from 'components/BazaarCard'
import { H3, Span } from 'components/Typography'
import BazaarRating from 'components/BazaarRating'
import { CartItem, useAppContext } from 'contexts/AppContext'
import ProductViewDialog from 'components/products/ProductViewDialog'
import { FlexBox } from '../flex-box'
import { calculateDiscount, currency } from 'lib'
import { getOneImage } from 'utils/getOneImage'

// styled components
const StyledBazaarCard = styled(BazaarCard)({
  height: '100%',
  margin: 'auto',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '8px',
  position: 'relative',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 250ms ease-in-out',
  ':hover': { '& .hover-box': { opacity: 1 } },
})

const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  display: 'inline-block',
  [theme.breakpoints.down('sm')]: { display: 'block' },
}))

const StyledChip = styled(Chip)({
  zIndex: 1,
  top: '10px',
  left: '10px',
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: '10px',
  position: 'absolute',
})

const HoverIconWrapper = styled(Box)({
  zIndex: 2,
  top: '7px',
  opacity: 0,
  right: '15px',
  display: 'flex',
  cursor: 'pointer',
  position: 'absolute',
  flexDirection: 'column',
  transition: 'all 0.3s ease-in-out',
})

const ContentWrapper = styled(Box)({
  padding: '1rem',
  '& .title, & .categories': {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },
})

// ========================================================
interface ProductCardProps extends IProduct {
  hideRating?: boolean
  hoverEffect?: boolean
  showProductSize?: boolean
}
// ========================================================

const ProductCard1: FC<ProductCardProps> = ({
  id,
  name,
  category,
  full_description,
  short_description,
  price,
  sale_price,
  rating,
  gallery,
  published,
  hideRating,
  hoverEffect,
  showProductSize,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const { state, dispatch } = useAppContext()
  const [openModal, setOpenModal] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav)
  const toggleDialog = useCallback(() => setOpenModal((open) => !open), [])
  const cartItem: CartItem | undefined = state.cart.find((item) => item.name === name)

  const handleCartAmountChange = (product: CartItem, type?: 'remove') => () => {
    dispatch({ type: 'CHANGE_CART_AMOUNT', payload: product })
    // SHOW ALERT PRODUCT ADDED OR REMOVE
    if (type === 'remove') enqueueSnackbar('Remove from Cart', { variant: 'error' })
    else enqueueSnackbar('Added to Cart', { variant: 'success' })
  }

  return (
    <StyledBazaarCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {/* {!!discount && <StyledChip color="primary" size="small" label={`${discount}% off`} />} */}

        <HoverIconWrapper className="hover-box">
          <IconButton onClick={toggleDialog}>
            <RemoveRedEye color="disabled" fontSize="small" />
          </IconButton>

          <IconButton onClick={toggleIsFavorite}>
            {isFavorite ? (
              <Favorite color="error" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" color="disabled" />
            )}
          </IconButton>
        </HoverIconWrapper>

        <Link href={`/product/${name}`}>
          <LazyImage
            priority
            src={getOneImage(gallery).link}
            width={500}
            height={500}
            alt={name}
            sx={{ height: 'auto' }}
          />
        </Link>
      </ImageWrapper>
{/* 
      <ProductViewDialog
        openDialog={openModal}
        handleCloseDialog={toggleDialog}
        product={{ name, price, id, slug, imgGroup: [imgUrl, imgUrl] }}
      /> */}

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            <Link href={`/product/${name}`}>
              <H3
                mb={1}
                title={name}
                fontSize="14px"
                fontWeight="600"
                className="title"
                color="text.secondary"
              >
                {name}
              </H3>
            </Link>

            {!hideRating && <BazaarRating value={rating || 0} color="warn" readOnly />}

            {showProductSize && (
              <Span color="grey.600" mb={1} display="block">
                {showProductSize}
              </Span>
            )}

            <FlexBox alignItems="center" gap={1} mt={0.5}>
              <Box fontWeight="600" color="primary.main">
                {sale_price ? currency(sale_price) : currency(price)}
              </Box>

              {!!sale_price && (
                <Box color="grey.600" fontWeight="600">
                  <del>{currency(price)}</del>
                </Box>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={!!cartItem?.qty ? 'space-between' : 'flex-start'}
          >
            <Button
              color="dark"
              variant="outlined"
              sx={{ padding: '3px' }}
              onClick={()=>{}}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <Fragment>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>

                <Button
                  color="dark"
                  variant="outlined"
                  sx={{ padding: '3px' }}
                  onClick={()=>{}}
                >
                  <Remove fontSize="small" />
                </Button>
              </Fragment>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledBazaarCard>
  )
}

export default ProductCard1
