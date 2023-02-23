import { Box, Typography } from "@mui/material";
import { AppPage } from "../../src/AppPage";
import { EmailLink } from "../../src/Contacts";

export default function CopyrightPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography component="h1" variant="h3">
        Обратная связь
      </Typography>
      <p>
        Просим Вас обращаться по почте: <EmailLink />
      </p>
    </Box>
  );
}

CopyrightPage.getLayout = function (page: React.ReactElement) {
  return <AppPage>{page}</AppPage>;
};
