function buildAudioUrl(url: string, audio: string): string {
  return `{${audio}}${url};`
};
function buildQualityUrl(url: string, qualityName: string): string {
  return `[${qualityName}]${url},`;
}

export function makeVideoFilesUrlsForPlayer(
  videoFiles: {
    file?: string | null;
    resolution: string | number;
    sound_studio: string;
  }[]
): string {
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
