import { useStaffLogout } from '@modules/api';
import React from 'react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import paths from 'crmui/routes/paths';

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const { logout } = useStaffLogout();
  React.useEffect(() => {
    logout();
    deleteCookie('access_token');
    router.push(paths.login({}));
  }, [logout, router]);
  return <div>Logout...</div>;
};

export default LogoutPage;
