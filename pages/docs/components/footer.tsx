import { Box, Container, Grid } from "@mui/material";
import Code from "components/Code";
import { H1, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import { Footer1, Footer2, Footer3 } from "components/footer";

const FooterDemo = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Footer</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/footer</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Footer1 />
          </Grid>

          <Grid item xs={12}>
            <Footer2 />
          </Grid>

          <Grid item xs={12}>
            <Footer3 />
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default FooterDemo;
