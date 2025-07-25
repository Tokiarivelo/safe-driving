import LoginForm from '../../../../components/auth/login/Login';

export const metadata = {
  title: 'Login', // → “Login | Safe Driving”
  description: 'Connectez-vous à votre compte Safe Driving',
};

export default function LoginPage() {
  return <LoginForm />;
}
