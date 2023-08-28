import Router from "next/router";
import { ReactElement } from "react";
import { GetStaticProps, NextPageAuth } from "next";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import { BrandRow } from "pages-sections/admin";
import useMuiTable from "hooks/useMuiTable";
import Brand from "models/Brand.model";
import api from "utils/__api__/dashboard";

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: "id", label: "ID", align: "center" },
  { id: "name", label: "Name", align: "center" },
  { id: "logo", label: "Logo", align: "center" },
  { id: "featured", label: "Featured", align: "center" },
  { id: "action", label: "Action", align: "center" },
];


type BrandListProps = { brands: Brand[] };
// =============================================================================

const BrandList:NextPageAuth = ({ brands }: BrandListProps) => {
  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredBrands = brands.map((item) => ({
    id: item.id,
    slug: item.slug,
    name: item.name,
    logo: item.image,
    featured: item.featured,
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: filteredBrands, defaultSort: "name" });

  return (
    <Box py={4}>
      <H3 mb={2}>Product Brands</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add Brand"
        searchPlaceholder="Search Brand..."
        handleBtnClick={() => Router.push("/admin/brands/create")}
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 600 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                numSelected={selected.length}
                rowCount={filteredList.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((brand) => (
                  <BrandRow brand={brand} key={brand.id} selected={selected} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(filteredList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const brands = await api.brands();
  return { props: { brands } };
};

BrandList.isAdmin = true

export default BrandList

// =============================================================================
BrandList.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================