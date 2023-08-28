import { ReactElement } from "react";
import { GetStaticProps, NextPageAuth } from "next";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { SellerRow } from "pages-sections/admin";
import api from "utils/__api__/dashboard";

// table column list
const tableHeading = [
  { id: "name", label: "Seller Name", align: "left" },
  { id: "shopName", label: "Shop Name", align: "left" },
  { id: "package", label: "Current Package", align: "left" },
  { id: "balance", label: "Current Balance", align: "left" },
  { id: "published", label: "Shop Published", align: "left" },
  { id: "action", label: "Action", align: "center" },
];


type SellerListProps = { sellers: any[] };
// =============================================================================

const SellerList:NextPageAuth = ({ sellers }: SellerListProps) => {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: sellers });

  return (
    <Box py={4}>
      <H3 mb={2}>Sellers</H3>

      <SearchArea
        handleSearch={() => {}}
        buttonText="Add New Seller"
        handleBtnClick={() => {}}
        searchPlaceholder="Search Seller..."
      />

      <Card>
        <Scrollbar>
          <TableContainer sx={{ minWidth: 1100 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={sellers.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((seller, index) => (
                  <SellerRow seller={seller} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(sellers.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const sellers = await api.sellers();
  return { props: { sellers } };
};

SellerList.isAdmin = true

export default SellerList;

// =============================================================================
SellerList.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
