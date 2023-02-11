import {
  Box,
  BoxProps,
  Card,
  CardActionArea,
  CardMedia,
  CardProps,
  Typography,
} from "@mui/material";
import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const Overlay: React.FC<{ open: boolean; timeout?: number } & BoxProps> = ({
  open,
  timeout = 3000,
  ...props
}) => {
  const [isMount, setIsMount] = React.useState(false);
  React.useEffect(() => {
    let animationTimeout: NodeJS.Timeout | undefined;
    if (open && !isMount) {
      setIsMount(true);
    } else if (!open && isMount) {
      animationTimeout = setTimeout(() => {
        setIsMount(false);
      }, timeout);
    }
    return () => {
      if (animationTimeout) {
        clearTimeout(animationTimeout);
      }
    };
  }, [isMount, open, timeout]);

  if (!isMount) {
    return null;
  }

  return (
    <Box
      sx={{
        display: "block",
        position: "absolute",
        width: "100%",
        height: "100%",
        top: 0,
        left: 0,
        backgroundColor: "#00000066",
        transition: `opacity ${timeout / 10}ms`,
        opacity: Number(open),
      }}
      {...props}
    />
  );
};

interface FilmCardProps extends CardProps {
  image?: string;
  name: string;
}

const FilmCard: React.FC<FilmCardProps> = ({ image, name, ...props }) => {
  const [isShowOverlay, setIsShowOverlay] = React.useState(false);
  return (
    <Card
      sx={{ position: "relative" }}
      {...props}
      onMouseEnter={() => setIsShowOverlay(true)}
      onMouseLeave={() => setIsShowOverlay(false)}
      sx={{ height: 1 }}
    >
      <CardActionArea sx={{ height: 1 }}>
        <CardMedia
          component="img"
          image={
            image ||
            // TODO: Remove it
            "https://static.kion.ru/content/mts/series/65241000/posters/VERTICAL_5ee72186942a4a63167b8309e846ac1f.jpeg"
          }
          sx={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: "5%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "white" }}>
            {name}
          </Typography>
        </Box>
        <Overlay open={isShowOverlay}>
          <Box sx={{ display: "flex", height: 1, width: 1 }}>
            <PlayCircleOutlineIcon
              color="primary"
              sx={{ margin: "auto", fontSize: "5rem" }}
            />
          </Box>
        </Overlay>
      </CardActionArea>
    </Card>
  );
};

export default FilmCard;
