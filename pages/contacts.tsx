import styled from '@emotion/styled'
import {
  Box,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import SEO from 'components/SEO'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import { useRouter } from 'next/router'
import React from 'react'

const contacts = [
  {
    country: 'Türkiye',
    places: [
      {
        address:
          'Mevki, Altın tepsi mah. Ferhat paşa çiftliği, Gar Sk. No:2 /34035, 34035 Bayrampaşa/İstanbul',
        phone: '+90 549 675 10 12',
        mapID: '3Ae3bb3bf584d333996620b2a501373cb5b59a523ea18adfc9f3961862e29f3032',
      },
    ],
  },
  {
    country: 'Germany',
    places: [
      {
        address: 'Deutschland GmstrongH strongahnhofstr, 38 3 89423 Gundelfingen a.d Donau',
        phone: '+49 9073 977 54 97',
        mapID: '3A4b6d8736a59eff7b4941be9475c9963aff66cbc97db865567c9544faad29db0d',
      },
    ],
  },
  {
    country: 'Кыргызстан',
    places: [
      {
        address: 'Бишкек, Первомайский район, ул. Чуй, 219',
        phone: '+996 708 022 101',
        mapID: '3A548280e078f40394ec2096bb4092f14d0194d34a591a89fe39b40f81b3198458',
      },
      {
        address: 'Ош, ул. А. Масалиева, 5',
        phone: '+996 551 016 202',
        mapID: '3A5916b043aa30460f746f233d1babe0eab76ce3abbef18f12d62427c088e03c43',
      },
    ],
  },
  {
    country: 'Қазақстан',
    places: [
      {
        address: 'Алматы, Турксибский районпр. Сейфуллина, дом 230',
        phone: '+7 707 861 03 02',
        mapID: '3A08c151d2b4a34b4b662f05adfd6b77475d412cd6d9dfc7add752270faa30ca1c',
      },
    ],
  },
]

const StyledLink = styled(Link)(({ theme }) => ({
  cursor: 'pointer',
  textDecoration: 'none',
}))

const Contacts = () => {
  const router = useRouter()
  const [map, setMap] = React.useState<string>(
    '3Ae3bb3bf584d333996620b2a501373cb5b59a523ea18adfc9f3961862e29f3032',
  )

  return (
    <ShopLayout1>
      <SEO title="Liveme Contacts" />
      <Box bgcolor="white" py={8}>
        <Container>
          <Typography variant="h5">
            <b>CONTACTS</b>
          </Typography>
          <Grid container>
            <Grid
              item
              sm={6}
              xs={12}
              mb={{
                xs: 4,
                sm: 0,
              }}
            >
              <Stack spacing={2} mt={2}>
                <List>
                  {contacts.map((contact) => (
                    <ListItem alignItems="flex-start" key={contact.country}>
                      <ListItemText
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              <b>{contact.country}</b>
                            </Typography>
                            <Stack spacing={1}>
                              {contact.places.map((place) => (
                                <Box
                                  key={place.address}
                                  sx={{
                                    cursor: 'pointer',
                                    textDecoration: 'none',
                                    borderRadius: '8px',
                                    padding: '8px',
                                    transition: 'all 0.1s ease-in-out',
                                    '&:hover': {
                                      backgroundColor: '#f5f5f5',
                                    },
                                    '&:active': {
                                      backgroundColor: '#e0e0e0',
                                    },
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    setMap(place.mapID)
                                  }}
                                >
                                  <Typography>{place.address}</Typography>
                                  <StyledLink href={`tel:${place.phone}`}>{place.phone}</StyledLink>
                                </Box>
                              ))}
                            </Stack>
                          </React.Fragment>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Stack>
            </Grid>
            <Grid item sm={6} xs={12} display="flex" justifyContent="center" alignItems="center">
              <iframe
                style={{
                  boxShadow: 'rgb(0 0 0 / 10%) 0px 0px 8px 3px',
                  borderRadius: '8px',
                }}
                src={`https://yandex.ru/map-widget/v1/?um=constructor%${map}&amp;source=constructor`}
                width="100%"
                height="400"
                frameBorder="0"
              ></iframe>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ShopLayout1>
  )
}

export default Contacts
