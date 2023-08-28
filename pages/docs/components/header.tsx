import { Box, Container, Grid } from "@mui/material";
import Code from "components/Code";
import Header from "components/header/Header";
import { H1, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import SearchInput from "components/search-box/SearchInput";
import SearchInputWithCategory from "components/search-box/SearchInputWithCategory";

const HeaderDemo = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Header</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/header</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Header searchInput={<SearchInputWithCategory />} />
          </Grid>

          <Grid item xs={12}>
            <Header isFixed={true} searchInput={<SearchInputWithCategory />} />
          </Grid>

          <Grid item xs={12}>
            <Header isFixed={false} searchInput={<SearchInput />} />
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default HeaderDemo;
