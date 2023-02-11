import { Box, Paper, PaperProps } from "@mui/material";

interface ContentContainerProps extends PaperProps {}

export const PageContent: React.FC<ContentContainerProps> = ({
  children,
  ...props
}) => {
  return (
    <Paper sx={{ overflowY: "auto", padding: 3 }} elevation={2} {...props}>
      {children}
    </Paper>
  );
};
