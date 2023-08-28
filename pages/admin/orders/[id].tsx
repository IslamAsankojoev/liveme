import { ReactElement, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { H3 } from "components/Typography";
import VendorDashboardLayout from "components/layouts/vendor-dashboard";
import { OrderDetails } from "pages-sections/admin";
import Order from "models/Order.model";
import api from "utils/__api__/dashboard";
import { NextPageAuth } from "next";


const OrderEdit:NextPageAuth = () => {
  const { query } = useRouter();
  const [orderDetails, setOrderDetails] = useState<Order>(null);

  useEffect(() => {
    api.getOrder(query.id as string).then((data) => setOrderDetails(data));
  }, [query.id]);

  if (!orderDetails) {
    return <h1>Loading...</h1>;
  }

  return (
    <Box py={4}>
      <H3 mb={2}>Order Details</H3>
      <OrderDetails order={orderDetails} />
    </Box>
  );
}

OrderEdit.isAdmin = true

export default OrderEdit;

// =============================================================================
OrderEdit.getLayout = function getLayout(page: ReactElement) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
};
// =============================================================================
