import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Card,
  Container,
  Grid,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import { RemoveRedEye } from "@mui/icons-material";
import Code from "components/Code";
import Scrollbar from "components/Scrollbar";
import { H1, Span } from "components/Typography";
import DocsLayout from "components/layouts/DocsLayout";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "pages-sections/admin";
import useMuiTable from "hooks/useMuiTable";
import api from "utils/__api__/dashboard";
import { currency } from "lib";

// table column list
const tableHeading = [
  { id: "no", label: "No", align: "left" },
  { id: "orderNo", label: "Order No", align: "left" },
  { id: "shopName", label: "Shop Name", align: "left" },
  { id: "adminCommission", label: "Admin Commission", align: "center" },
  { id: "sellerEarning", label: "Seller Earning", align: "center" },
  { id: "date", label: "Date", align: "left" },
  { id: "action", label: "Action", align: "center" },
];

const DataTables = () => {
  const [data, setData] = useState([]);

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: data, defaultSort: "no" });

  const fetchData = useCallback(async () => {
    const data = await await api.earningHistory();
    setData(data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <DocsLayout>
      <Box bgcolor="grey.300" py={5}>
        <Container>
          <H1>Data Tables</H1>

          <Box fontWeight={600} component="li" mt={2}>
            Hook: <Code>src/hooks/useMuiTable</Code>
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Table: <Code>@mui/material/Table</Code>
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Table Body: <Code>@mui/material/TableBody</Code>
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Table Header: <Code>src/components/data-table/TableHeader</Code>
          </Box>

          <Box fontWeight={600} component="li" mt={1}>
            Table Pagination:{" "}
            <Code>src/components/data-table/TablePagination</Code>
          </Box>
        </Container>
      </Box>

      <Container sx={{ py: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 1100 }}>
                  <Table>
                    <TableHeader
                      order={order}
                      hideSelectBtn
                      orderBy={orderBy}
                      heading={tableHeading}
                      rowCount={data.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                    />

                    <TableBody>
                      {filteredList.map((item, index) => (
                        <StyledTableRow role="checkbox" key={index}>
                          <StyledTableCell align="left">
                            {item.no}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.orderNo}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.shopName}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {currency(item.adminCommission)}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {currency(item.sellerEarning)}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {item.date}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            <StyledIconButton>
                              <RemoveRedEye />
                            </StyledIconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>

              <Stack alignItems="center" my={4}>
                <TablePagination
                  onChange={handleChangePage}
                  count={Math.ceil(data.length / rowsPerPage)}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </DocsLayout>
  );
};

export default DataTables;
