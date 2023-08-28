import { useCallback, useState, FC } from 'react';
import { Button, Card, CardProps, Box, styled } from '@mui/material';
import Link from 'next/link';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { H1, H6 } from 'components/Typography';
import BazaarImage from 'components/BazaarImage';
import BazaarTextField from 'components/BazaarTextField';
import SocialButtons from './SocialButtons';
import EyeToggleButton from './EyeToggleButton';
import { FlexBox, FlexRowCenter } from 'components/flex-box';
import { signIn } from 'next-auth/react';
import axiosInstance from 'api/axios.config';
import { AuthService } from 'api/auth.service';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

const fbStyle = { background: '#3B5998', color: 'white' };
const googleStyle = { background: '#4285F4', color: 'white' };

type WrapperProps = { passwordVisibility?: boolean };

export const Wrapper = styled<FC<WrapperProps & CardProps>>(
  ({ children, passwordVisibility, ...rest }) => <Card {...rest}>{children}</Card>,
)<CardProps>(({ theme, passwordVisibility }) => ({
  width: 500,
  minWidth: 400,
  padding: '2rem 3rem',
  [theme.breakpoints.down('sm')]: { width: '100%' },
  '.passwordEye': {
    color: passwordVisibility ? theme.palette.grey[600] : theme.palette.grey[400],
  },
  '.facebookButton': { marginBottom: 10, ...fbStyle, '&:hover': fbStyle },
  '.googleButton': { ...googleStyle, '&:hover': googleStyle },
  '.agreement': { marginTop: 12, marginBottom: 24 },
}));

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleFormSubmit = async (values: ILoginRequest) => {
    const response = await signIn('credentials', { redirect: false, ...values })
    if (response.status === 401) {
      enqueueSnackbar('Не верное имя пользователя или пароль', {
        variant: 'error',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    } else if (response.status === 200) {
      enqueueSnackbar('Вы успешно авторизовались', {
        variant: 'success',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
      });
    }
    
    router.push(router.asPath === '/' ? '/profile' : router.asPath);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema: formSchema,
  });

  return (
    <Wrapper elevation={3} passwordVisibility={passwordVisibility}>
      <form onSubmit={handleSubmit}>
        <BazaarImage src="/assets/images/livemeLogo.webp" sx={{ m: 'auto', width: 140 }} />

        <H1 textAlign="center" mt={1} mb={4} fontSize={16}>
          Welcome To Liveme
        </H1>

        <BazaarTextField
          mb={1.5}
          fullWidth
          name="name"
          size="small"
          type="text"
          variant="outlined"
          onBlur={handleBlur}
          value={values.name}
          onChange={handleChange}
          label="Name"
          placeholder="Иван Иванов"
          error={!!touched.name && !!errors.name}
          helperText={(touched.name && errors.name) as string}
        />

        <BazaarTextField
          mb={2}
          fullWidth
          size="small"
          name="password"
          label="Password"
          autoComplete="on"
          variant="outlined"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          placeholder="*********"
          type={passwordVisibility ? 'text' : 'password'}
          error={!!touched.password && !!errors.password}
          helperText={(touched.password && errors.password) as string}
          InputProps={{
            endAdornment: (
              <EyeToggleButton show={passwordVisibility} click={togglePasswordVisibility} />
            ),
          }}
        />

        <Button fullWidth type="submit" color="primary" variant="contained" sx={{ height: 44 }}>
          Login
        </Button>
      </form>

      {/* <SocialButtons /> */}

      <FlexRowCenter mt="1.25rem">
        <Box>Don&apos;t have account?</Box>
        <Link href="/signup">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Sign Up
          </H6>
        </Link>
      </FlexRowCenter>

      <FlexBox justifyContent="center" bgcolor="grey.200" borderRadius="4px" py={2.5} mt="1.25rem">
        Forgot your password?
        <Link href="/reset-password">
          <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
            Reset It
          </H6>
        </Link>
      </FlexBox>
    </Wrapper>
  );
};

const initialValues = { name: '', password: '' };

const formSchema = yup.object().shape({
  password: yup.string().required('Password is required'),
  name: yup.string().required('Name is required'),
});

export default Login;
