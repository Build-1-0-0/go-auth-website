// frontend/src/pages/RegisterPage.tsx
import { Helmet } from '@dr.pogodin/react-helmet';
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