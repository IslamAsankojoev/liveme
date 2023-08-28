import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, NextPageAuth } from "next";
import { Formik } from "formik";
import * as yup from "yup";
import addDays from "date-fns/addDays";
import parseISO from "date-fns/parseISO";
import { CameraEnhance, Person } from "@mui/icons-material";
import { Avatar, Box, Button, Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Card1 from "components/Card1";
import { FlexBox } from "components/flex-box";
import UserDashboardHeader from "components/header/UserDashboardHeader";
import CustomerDashboardLayout from "components/layouts/customer-dashboard";
import CustomerDashboardNavigation from "components/layouts/customer-dashboard/Navigations";
import api from "utils/__api__/users";
import User from "models/User.model";
import { useTypedSelector } from "hooks/useTypedSelector";
import { useMutation } from "react-query";
import { AuthService } from "api/auth.service";
import { useSnackbar } from "notistack";

// ===========================================================
type Props = { user: User };
// ===========================================================
const ProfileEditor: NextPageAuth<Props> = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {user} = useTypedSelector((state) => state.userStore);
  const router = useRouter();

  const INITIAL_VALUES = {
    email: user?.email || "",
    phone: user?.phone || "",
    name: user?.name || "",
  };

  const checkoutSchema = yup.object().shape({
    first_name: yup.string().required("required"),
    last_name: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    contact: yup.string().required("required"),
    birth_date: yup.date().required("invalid date"),
  });

  const {mutate} = useMutation('update me',(values:IUser)=>AuthService.updateMe(values), {
    onSuccess: (data) => {
      enqueueSnackbar("Profile updated successfully", { variant: "success" });
      router.push('/profile');
    }
  })

  const handleFormSubmit = async (values: any) => {
    mutate(values);
    
  };

  // SECTION TITLE HEADER LINK
  const HEADER_LINK = (
    <Button
      href="/profile"
      color="primary"
      LinkComponent={Link}
      sx={{ px: 4, bgcolor: "primary.light" }}
    >
      Back to Profile
    </Button>
  );

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <CustomerDashboardLayout>
      {/* TITLE HEADER AREA */}
      <UserDashboardHeader
        icon={Person}
        title="Edit Profile"
        button={HEADER_LINK}
        navigation={<CustomerDashboardNavigation />}
      />

      {/* PROFILE EDITOR FORM */}
      <Card1>
        {/* <FlexBox alignItems="flex-end" mb={3}>
          <Avatar
            src="/assets/images/faces/ralph.png"
            sx={{ height: 64, width: 64 }}
          />

          <Box ml={-2.5}>
            <label htmlFor="profile-image">
              <Button
                component="span"
                color="secondary"
                sx={{
                  p: "8px",
                  height: "auto",
                  bgcolor: "grey.300",
                  borderRadius: "50%",
                }}
              >
                <CameraEnhance fontSize="small" />
              </Button>
            </label>
          </Box>

          <Box display="none">
            <input
              onChange={(e) => console.log(e.target.files)}
              id="profile-image"
              accept="image/*"
              type="file"
            />
          </Box>
        </FlexBox> */}

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
            <form onSubmit={(e)=>{
              e.preventDefault();
              handleFormSubmit(values);
            }}>
              <Box mb={4}>
                <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="name"
                      label="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.name}
                      error={!!touched.name && !!errors.name}
                      helperText={
                        (touched.name && errors.name) as string
                      }
                    />
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="last_name"
                      label="Last Name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name}
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={
                        (touched.last_name && errors.last_name) as string
                      }
                    />
                  </Grid> */}

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      name="email"
                      type="email"
                      label="Email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
                      error={!!touched.email && !!errors.email}
                      helperText={(touched.email && errors.email) as string}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      fullWidth
                      label="Phone"
                      name="phone"
                      onBlur={handleBlur}
                      value={values.phone}
                      onChange={handleChange}
                      error={!!touched.phone && !!errors.phone}
                      helperText={(touched.phone && errors.phone) as string}
                    />
                  </Grid>

                  {/* <Grid item md={6} xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Birth Date"
                        // maxDate={new Date()}
                        value={addDays(parseISO(values.date), 1)}
                        onChange={(newValue) =>
                          setFieldValue("birth_date", newValue)
                        }
                        slots={{ textField: TextField }}
                        slotProps={{
                          textField: {
                            sx: { mb: 1 },
                            size: "small",
                            fullWidth: true,
                            value: values.date,
                            helperText: (touched.birth_date &&
                              errors.birth_date) as string,
                            error: Boolean(
                              !!touched.birth_date && !!errors.birth_date
                            ),
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid> */}
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

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = await api.getUserIds();

//   return {
//     paths: paths, //indicates that no page needs be created at build time
//     fallback: "blocking", //indicates the type of fallback
//   };
// };

// export const getStaticProps: GetStaticProps = async () => {
//   const user = await api.getUser();
//   return { props: { user } };
// };

ProfileEditor.isClient = true;
export default ProfileEditor;
