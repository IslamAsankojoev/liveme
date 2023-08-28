import Link from "next/link";
import { GetStaticProps, NextPageAuth } from "next";
import { format } from "date-fns";
import { Person } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import TableRow from "components/TableRow";
import { H3, H5, Small } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import { currency } from "lib";
import api from "utils/__api__/users";
import User from "models/User.model";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useSnackbar } from "notistack";
import { useActions } from "hooks/useActions";

// ============================================================
type ProfileProps = { user: User };
// ============================================================

const Profile: NextPageAuth<ProfileProps> = () => {
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
  const { user } = useTypedSelector((state) => state.userStore);
  const { enqueueSnackbar } = useSnackbar()
  const { logout } = useActions()

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Stack spacing={1} direction={{
      xs: 'column',
      sm: 'column',
      md: 'row',
      lg: 'row',
      xl: 'row',
    }}>
    <Button
      color="primary"
      LinkComponent={Link}
      href={`/profile/${user?.id}`}
      sx={{ px: 4, bgcolor: "primary.light" }}
    >
      Edit Profile
    </Button>
    <Button 
    color="error"
    LinkComponent={Link}
    onClick={logout}
    sx={{ px: 4, bgcolor: "error.light" }}
    >
      Logout
    </Button>
    </Stack>
  );

  const infoList = [
    { title: "16", subtitle: "All Orders" },
    { title: "02", subtitle: "Awaiting Payments" },
    { title: "00", subtitle: "Awaiting Shipment" },
    { title: "01", subtitle: "Awaiting Delivery" },
  ];

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="My Profile"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* USER PROFILE INFO */}
      <Box mb={4}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Card
              sx={{
                display: "flex",
                p: "14px 32px",
                height: "100%",
                alignItems: "center",
              }}
            >
              <Avatar src={null} sx={{ height: 64, width: 64 }} />

              <Box ml={1.5} flex="1 1 0">
                <FlexBetween flexWrap="wrap">
                  <div>
                    <H5 my="0px">{`${user?.name}`}</H5>
                    <FlexBox alignItems="center">
                      <Typography color="grey.600">Balance:</Typography>
                      <Typography ml={0.5} color="primary.main">
                        {currency(500)}
                      </Typography>
                    </FlexBox>
                  </div>

                  <Typography color="grey.600" letterSpacing="0.2em" textTransform='capitalize'>
                    {user?.role?.name}
                  </Typography>
                </FlexBetween>
              </Box>
            </Card>
          </Grid>

          <Grid item md={6} xs={12}>
            <Grid container spacing={4}>
              {infoList.map((item) => (
                <Grid item lg={3} sm={6} xs={6} key={item.subtitle}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      p: "1rem 1.25rem",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <H3 color="primary.main" my={0} fontWeight={600}>
                      {item.title}
                    </H3>

                    <Small color="grey.600" textAlign="center">
                      {item.subtitle}
                    </Small>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <TableRow
        sx={{
          cursor: "auto",
          p: "0.75rem 1.5rem",
          ...(downMd && {
            alignItems: "start",
            flexDirection: "column",
            justifyContent: "flex-start",
          }),
        }}
      >
        <TableRowItem title="Name" value={user?.name} />
        {/* <TableRowItem title="Last Name" value={user.name.lastName} /> */}
        <TableRowItem title="Email" value={user?.email} />
        <TableRowItem title="Phone" value={user?.phone} />
        {/* <TableRowItem
          title="Birth date"
          value={format(new Date(user.dateOfBirth), "dd MMM, yyyy")}
        /> */}
      </TableRow>
    </CustomerDashboardLayout>
  );
};

const TableRowItem = ({ title, value }) => {
  return (
    <FlexBox flexDirection="column" p={1}>
      <Small color="grey.600" mb={0.5} textAlign="left">
        {title}
      </Small>
      <span>{value}</span>
    </FlexBox>
  );
};

// export const getStaticProps: GetStaticProps = async () => {
//   const user = await api.getUser();
//   return { props: { user } };
// };

export default Profile;

Profile.isClient = true;