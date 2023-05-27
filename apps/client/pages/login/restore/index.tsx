import { api } from "@modules/api";
import { useSendEmailForRestore } from "@modules/axios-hooks";
import { Box, Button } from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import { AuthContainer, RestorePasswordForm } from "src/auth";
import * as paths from "src/paths";

export default function RestorePage() {
  const {
    isLoadingRestoreEmail,
    restoreEmailData,
    restoreEmailError,
    sendEmailForRestore,
    setRestoreEmailData,
  } = useSendEmailForRestore();
  const router = useRouter();
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Восстановаление пароля</title>
      </Head>
      <AuthContainer
        title="Восстановаление пароля"
        buttons={
          <Button LinkComponent={Link} href={paths.login({})}>
            Вернуться к авторизации
          </Button>
        }
        onSubmit={() =>
          sendEmailForRestore().then(() =>
            router.push(paths.sendRestoreLinkSuccess({}))
          )
        }
      >
        <RestorePasswordForm
          data={restoreEmailData}
          onChange={setRestoreEmailData}
          errors={restoreEmailError}
        />
      </AuthContainer>
    </Box>
  );
}

RestorePage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
