import {
  setAuthHeader,
  useAxiosContext,
  useSignupAccept,
} from "@modules/axios-hooks";
import { ListError } from "@modules/components";
import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import * as paths from "src/paths";
import { setCookie } from "cookies-next";

export default function SignupPage() {
  const router = useRouter();
  const userId = router.query.id as string;
  const token = router.query.token as string;
  const { singupAccept, errorSignupAcceptData } = useSignupAccept();
  const axiosInstance = useAxiosContext();
  React.useEffect(() => {
    if (!userId || !token) {
      return;
    }
    singupAccept({ token, user_id: userId }).then(
      (response) => {
        setCookie("access_token", response.data.token);
        setAuthHeader(axiosInstance, response.data.token);
        router.push(paths.root({}));
      },
      () => {}
    );
  }, [axiosInstance, router, singupAccept, token, userId]);
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Подтверждение почты</title>
      </Head>
      <Box>
        <Typography variant="h4" component="h2">
          {errorSignupAcceptData
            ? "Не удалось подтвердить почту"
            : "Подтверждение почты"}
        </Typography>
        <ListError error={errorSignupAcceptData?.token} />
        <ListError error={errorSignupAcceptData?.user_id} />
        <ListError error={errorSignupAcceptData?.non_field_errors} />
      </Box>
    </Box>
  );
}

SignupPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
