import { Link, LinkProps } from "@mui/material";

const EMAIL = "some@email.com";
export const EmailLink: React.FC<Omit<LinkProps, "href">> = (props) => (
  <Link href={`mailto:${EMAIL}`} underline="hover" {...props}>
    {EMAIL}
  </Link>
);
