import { FC } from 'react';
import { Container, Grid } from '@mui/material';
import { H2 } from 'components/Typography';
import ProductCard18 from 'components/product-cards/ProductCard18';
import Product from 'models/Product.model';

// ===================================
type Props = { products: Product[] };
// ===================================

const Section3: FC<Props> = ({ products }) => {
  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4}>
        Best Selling Product
      </H2>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item lg={3} md={3} sm={6} xs={6} key={product.id}>
            <ProductCard18 product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Section3;
