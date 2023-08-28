import { FC } from "react";
import { Container, Grid } from "@mui/material";
import { BlogCard1 } from "components/blog-cards";
import CategorySectionHeader from "components/CategorySectionHeader";
import Blog from "models/Blog.model";

// ================================================
type Props = { blogLists: Blog[] };
// ================================================

const Section7: FC<Props> = ({ blogLists }) => {
  return (
    <Container sx={{ mb: "4rem" }}>
      <CategorySectionHeader title="Get Ideas from our Blog" />

      <Grid container spacing={3}>
        {blogLists.map((blog, index) => (
          <Grid item md={6} xs={12} key={index}>
            <BlogCard1 blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section7;
