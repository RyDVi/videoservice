import LoginView from 'crmui/elements/views/LoginView';
import paths from 'crmui/routes/paths';

const LoginPage: React.FC = () => {
  return <LoginView redirectTo={paths.home({})}></LoginView>;
};

export default LoginPage;
