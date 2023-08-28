import { NextPage } from 'next';
import SEO from 'components/SEO';
import Login from 'pages-sections/sessions/Login';
import { FlexRowCenter } from 'components/flex-box';

const LoginPage: NextPage = () => {
  return (
    <FlexRowCenter flexDirection="column" minHeight="100vh">
      <SEO title="Login" />
      <Login />
    </FlexRowCenter>
  );
};

export default LoginPage;
