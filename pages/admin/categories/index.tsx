import Router from 'next/router';
import { ReactElement } from 'react';
import { GetStaticProps, NextPageAuth } from 'next';
import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableContainer,
  TextField,
  Theme,
  useMediaQuery,
} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import SearchArea from 'components/dashboard/SearchArea';
import TableHeader from 'components/data-table/TableHeader';
import TablePagination from 'components/data-table/TablePagination';
import VendorDashboardLayout from 'components/layouts/vendor-dashboard';
import { H3 } from 'components/Typography';
import useMuiTable from 'hooks/useMuiTable';
import Scrollbar from 'components/Scrollbar';
import { CategoryRow } from 'pages-sections/admin';
import Category from 'models/Category.model';
import api from 'utils/__api__/dashboard';
import { FlexBox } from 'components/flex-box';
import SearchInput, { StyledTextField } from 'components/SearchInput';
import { Add } from '@mui/icons-material';
import { Formik, useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation, useQuery } from 'react-query';
import { CategoryService } from 'api/category.service';
import TableLoader from 'components/Loader/TableLoader';
import { LoadingButton } from '@mui/lab';

// TABLE HEADING DATA LIST
const tableHeading = [
  { id: 'id', label: 'ID', align: 'left' },
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'image', label: 'Image', align: 'left' },
  { id: 'featured', label: 'Featured', align: 'left' },
  { id: 'action', label: 'Action', align: 'center' },
];

type CategoryListProps = { categories: Category[] };
// =============================================================================

const CategoryList: NextPageAuth = (props: CategoryListProps) => {
  // const { categories } = props;
  const downSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const {data:categories = [], refetch, isLoading} = useQuery('categories', CategoryService.findAll, {
    select: (data: ICategory[]) => data,
  })

  // RESHAPE THE PRODUCT LIST BASED TABLE HEAD CELL ID
  const filteredCategories = categories.map((item) => ({
    id: item.id,
    name: item.name,
    slug: item.name + '-slug',
    image: '',
    featured: true,
  }));

  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({ listData: filteredCategories });

  const {mutate, isLoading: mutateLoading} = useMutation('create category', (values: ICategory)=> CategoryService.create(values), {
    onSuccess: () => {
      refetch();
    }
  })

  const initialValues = {
    name: '',
  };

  const handleFormSubmit = async (values: any) => {
    mutate(values);
  };

  return (
    <Box py={4}>
      <H3 mb={2}>Product Categories</H3>

      <FlexBox mb={2} gap={2} justifyContent="space-between" flexWrap="wrap">
        <SearchInput placeholder="Поиск категории" />

        <Box>
          <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
            {({ values, errors, touched, handleChange, handleBlur, resetForm }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFormSubmit(values).then(() => resetForm())
                }}
              >
                <Stack direction={downSM ? 'row' : 'row'} spacing={2}>
                  <StyledTextField
                    fullWidth
                    name="name"
                    color="info"
                    size="small"
                    placeholder="Name"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={(touched.name && errors.name) as string}
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
      <Box sx={{minHeight:'calc(100vh - 400px)'}}>

      {isLoading ? (
            <TableLoader/>
          ) : (
        <Scrollbar >
         
          <TableContainer sx={{ minWidth: 900 }}>
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={categories.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((category) => (
                  <CategoryRow item={category} key={category.id} selected={selected} refetch={refetch}/>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>
          )}



        <Stack alignItems="center" my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(categories.length / rowsPerPage)}
          />
        </Stack>
      </Box>

      </Card>

    </Box>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const categories = await api.category();
  return { props: { categories } };
};

CategoryList.isAdmin = true;

export default CategoryList;

// =============================================================================
CategoryList.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
