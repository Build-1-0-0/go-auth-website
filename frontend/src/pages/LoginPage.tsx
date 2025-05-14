import { Helmet } from '@dr.pogodin/react-helmet';
import AuthForm from '@/components/auth/AuthForm';
// Layout import is removed as it's no longer used directly here

const LoginPage: React.FC = () => {
  return (
    <> {/* Using a Fragment as the root element */}
      <Helmet>
        <title>Login - MyApp</title>
        <meta name="description" content="Log in to your MyApp account." />
      </Helmet>
      <AuthForm isLogin={true} />
    </>
  );
};

export default LoginPage;
