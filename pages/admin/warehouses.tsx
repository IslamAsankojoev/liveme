import { ReactElement } from 'react'
import { Add, RemoveRedEye, Delete } from '@mui/icons-material'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material'
import { FlexBetween, FlexBox } from 'components/flex-box'
import VendorDashboardLayout from 'components/layouts/vendor-dashboard'
import { H3 } from 'components/Typography'
import { NextPageAuth } from 'next'
import useMuiTable from 'hooks/useMuiTable'
import Scrollbar from 'components/Scrollbar'
import TableHeader from 'components/data-table/TableHeader'
import { StyledIconButton, StyledTableCell, StyledTableRow } from 'pages-sections/admin'
import { useMutation, useQuery } from 'react-query'
import { WarehouseService } from 'api/warehouse.service'
import SearchArea from 'components/dashboard/SearchArea'
import SearchInput, { StyledTextField } from 'components/SearchInput'
import { Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import countryList from 'data/countryList'
import TableLoader from 'components/Loader/TableLoader'

const tableHeading = [
  { id: 'id', label: 'Warehouse ID', align: 'center' },
  { id: 'region', label: 'Region', align: 'center' },
  { id: 'actions', label: 'Action', align: 'center' },
]

const Warehouses: NextPageAuth = () => {
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  const {
    data: warehouses = [],
    refetch,
    isLoading,
  } = useQuery('warehouses', WarehouseService.findAll, {
    select: (data: IWarehouse[]) => data,
  })

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: warehouses, defaultSort: 'no' })

  const { mutate: createWarehouse, isLoading: mutateLoading } = useMutation(
    'warehouse mutate',
    (values: IWarehouse) => WarehouseService.create(values),
    {
      onSuccess: () => {
        refetch()
      },
    },
  )

  const { mutate: deleteWarehouse } = useMutation(
    'warehouse mutate',
    (id: number) => WarehouseService.delete(id),
    {
      onSuccess: () => {
        refetch()
      },
    },
  )

  const handleDelete = async (id: number) => {
    deleteWarehouse(id)
  }

  const initialValues = {
    region: countryList[0],
  }

  const handleFormSubmit = async (values: any) => {
    createWarehouse({
      ...values,
      region: values.region.label,
    })
  }

  return (
    <Box py={4}>
      <H3 mb={2}>Warehouses</H3>

      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput placeholder="Search Warehouses" />

        <Box>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({ values, errors, touched, handleChange, handleBlur, resetForm, setFieldValue }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleFormSubmit(values).then(() => resetForm())
                }}
              >
                <Stack direction={downSM ? 'row' : 'row'} spacing={2}>
                  <Autocomplete
                    freeSolo
                    fullWidth
                    disablePortal
                    options={countryList}
                    value={values.region}
                    getOptionLabel={(option) => option.label}
                    onChange={(_, value) => setFieldValue('region', value)}
                    renderInput={(params) => (
                      <StyledTextField
                        color="info"
                        placeholder="Select region"
                        error={!!touched.region && !!errors.region}
                        helperText={(touched.region && errors.region) as string}
                        {...params}
                      />
                    )}
                  />
                  <LoadingButton
                    loading={mutateLoading}
                    color="info"
                    type="submit"
                    fullWidth={downSM}
                    variant="contained"
                    startIcon={<Add />}
                    sx={{ px: 4 }}
                  >
                    Добавить
                  </LoadingButton>
                </Stack>
              </form>
            )}
          </Formik>
        </Box>
      </FlexBox>

      <Card>
        {isLoading ? (
          <TableLoader />
        ) : (
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TableHeader
                  order={order}
                  hideSelectBtn
                  orderBy={orderBy}
                  heading={tableHeading}
                  rowCount={warehouses?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                />

                <TableBody>
                  {filteredList?.map((warehouse: IWarehouse, index) => (
                    <StyledTableRow role="checkbox" key={index}>
                      <StyledTableCell align="center">{warehouse?.id}</StyledTableCell>
                      <StyledTableCell align="center">{warehouse?.region}</StyledTableCell>
                      <StyledTableCell align="center">
                        <StyledIconButton
                          onClick={() => {
                            handleDelete(warehouse?.id)
                          }}
                        >
                          <Delete />
                        </StyledIconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        )}

        {/* <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(warehouses?.length / rowsPerPage)}
          />
        </Stack> */}
      </Card>
    </Box>
  )
}

Warehouses.isAdmin = true

export default Warehouses

// =============================================================================
Warehouses.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>
}
// =============================================================================
