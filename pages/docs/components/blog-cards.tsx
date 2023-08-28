import { Box, Container, Grid } from "@mui/material";
import Code from "components/Code";
import { BlogCard1, BlogCard2 } from "components/blog-cards";
import { H1, Paragraph } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
// data
import { articles } from "__server__/__db__/gadget/data";

const BlogCards = () => {
  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Blog Cards</H1>

          <Paragraph fontSize={16}>
            Folder Path: <Code>src/components/blog-cards</Code>
          </Paragraph>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={5}>
          {articles.map((blog, index) => (
            <Grid item md={6} xs={12} key={index}>
              <BlogCard1 blog={blog} />
            </Grid>
          ))}

          {articles.map((item) => (
            <Grid item md={4} xs={12} key={item.id}>
              <BlogCard2
                date="21 SEP"
                title={item.title}
                image={item.thumbnail}
                description={item.description}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default BlogCards;
