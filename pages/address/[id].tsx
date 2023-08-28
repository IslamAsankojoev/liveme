import Link from "next/link";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Formik } from "formik";
import * as yup from "yup";
import { Place } from "@mui/icons-material";
import { Box, Button, Grid, TextField } from "@mui/material";
import Card1 from "components/Card1";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import Address from "models/Address.model";
import api from "utils/__api__/address";

// =============================================================
type Props = { address: Address };
// =============================================================

const AddressEditor: NextPage<Props> = ({ address }) => {
  const INITIAL_VALUES = {
    name: address.title || "",
    address: address.street || "",
    contact: address.phone || "",
  };

  const checkoutSchema = yup.object().shape({
    name: yup.string().required("required"),
    address: yup.string().required("required"),
    contact: yup.string().required("required"),
  });

  // handle form submit
  const handleFormSubmit = async (values: any) => {
    console.log(values);
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      href="/address"
      color="primary"
      LinkComponent={Link}
      sx={{ bgcolor: "primary.light", px: 4 }}
    >
      Back to Address
    </Button>
  );

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Place}
        button={HEADER_LINK}
        title="Edit Address"
        navigation={<CustomerDashboardNavigation />}
      />

      {/* FORM AREA */}
      <Card1>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={INITIAL_VALUES}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="Name"
                      onBlur={handleBlur}
                      value={values.name}
                      onChange={handleChange}
                      error={!!touched.name && !!errors.name}
                      helperText={(touched.name && errors.name) as string}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="address"
                      onBlur={handleBlur}
                      label="Address Line"
                      value={values.address}
                      onChange={handleChange}
                      error={!!touched.address && !!errors.address}
                      helperText={(touched.address && errors.address) as string}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="contact"
                      onBlur={handleBlur}
                      value={values.contact}
                      onChange={handleChange}
                      error={!!touched.contact && !!errors.contact}
                      helperText={(touched.contact && errors.contact) as string}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </form>
          )}
        </Formik>
      </Card1>
    </CustomerDashboardLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await api.getIds();

  return {
    paths: paths, //indicates that no page needs be created at build time
    fallback: "blocking", //indicates the type of fallback
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const address = await api.getAddress(String(params.id));
  return { props: { address } };
};

export default AddressEditor;
