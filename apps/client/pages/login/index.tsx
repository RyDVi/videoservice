import { Box, Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import { AuthContainer, LoginForm } from "src/auth";
import * as paths from "src/paths";
import { setCookie } from "cookies-next";
import { setAuthHeader, useAxiosContext, useLogin } from "@modules/axios-hooks";

export default function LoginPage() {
  const { login, errorOflogin, loading, loginData, setLoginData } = useLogin();
  const router = useRouter();
  const axiosInstance = useAxiosContext();

  // TOOD: добавть лоадер
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Авторизация</title>
      </Head>
      <AuthContainer
        title="Авторизация"
        buttons={
          <>
            <Button LinkComponent={Link} href={paths.signup({})}>
              Зарегистрироваться
            </Button>
            <Button LinkComponent={Link} href={paths.sendRestoreLink({})}>
              Не помню пароль
            </Button>
          </>
        }
        onSubmit={() =>
          login().then(
            ({ data: { token } }) => {
              setCookie("access_token", token);
              setAuthHeader(axiosInstance, token);
              router.push(paths.root({}));
            },
            () => {}
          )
        }
      >
        <LoginForm
          data={loginData}
          onChange={setLoginData}
          errors={errorOflogin}
        />
      </AuthContainer>
    </Box>
  );
}

LoginPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
