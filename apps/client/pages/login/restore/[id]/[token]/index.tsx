import { useSetNewPassword } from "@modules/axios-hooks";
import { ListError } from "@modules/components";
import { Box } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { AppPage } from "src/AppPage";
import { AuthContainer, NewPasswordForm } from "src/auth";
import * as paths from "src/paths";

export default function NewPassowrdPage() {
  const router = useRouter();
  const userId = router.query.id as string;
  const token = router.query.token as string;
  const {
    isLoadingSetNewPassword,
    newPasswordData,
    newPasswordError,
    sendNewPassword,
    setNewPasswordData,
  } = useSetNewPassword();
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Новый пароль</title>
      </Head>
      <Box>
        <AuthContainer
          title="Новый пароль"
          onSubmit={() =>
            sendNewPassword({
              ...newPasswordData,
              token,
              user_id: userId,
            }).then(
              () => router.push(paths.login({})),
              () => {}
            )
          }
        >
          <NewPasswordForm
            data={newPasswordData}
            onChange={setNewPasswordData}
            errors={newPasswordError}
          />
        </AuthContainer>
        <ListError error={newPasswordError?.token} />
        <ListError error={newPasswordError?.user_id} />
        <ListError error={newPasswordError?.non_field_errors} />
      </Box>
    </Box>
  );
}

NewPassowrdPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
