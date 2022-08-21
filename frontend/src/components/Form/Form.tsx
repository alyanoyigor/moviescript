import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material';
import { Path, UseFormReturn } from 'react-hook-form';

import { getTheme } from '../../styles/theme';
import { Input } from '../Input';
import { FormSkeleton } from '../FormSkeleton';
import { StyledButton, StyledForm, StyledButtonsContainer } from './styled';

type InputInfo<T> = {
  label: string;
  name: Path<T>;
};

type FormProps<T> = {
  loading: boolean;
  inputsInfo: InputInfo<T>[];
  hookFormData: UseFormReturn<T>;
  onCancel: () => void;
  onSubmit: (data: T) => void;
  options?: T;
  fetchLoading?: boolean;
};

export const Form = <T,>(props: FormProps<T>) => {
  const {
    loading,
    fetchLoading,
    onCancel,
    onSubmit,
    hookFormData,
    inputsInfo,
    options,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = hookFormData;

  useEffect(() => reset(), [reset]);

  return (
    <ThemeProvider theme={getTheme('light')}>
      {fetchLoading && <FormSkeleton inputsCount={inputsInfo.length} />}
      {!fetchLoading && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {inputsInfo.map((input) => {
            const name = input.name as unknown as Path<T>;
            return (
              <Input
                key={name}
                disabled={loading}
                valueWatcher={watch(name)}
                inputOptions={register(name)}
                error={errors[name]?.message as string | undefined}
                label={input.label}
              />
            );
          })}
          <StyledButtonsContainer
            display="flex"
            gap="4px"
            justifyContent="flex-end"
          >
            <StyledButton
              color="silverGrey"
              disabled={loading}
              onClick={onCancel}
            >
              Cancel
            </StyledButton>
            <StyledButton
              color="secondary"
              disabled={loading}
              loading={loading}
              variant="contained"
              type="submit"
            >
              Submit
            </StyledButton>
          </StyledButtonsContainer>
        </StyledForm>
      )}
    </ThemeProvider>
  );
};

Form.defaultProps = {
  fetchLoading: false,
};
