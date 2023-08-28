import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox, Box, FormControlLabel } from '@mui/material';
import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { H1, H6 } from 'components/Typography';
import BazaarImage from 'components/BazaarImage';
import BazaarTextField from 'components/BazaarTextField';
import { FlexBox, FlexRowCenter } from 'components/flex-box';
import { Wrapper } from './Login';
import SocialButtons from './SocialButtons';
import EyeToggleButton from './EyeToggleButton';
import { useMutation } from 'react-query';
import { AuthService } from 'api/auth.service';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const Signup: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [requestError, setRequestError] = useState({
    errorMessage: '',
    status: '',
    fieldName: '',
  });
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const { mutate } = useMutation(
    'register',
    (values: IRegisterRequest) => AuthService.register(values),
    {
      onSuccess: () => {
        enqueueSnackbar('Вы успешно зарегистрировались', {
          variant: 'success',
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
        router.push('/login');
      },
      onError: (error: any) => {
        setRequestError({
          errorMessage: error.response.data.errorMessage,
          status: error.response.data.status,
          fieldName: error.response.data.fieldName,
        })
      }
    },
  );

  const handleFormSubmit = async (values: any) => {
    mutate(values);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/livemeLogo.webp" sx={{ width: 140, m: '0 auto' }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Create Your Account
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          label="Name"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          placeholder="Ivan"
          error={!!touched.name && !!errors.name || requestError.fieldName === 'name'}
          helperText={(touched.name && errors.name) as string || requestError.fieldName === 'name' && requestError.errorMessage}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="email"
          size="small"
          type="email"
          variant="outlined"
          onBlur={handleBlur}
          value={values.email}
          onChange={handleChange}
          label="Email "
          placeholder="exmple@mail.com"
          error={!!touched.email && !!errors.email || requestError.fieldName === 'email'}
          helperText={(touched.email && errors.email) as string || requestError.fieldName === 'email' && requestError.errorMessage}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="phone"
          size="small"
          type="phone"
          variant="outlined"
          onBlur={handleBlur}
          value={values.phone}
          onChange={handleChange}
          label=" Phone Number"
          placeholder="+996 707 ХХХ ХХ"
          error={!!touched.phone && !!errors.phone}
          helperText={(touched.phone && errors.phone) as string}
        />

        <BazaarTextField
          mb={1.5}
          fullWidth
          size="small"
          name="password"
          label="Password"
          variant="outlined"
          autoComplete="on"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          type={passwordVisibility ? 'text' : 'password'}
          error={!!touched.password && !!errors.password}
          helperText={(touched.password && errors.password) as string}
          InputProps={{
            endAdornment: (
              <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
            ),
          }}
        />

        <BazaarTextField
          fullWidth
          size="small"
          autoComplete="on"
          name="re_password"
          variant="outlined"
          label="Retype Password"
          placeholder="*********"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password}
          type={passwordVisibility ? 'text' : 'password'}
          error={!!touched.re_password && !!errors.re_password}
          helperText={(touched.re_password && errors.re_password) as string}
          InputProps={{
            endAdornment: (
              <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
            ),
          }}
        />

        <FormControlLabel
          name="agreement"
          className="agreement"
          onChange={handleChange}
          control={<Checkbox size="small" color="secondary" checked={values.agreement || false} />}
          label={
            <FlexBox flexWrap="wrap" alignItems="center" justifyContent="flex-start">
              By signing up, you agree to
              <a href="/" target="_blank" rel="noreferrer noopener">
                <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                  Terms & Condition
                </H6>
              </a>
            </FlexBox>
          }
        />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{ height: 44 }}>
          Create Account
        </Button>
      </form>

      {/* <SocialButtons /> */}
      <FlexRowCenter mt="1.25rem">
        <Box>Already have an account?</Box>
        <Link href="/login">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Login
          </H6>
        </Link>
      </FlexRowCenter>
    </Wrapper>
  );
};

const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  re_password: '',
  agreement: false,
};

const formSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  password: yup.string().required('Password is required'),
  re_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Please re-type password'),
  agreement: yup
    .bool()
    .test(
      'agreement',
      'You have to agree with our Terms and Conditions!',
      (value) => value === true,
    )
    .required('You have to agree with our Terms and Conditions!'),
});

export default Signup;
