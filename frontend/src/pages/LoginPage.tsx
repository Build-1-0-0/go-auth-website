import { Helmet } from 'react-helmet-async';
import AuthForm from '@/components/auth/AuthForm';
import Layout from '@/components/layout/Layout';

const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Login - MyApp</title>
        <meta name="description" content="Log in to your MyApp account." />
      </Helmet>
      <AuthForm isLogin={true} />
    </Layout>
  );
};

export default LoginPage;