import { Helmet } from 'react-helmet-async';
import AuthForm from '@/components/auth/AuthForm';
import Layout from '@/components/layout/Layout';

const RegisterPage: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Register - MyApp</title>
        <meta name="description" content="Create a new account to access MyApp." />
      </Helmet>
      <AuthForm isLogin={false} />
    </Layout>
  );
};

export default RegisterPage;