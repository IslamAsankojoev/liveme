import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Container, Grid, Pagination } from '@mui/material'
import SEO from 'components/SEO'
import { Span } from 'components/Typography'
import { FlexBetween } from 'components/flex-box'
import SaleLayout from 'components/layouts/SaleLayout'
import ProductCard1 from 'components/product-cards/ProductCard1'
import productDatabase from 'data/product-database'
import { renderProductCount } from '../src/lib'
import Product from 'models/Product.model'
import api from 'utils/__api__/sales'
import Sticky from 'components/Sticky'
import SaleNavbar from 'components/navbar/SaleNavbar'
import Category from 'models/Category.model'
import { useQuery } from 'react-query'
import { ProductServices } from 'api/product.service'

const PRODUCT_PER_PAGE = 28

const SalePage2: NextPage = () => {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState('men')
  const [categories, setCategories] = useState<Category[]>([])

  const { data: productList = [] } = useQuery('product list shop', ProductServices.findAll, {
    select: (data: IProduct[]) => data,
  })

  // handle page change
  const handlePageChange = (_, page: number) => setPage(page)

  // FETCH THE CATEGORY LIST
  useEffect(() => {
    api.getCategoriesTwo().then((data) => setCategories(data))
  }, [])

  // HANDLE CHANGE CATEGORY
  const handleChangeCategory = (category: string) => () => setSelected(category)

  // CATEGORY NAV LIST
  const categoryNav = (
    <Sticky fixedOn={0} scrollDistance={200}>
      <SaleNavbar
        selected={selected}
        categories={categories}
        onChangeCategory={handleChangeCategory}
      />
    </Sticky>
  )

  return (
    <SaleLayout type="two" categoryNav={categoryNav}>
      <SEO title="Shop" />

      <Container sx={{ mt: 4 }}>
        {/* PRODUCT LIST AREA */}
        <Grid container spacing={3}>
          {productList.map((item) => (
            <Grid item lg={2.4} md={3} sm={4} xs={6} key={item.id}>
              <ProductCard1 {...item} />
            </Grid>
          ))}
        </Grid>

        {/* PAGINATION AREA */}
        <FlexBetween flexWrap="wrap" my={8}>
          <Span>{renderProductCount(page, PRODUCT_PER_PAGE, productDatabase.length)}</Span>

          <Pagination
            page={page}
            color="primary"
            variant="outlined"
            onChange={handlePageChange}
            count={Math.ceil(productDatabase.length / PRODUCT_PER_PAGE)}
          />
        </FlexBetween>
      </Container>
    </SaleLayout>
  )
}

export default SalePage2
