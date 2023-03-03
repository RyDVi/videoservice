import {
  Box,
  BoxProps,
  Card,
  CardActionArea,
  CardMedia,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

const Overlay = styled(Box)({
  display: "block",
  position: "absolute",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
});

const InteractableOverlay: React.FC<
  { open: boolean; timeout?: number } & BoxProps
> = ({ open, timeout = 3000, ...props }) => {
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
    <Overlay
      sx={{
        backgroundColor: "#000000AA",
        transition: `opacity ${timeout / 10}ms`,
        opacity: Number(open),
      }}
      {...props}
    />
  );
};

const CardTextPlank = styled(Box)({
  position: "absolute",
  bottom: "0",
  left: "0",
  width: "100%",
  textAlign: "center",
  height: "30%",
  padding: "1rem",
});

const BottomShadowOverlay = styled(Overlay)(({ theme }) => {
  const shadow =
    theme.palette.mode === "dark"
      ? "linear-gradient(to bottom,rgba(0,0,0,0) 0%,rgb(0 0 0 / 50%) 100%)"
      : "linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgb(255 255 255 / 50%) 100%)";
  return { background: shadow };
});

interface FilmCardProps extends CardProps {
  image?: string;
  name: string;
  shortDescription: string;
}

const FilmCard: React.FC<FilmCardProps> = ({
  image,
  name,
  shortDescription,
  ...props
}) => {
  const [isShowOverlay, setIsShowOverlay] = React.useState(false);
  return (
    <Card
      sx={{ position: "relative", height: 1 }}
      {...props}
      onMouseEnter={() => setIsShowOverlay(true)}
      onMouseLeave={() => setIsShowOverlay(false)}
    >
      <CardActionArea sx={{ height: 1 }}>
        <CardMedia
          component="img"
          image={image}
          sx={{
            height: 1,
            width: 1,
            backgroundColor: "transparent",
          }}
        />
        <BottomShadowOverlay />
        <CardTextPlank>
          <Typography variant="h6">{name}</Typography>
        </CardTextPlank>
        <InteractableOverlay open={isShowOverlay}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 1,
              width: 1,
              p: 1,
            }}
          >
            <Typography component="p" sx={{ flex: 0.7 }}>
              {shortDescription}
            </Typography>
            <PlayCircleOutlineIcon
              color="primary"
              sx={{ margin: "auto", fontSize: "5rem", flex: 0.3 }}
            />
          </Box>
        </InteractableOverlay>
      </CardActionArea>
    </Card>
  );
};

export default FilmCard;
