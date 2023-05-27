import { Box, Typography } from "@mui/material";
import Head from "next/head";
import React from "react";
import { AppPage } from "src/AppPage";

export default function SendRestoreLinkPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Ссылка на восстановление отправлена</title>
      </Head>
      <Typography component="h2" variant="h4">
        Ссылка на восстановление отправлена на почту
      </Typography>
      <Typography component="p" variant="subtitle1">
        На почту пользователя было отослана ссылка для восстановления пароля.
        Перейдите по ней.
      </Typography>
    </Box>
  );
}

SendRestoreLinkPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
