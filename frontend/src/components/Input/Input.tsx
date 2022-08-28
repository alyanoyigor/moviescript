import React, { ChangeEvent } from 'react';
import { OutlinedInputProps, TextField } from '@mui/material';
import { RefCallBack } from 'react-hook-form';

const defaultProps = {
  error: '',
  type: 'text',
  size: 'small',
  disabled: false,
  multiline: false,
};

type InputProps = {
  inputOptions: {
    name: string;
    onChange: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    ref: RefCallBack;
  };
  label: string;
  disabled?: boolean;
  inputProps?: Partial<OutlinedInputProps>;
  size?: 'small' | 'medium';
  type?: string;
  error?: string;
  multiline?: boolean;
  rows?: number;
} & typeof defaultProps;

export const Input = (props: InputProps) => {
  const {
    error,
    inputOptions,
    label,
    type,
    disabled,
    multiline,
    rows,
    inputProps,
    size,
  } = props;

  return (
    <TextField
      color="secondary"
      multiline={multiline}
      rows={rows}
      InputProps={inputProps}
      type={type}
      label={label}
      disabled={disabled}
      autoComplete="off"
      size={size}
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      {...inputOptions}
    />
  );
};

Input.defaultProps = defaultProps;
