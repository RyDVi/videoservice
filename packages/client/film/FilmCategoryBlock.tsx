import { Box, BoxProps, Typography } from "@mui/material";
import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface FilmCategoryBlockProps {
  categoryName: React.ReactNode;
  categoryHref: Parameters<typeof Link>[0]["href"];
}

const FilmCategoryBlock: React.FC<BoxProps & FilmCategoryBlockProps> = ({
  categoryName,
  children,
  categoryHref,
  ...props
}) => (
  <Box {...props}>
    <Box
      component={Link}
      href={categoryHref}
      sx={{
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        ":hover >*": { opacity: 1 },
      }}
    >
      <Typography component="h3" sx={{ fontSize: 20 }}>
        {categoryName}
      </Typography>
      <KeyboardArrowRightIcon
        sx={{ fontSize: 30, opacity: 0, transition: "opacity .3s" }}
      />
    </Box>
    <Box sx={{ marginTop: 1 }}>{children}</Box>
  </Box>
);

export default FilmCategoryBlock;
