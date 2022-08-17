import React, { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

type ErrorProps = {
  children: ReactNode;
};

export const Error = (props: ErrorProps) => {
  const { children } = props;

  return (
    <Alert variant="filled" severity="error">
      {children}
    </Alert>
  );
};

Error.propTypes = {
  children: PropTypes.node.isRequired,
};
