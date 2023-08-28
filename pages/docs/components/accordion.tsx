import { Apple } from "@mui/icons-material";
import { Box, Container, Grid, Paper } from "@mui/material";
import Code from "components/Code";
import { FlexBox } from "components/flex-box";
import { NavLink } from "components/nav-link";
import DocsLayout from "components/layouts/DocsLayout";
import Accordion from "components/accordion/Accordion";
import { H1, Paragraph, Span } from "components/Typography";
import AccordionHeader from "components/accordion/AccordionHeader";

const AccordionDemo = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Accordion</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/accordion</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item md={6} lg={4} xs={12}>
            <Paper elevation={1} sx={{ borderRadius: 2, p: 2 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box my={1} key={i}>
                  <Accordion expanded={i === 0}>
                    <AccordionHeader px={0} py={0.75}>
                      <FlexBox gap={1.5} alignItems="center">
                        <Apple fontSize="small" />
                        <Span fontWeight={600}>Fruits & Vegetables</Span>
                      </FlexBox>
                    </AccordionHeader>

                    {["Onion", "Potato", "Pears", "Peaches"].map((item, i) => (
                      <NavLink href="#" color="grey.700" key={i}>
                        <Span display="block" ml={6} pb={1}>
                          {item}
                        </Span>
                      </NavLink>
                    ))}
                  </Accordion>
                </Box>
              ))}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default AccordionDemo;
