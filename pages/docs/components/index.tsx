import { NextPage } from "next";
import { Box, Container, Grid, Paper } from "@mui/material";
import MuiLink from "@mui/material/Link";
import { H1, H4, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import Code from "components/Code";

const componentList = [
  { id: 1, name: "Accordion", link: "/docs/components/accordion" },
  { id: 9, name: "Blog Cards", link: "/docs/components/blog-cards" },
  { id: 2, name: "Banner Card", link: "/docs/components/banner-card" },
  { id: 11, name: "Product Card", link: "/docs/components/product-cards" },
  { id: 3, name: "Carousel", link: "/docs/components/carousel" },
  { id: 4, name: "Data Table", link: "/docs/components/data-table" },
  { id: 5, name: "Footer", link: "/docs/components/footer" },
  { id: 6, name: "Header", link: "/docs/components/header" },
  { id: 7, name: "Icons", link: "/docs/icons" },
  { id: 8, name: "Page Side Nav", link: "/docs/components/page-side-nav" },
  {
    id: 10,
    name: "Extra Components",
    link: "/docs/components/extra-components",
  },
];

const ComponentsPage: NextPage = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Components</H1>

          <Paragraph fontSize={16}>
            Bazaar uses all reusable components are located in{" "}
            <Code>src/components</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          {componentList.map(({ id, link, name }) => (
            <Grid item xs={3} key={id}>
              <MuiLink
                href={link}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                <Paper elevation={1} sx={{ borderRadius: 2 }}>
                  <H4 p={3} textAlign="center">
                    {name}
                  </H4>
                </Paper>
              </MuiLink>
            </Grid>
          ))}
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default ComponentsPage;
