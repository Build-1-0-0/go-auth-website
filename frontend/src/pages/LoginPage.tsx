import { Helmet } from '@dr.pogodin/react-helmet';
import AuthForm from '@/components/auth/AuthForm';

const LoginPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Login - MyApp</title>
        <meta name="description" content="Log in to your MyApp account." />
      </Helmet>
      <AuthForm isLogin={true} />
    </>
  );
};

export default LoginPage;