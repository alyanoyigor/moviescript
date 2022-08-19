import React from 'react';
import { TextField, ThemeProvider } from '@mui/material';
import { Path, PathValue, RefCallBack } from 'react-hook-form';
import { getTheme } from '../../styles/theme';

const defaultProps = {
  error: '',
  type: 'text',
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
  } = props;

  return (
    <ThemeProvider theme={getTheme('light')}>
      <TextField
        color="secondary"
        multiline={multiline}
        rows={rows}
        type={type}
        label={label}
        disabled={disabled}
        autoComplete="off"
        size="small"
        error={Boolean(error)}
        helperText={error}
        variant="outlined"
        InputLabelProps={{ shrink: Boolean(valueWatcher) }}
        {...inputOptions}
      />
    </ThemeProvider>
  );
};

Input.defaultProps = defaultProps;
