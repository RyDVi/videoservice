export const buildAudioUrl = (url: string, audio: string): string => `{${audio}}${url};`;
export const buildQualityUrl = (url: string, qualityName: string): string =>
  `[${qualityName}]${url},`;

export const makeVideoFilesUrlsForPlayer = (
  videoFiles: {
    file?: string | null;
    resolution: string | number;
    sound_studio: string;
  }[]
) => {
  const existsVideoFiles = videoFiles.filter((vf) => !!vf.file);
  const qualities = new Set(existsVideoFiles.map((vf) => vf.resolution));
  let urls = '';
  qualities.forEach((quality) => {
    const audioUrls = existsVideoFiles
      .filter((vf) => vf.resolution === quality)
      .map((vf) => buildAudioUrl(vf.file!, vf.sound_studio))
      .join('');
    urls += buildQualityUrl(audioUrls, String(quality));
  });
  return urls;
};
