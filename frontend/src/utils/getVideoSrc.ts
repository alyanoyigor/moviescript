import desktopVideo from '../assets/video/movie-trailer-desktop.webm';
import tabletVideo from '../assets/video/movie-trailer-tablet.webm';
import mobileVideo from '../assets/video/movie-trailer-mobile.webm';

export const getVideoSrc = (width: number) => {
  if (width >= 1080) {
    return desktopVideo;
  }

  if (width >= 720) {
    return tabletVideo;
  }

  return mobileVideo;
};
