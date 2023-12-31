import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
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

const EditBrand:NextPageAuth = () => {
  const { query } = useRouter();
  const [brand, setBrand] = useState({ ...INITIAL_VALUES });

  // useEffect(() => {
  //   api.getProduct(query.slug as string).then((data) => {
  //     setProduct((state) => ({
  //       ...state,
  //       name: data.title,
  //       price: data.price,
  //       category: data.categories,
  //     }));
  //   });
  // }, [query.slug]);

  const handleFormSubmit = () => {};

  return (
    <Box py={4}>
      <H3 mb={2}>Edit Brand</H3>

      <BrandForm
        initialValues={brand}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}

EditBrand.isAdmin = true

export default EditBrand;

// =============================================================================
EditBrand.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
