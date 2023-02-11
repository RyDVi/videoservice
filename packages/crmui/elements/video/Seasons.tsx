import paths from 'crmui/routes/paths';
import { Video } from '@modules/api';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import React from 'react';

interface SeriesInfo {
  seriesNumber: number;
  seriesDescription: string;
  video: Video;
}

interface SeasonInfo {
  seasonNumber: number;
  seasonDescription: string;
  series: SeriesInfo[];
}

function useGrouppedVideosInfo(videos: Video[]): {
  series: SeriesInfo[];
  seasons: SeasonInfo[];
} {
  const series: SeriesInfo[] = useMemo(() => {
    return videos
      .map((video) => ({
        seriesNumber: video.series,
        seriesDescription: `Серия ${video.series}`,
        video,
      }))
      .sort((s1, s2) => s1.seriesNumber - s2.seriesNumber);
  }, [videos]);
  const seasons: SeasonInfo[] = useMemo(() => {
    const seasons: Record<number, SeasonInfo> = {};
    series.forEach((seria) => {
      if (!seasons[seria.video.season]) {
        seasons[seria.video.season] = {
          seasonNumber: seria.video.season,
          seasonDescription: `Cезон ${seria.video.season}`,
          series: [],
        };
      }
      seasons[seria.video.season].series.push(seria);
    });
    return Object.values(seasons);
  }, [series]);
  return { series, seasons };
}

export const Seria: React.FC<SeriesInfo & ListItemButtonProps> = ({
  seriesDescription,
  seriesNumber,
  video,
  ...props
}) => (
  <ListItemButton {...props}>
    <ListItemText primary={seriesDescription} />
  </ListItemButton>
);

export const SeasonListItem: React.FC<
  SeasonInfo & { children: (seria: SeriesInfo) => React.ReactNode }
> = ({ seasonDescription, series, children }) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemText primary={seasonDescription} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {series.map((seria) => children(seria))}
      </Collapse>
    </>
  );
};

export const SeasonsContainer: React.FC<{ videos: Video[] }> = ({ videos }) => {
  const { seasons } = useGrouppedVideosInfo(videos);
  const router = useRouter();
  return (
    <Box>
      <List>
        {seasons.map((season) => (
          <SeasonListItem key={season.seasonNumber} {...season}>
            {(seria) => (
              <List disablePadding component="div" key={seria.video.id}>
                <Seria
                  {...seria}
                  onClick={() =>
                    router.push(
                      paths.video({ filmId: seria.video.film, videoId: seria.video.id })
                    )
                  }
                  sx={{ pl: 4 }}
                />
              </List>
            )}
          </SeasonListItem>
        ))}
      </List>
    </Box>
  );
};
