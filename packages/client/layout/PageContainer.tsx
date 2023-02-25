import { Container, ContainerProps } from "@mui/material";
import React from "react";
import { PageContent } from "./PageContent";

interface AppPageProps extends ContainerProps {
  header?: React.ReactElement;
  footer?: React.ReactElement;
  breadcrumbs?: React.ReactElement;
}

export const PageContainer: React.FC<AppPageProps> = ({
  children,
  header,
  sx,
  footer,
  breadcrumbs,
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
      <PageContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {breadcrumbs}
        {children}
        {footer}
      </PageContent>
    </Container>
  );
};
