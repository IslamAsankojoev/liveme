import { ReactElement } from "react";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { CategoryForm } from "pages-sections/admin";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { NextPageAuth } from "next";
// import api from "utils/__api__/products";


const CreateCategory:NextPageAuth = () => {
  const INITIAL_VALUES = {
    name: "",
    parent: [],
    featured: false,
  };

  // form field validation schema
  const validationSchema = yup.object().shape({
    name: yup.string().required("required"),
  });

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Create Category</H3>

      <CategoryForm
        initialValues={INITIAL_VALUES}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}

CreateCategory.isAdmin = true

export default CreateCategory;

// =============================================================================
CreateCategory.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
