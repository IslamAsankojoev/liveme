import { Box, Container, Typography } from '@mui/material'
import SEO from 'components/SEO'
import ShopLayout1 from 'components/layouts/ShopLayout1'
import React from 'react'

const AboutUs = () => {
  return (
    <ShopLayout1>
      <SEO title="About Liveme" />
      <Box bgcolor="white" py={8}>
        <Container>
          <Typography variant="h5"><b>ABOUT US</b></Typography>
          <Typography variant="body2">
            <Typography variant="subtitle1"> Our Liveme company was established in 2022.</Typography>
            Our company, Liveme, which is based in Turkey and started with its young and dynamic
            team, is a company that is open to innovation, focusing on its goals and developing more
            and more every day, is the most preferred company. Our brand, which aims to gradually
            expand its domestic and international market area, exports to many countries, especially
            Russia, Kazakhstan, Kyrgyzstan, Georgia, Ukraine, Germany and Poland.
            <br />
            <br />
            <Typography variant="subtitle1"> Our Liveme Vision (GOAL)</Typography>
            Live me, which is the meaning of our Liveme brand, is to create an unforgettable
            atmosphere for our customers. In addition, we are moving towards being a healthy and
            most admired leader company with many product categories.
            <br />
            <br />
            <Typography variant="subtitle1"> Liveme MISSION (OBJECTIVE)</Typography>
            We will continue to offer our valued customers with our motto You can never forget the
            environment you are used to smelling, which will make our customers feel good by
            creating a peaceful and happy ambiance. With our highly advanced technologies, we will
            continue to carry our expert team and R&D-oriented work to the world in our production
            area. We will continue to be a natural and sincere brand suitable for all our customers
            by bringing a new life to this sector with a visionary structure. We will continue to be
            a brand that naturally provides happiness with our products suitable for every skin and
            every environment, bringing a new breath to the sector with our forward-thinking and
            visionary structure.
            <br />
            <br />
            <Typography variant="subtitle1"> BETWEEN OUR VALUES</Typography>
            Quality and reliability are at the forefront. Each of our customers has a special
            importance for us. We live a family atmosphere with our customers and our team by saying
            Happy customer, happy employee in our understanding of trade.
            <br />
            <br />
            <Typography variant="subtitle1"> WE ARE AN INNOVATIVE COMPANY</Typography>
            Our equipped and modern production facility is able to adapt instantly by following
            trending and technological developments by our expert teams. Our company, which is
            always open to innovation and transparent, continues on the path of development without
            stopping.
          </Typography>
        </Container>
      </Box>
    </ShopLayout1>
  )
}

export default AboutUs
