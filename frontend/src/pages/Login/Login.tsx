import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';

import { Input } from '../../components/Input';
import { authLoadingSelector } from '../../store/auth/selectors/auth';
import { loginSchema } from '../../validation/loginSchema';
import { Login as LoginData } from '../../types';
import { useAppDispatch } from '../../store';
import { authLoginStart } from '../../store/auth/thunks/authLogin';
import { StyledContainer, StyledForm, StyledTitle } from './styled';

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginData>({ resolver: yupResolver(loginSchema) });
  const dispatch = useAppDispatch();
  const loading = useSelector(authLoadingSelector);

  const onSubmit = (data: LoginData) => {
    dispatch(authLoginStart(data));
  };

  useEffect(() => reset(), [reset]);

  return (
    <StyledContainer>
      <StyledTitle variant="h4" component="h1">
        Login
      </StyledTitle>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Input<LoginData>
          disabled={loading}
          size="medium"
          valueWatcher={watch('email')}
          inputOptions={register('email')}
          error={errors['email']?.message}
          label="Email"
        />
        <Input<LoginData>
          disabled={loading}
          size="medium"
          type="password"
          valueWatcher={watch('password')}
          inputOptions={register('password')}
          error={errors['password']?.message}
          label="Password"
        />
        <Button
          disabled={loading}
          type="submit"
          size="large"
          variant="contained"
          color="secondary"
        >
          Submit
        </Button>
      </StyledForm>
    </StyledContainer>
  );
};
