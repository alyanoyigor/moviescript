import React from 'react';
import { Path, PathValue, RefCallBack } from 'react-hook-form';
import { StyledTextField } from './styled';

const defaultProps = {
  error: '',
  type: 'text',
  disabled: false,
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
} & typeof defaultProps;

export const Input = <T,>(props: InputProps<T>) => {
  const { error, inputOptions, label, type, disabled, valueWatcher } = props;

  return (
    <StyledTextField
      color="silverGrey"
      type={type}
      label={label}
      disabled={disabled}
      size="small"
      error={Boolean(error)}
      helperText={error}
      variant="outlined"
      InputLabelProps={{ shrink: Boolean(valueWatcher) }}
      {...inputOptions}
    />
  );
};

Input.defaultProps = defaultProps;
