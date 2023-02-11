import { LoginView, paths } from "crmui";

const LoginPage: React.FC = () => {
  return <LoginView redirectTo={paths.home({})}></LoginView>;
};

export default LoginPage;
