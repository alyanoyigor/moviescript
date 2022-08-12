import React from 'react';
import PropTypes from 'prop-types';
import preloader from '../../assets/preloader.svg';

type PreloaderProps = {
  width?: number;
  height?: number;
};

export const Preloader = (props: PreloaderProps) => {
  const { width, height } = props;

  return <img src={preloader} alt="Preloader" width={width} height={height} />;
};

Preloader.defaultProps = {
  width: 64,
  height: 64,
};

Preloader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};
