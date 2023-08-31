import { ReactElement } from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { BrandForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { NextPageAuth } from "next";
// import api from "utils/__api__/products";


const INITIAL_VALUES = {
  name: "",
  featured: false,
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
});

const CreateBrand: NextPageAuth = () => {
  const handleFormSubmit = () => { };

  return (
    <Box py={4}>
      <H3 mb={2}>Create New Brand</H3>

      <BrandForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}

CreateBrand.isAdmin = true

export default CreateBrand;

// =============================================================================
CreateBrand.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
