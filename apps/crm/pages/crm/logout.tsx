import { useStaffLogout } from "@modules/axios-hooks";
import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import * as paths from "src/paths";

const LogoutPage: React.FC = () => {
  const router = useRouter();
  const { logout } = useStaffLogout();
  React.useEffect(() => {
    logout();
    deleteCookie("access_token");
    router.push(paths.login({}));
  }, [logout, router]);
  return <div>Logout...</div>;
};

export default LogoutPage;
