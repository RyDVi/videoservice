import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { AppPage } from "../../src/AppPage";
import { EmailLink } from "../../src/Contacts";

export default function FeedbackPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Head>
        <title>Обратная связь</title>
      </Head>
      <Typography component="h1" variant="h3">
        Обратная связь
      </Typography>
      <p>
        Просим Вас обращаться по почте: <EmailLink />
      </p>
    </Box>
  );
}

FeedbackPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
