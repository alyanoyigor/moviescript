import React from 'react';
import { TextField } from '@mui/material';
import { Path, PathValue, RefCallBack } from 'react-hook-form';

const defaultProps = {
  error: '',
  type: 'text',
  size: 'small',
  disabled: false,
  multiline: false,
};

type InputProps<T> = {
  inputOptions: {
    name: string;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    ref: RefCallBack;
  };
  label: string;
  valueWatcher?: PathValue<T, Path<T>>;
  disabled?: boolean;
  min?: number;
  size?: 'small' | 'medium';
  type?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
} & typeof defaultProps;

export const Input = <T,>(props: InputProps<T>) => {
  const {
    error,
    inputOptions,
    label,
    type,
    disabled,
    valueWatcher,
    multiline,
    rows,
    min,
    size,
  } = props;

  return (
    <TextField
      color="secondary"
      multiline={multiline}
      rows={rows}
      InputProps={{
        inputProps: {
          min,
        },
      }}
      type={type}
      label={label}
      disabled={disabled}
      autoComplete="off"
      size={size}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      InputLabelProps={{ shrink: Boolean(valueWatcher) }}
      {...inputOptions}
    />
  );
};

Input.defaultProps = defaultProps;
