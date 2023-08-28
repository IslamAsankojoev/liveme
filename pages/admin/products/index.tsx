import Router from "next/router";
import { ReactElement } from "react";
import { GetStaticProps, NextPageAuth } from "next";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import Scrollbar from "components/Scrollbar";
import { ProductRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";
import Product from "models/Product.model";
import { useQuery } from "react-query";
import { ProductServices } from "api/product.service";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "name", label: "Name", align: "left" },
  { id: "category", label: "Category", align: "left" },
  { id: "price", label: "Price", align: "left" },
  { id: "sale_price", label: "Sale Price", align: "left" },
  { id: "published", label: "Published", align: "left" },
  { id: "action", label: "Action", align: "center" },
];


type ProductListProps = { products: Product[] };
// =============================================================================

const ProductList:NextPageAuth = () => {
  const { data: products, refetch } = useQuery('products list', ProductServices.findAll, {
    select: (data: IProduct[]) => data,
    cacheTime: 0,
    staleTime: 0,
  })

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredProducts: IProduct[] = products?.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    image: item.sale_price,
    published: item.published,
    category: item.category,
    sale_price: item.sale_price,
    gallery: item.gallery,
    rating: item.rating,
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: filteredProducts });

  return (
    <Box py={4}>
      <H3 mb={2}>Product List</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Product"
        searchPlaceholder="Search Product..."
        handleBtnClick={() => Router.push("/admin/products/create")}
      />

      <Card>
        <Scrollbar autoHide={false}>
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={products?.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList?.map((product, index) => (
                  <ProductRow product={product} key={index} refetch={refetch} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(products?.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}

// export const getStaticProps: GetStaticProps = async () => {
//   const products = await api.products();
//   return { props: { products } };
// };

ProductList.isAdmin = true

export default ProductList;

// =============================================================================
ProductList.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
