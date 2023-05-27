import { api } from "@modules/api";
import { useSignup } from "@modules/axios-hooks";
import { useMainStoreContext } from "@modules/stores";
import { Box, Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import { AuthContainer, SignupForm } from "src/auth";
import * as paths from "src/paths";

export default function SignupPage() {
  const { userStore } = useMainStoreContext();
  const router = useRouter();
  const { isLoadingSignup, setSignupData, signup, signupData, signupError } =
    useSignup();

  // TODO: добавить лоадер
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Регистрация</title>
      </Head>
      <AuthContainer
        title="Регистрация"
        buttons={
          <Button LinkComponent={Link} href={paths.login({})}>
            Вернуться к авторизации
          </Button>
        }
        onSubmit={() =>
          signup().then(() => router.push(paths.signupSuccess({})))
        }
      >
        <SignupForm
          data={signupData}
          onChange={setSignupData}
          errors={signupError}
        />
      </AuthContainer>
    </Box>
  );
}

SignupPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
