import { Container, ContainerProps } from "@mui/material";
import { PageContent } from "./PageContent";

interface AppPageProps extends ContainerProps {
  header?: React.ReactElement;
}

export const PageContainer: React.FC<AppPageProps> = ({
  children,
  header,
  sx,
  ...props
}) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "0 !important",
        display: "flex",
        flexDirection: "column",
        ...sx,
      }}
      {...props}
    >
      {header}
      <PageContent sx={{ flex: 1 }}>{children}</PageContent>
    </Container>
  );
};
