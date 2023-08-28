import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
  styled,
  ButtonProps,
  Avatar,
} from '@mui/material'
import SEO from 'components/SEO'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import { useRouter } from 'next/router'
import React from 'react'

const media = [
  {
    name: 'Wildberries',
    title: 'Online Store for Fashion and Home Goods',
    link: 'https://www.wildberries.ru/brands/310432823-LIVEME',
    logo: '/assets/images/liveme-in-media/wb.png',
  },
  {
    name: 'Ozon',
    title: 'Online Store with a Wide Range of Products',
    link: 'https://www.ozon.ru/brand/liveme-100506539/',
    logo: '/assets/images/liveme-in-media/ozon.webp',
  },
  {
    name: 'Topshopes',
    title: 'Online Store for Stylish Clothing and Accessories',
    link: 'https://topshopes.com/shops/f1149347-8720-48d1-839d-f32f9e6cd80d/',
    logo: '/assets/images/liveme-in-media/topshopes.png',
  },
]

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
}))

const LivemeInMedia = () => {
  return (
    <ShopLayout1>
      <SEO title="Liveme Contacts" />
      <Box bgcolor="white" py={8}>
        <Container>
          <Typography variant="h3" align="center">
            <b>Liveme in the media</b>
          </Typography>
          <Grid container>
            {media.map(({ link, logo, name, title }) => (
              <Grid
                item
                xs={12}
                sm={4}
                key={link + logo + name}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  padding: '2rem',
                  gap: 3,
                }}
              >
                <Avatar
                  onClick={() => {
                    window.open(link, '_blank')
                  }}
                  src={logo}
                  sx={{
                    width: 350,
                    height: 250,
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      cursor: 'pointer',
                      transform: 'scale(1.1)',
                    },
                    '& img': {
                      objectFit: 'contain',
                    },
                  }}
                  variant="square"
                />
                <Typography variant='subtitle2'><b>{title}</b></Typography>
                <StyledButton
                  onClick={() => {
                    window.open(link, '_blank')
                  }}
                  variant="contained"
                  color="dark"
                >
                  Go to {name}
                </StyledButton>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </ShopLayout1>
  )
}

export default LivemeInMedia
