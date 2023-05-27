import { SubmitForm } from "@modules/components";
import { Box, Paper, Typography } from "@mui/material";

interface AuthContainerProps {
  title: React.ReactNode;
  children: React.ReactNode;
  buttons?: React.ReactNode;
  onSubmit: Parameters<typeof SubmitForm>[0]["onSubmit"];
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  title,
  children,
  buttons,
  onSubmit,
}) => (
  <Box sx={{ display: "flex", justifyContent: "center" }}>
    <Paper sx={{ width: 1, maxWidth: 500 }}>
      <Typography variant="h4" sx={{ p: 1, textAlign: "center" }}>
        {title}
      </Typography>
      <SubmitForm onSubmit={onSubmit}>{children}</SubmitForm>
      {buttons && (
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          {buttons}
        </Box>
      )}
    </Paper>
  </Box>
);
