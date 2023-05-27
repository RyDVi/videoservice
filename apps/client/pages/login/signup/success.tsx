import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import { AppPage } from "src/AppPage";

export default function SignupPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Зарегистрирован успешно</title>
      </Head>
      <Typography component="h2" variant="h4">
        Зарегистрирован успешно
      </Typography>
      <Typography component="p" variant="subtitle1">
        На указанную почту было отослана ссылка для подтверждения регистрации.
        Перейдите по ней.
      </Typography>
    </Box>
  );
}

SignupPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
