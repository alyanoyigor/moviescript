import React, { useEffect, useMemo, useState } from 'react';
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  FormControl,
  Button,
  FormHelperText,
  Rating,
  Box,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { AnyObjectSchema } from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { yupResolver } from '@hookform/resolvers/yup';

import { Movie, MovieCategory, MovieFormSchema } from 'types';
import { Input } from '../Input';
import { FormSkeleton } from '../FormSkeleton';
import {
  StyledButton,
  StyledForm,
  StyledButtonsContainer,
  StyledSkeleton,
} from './styled';

type MovieFormProps = {
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: MovieFormSchema) => void;
  categories: MovieCategory[];
  schema: AnyObjectSchema;
  fetchCategoriesLoading: boolean;
  submitButtonText: string;
  fetchLoading?: boolean;
  defaultMovieProps?: Movie | Record<string, never>;
};

export const MovieForm = (props: MovieFormProps) => {
  const {
    loading,
    fetchLoading,
    fetchCategoriesLoading,
    defaultMovieProps,
    categories,
    onCancel,
    submitButtonText,
    onSubmit,
    schema,
  } = props;

  const [posterName, setPosterName] = useState<string | undefined>();

  const defaultValues = useMemo(
    () => ({
      title: defaultMovieProps?.title,
      description: defaultMovieProps?.description,
      categories: defaultMovieProps?.categories?.map(
        (category) => category.name
      ),
      duration: defaultMovieProps?.duration,
      releaseDate: defaultMovieProps?.releaseDate,
      grade: defaultMovieProps?.grade,
      fetchCategories: categories,
    }),
    [categories, defaultMovieProps]
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<MovieFormSchema>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const imagePath =
      defaultMovieProps?.imagePath &&
      defaultMovieProps.imagePath.split('/').pop();
    reset(defaultValues);
    setPosterName(imagePath);
  }, [defaultValues, defaultMovieProps?.imagePath, reset]);

  return (
    <>
      {fetchLoading && <FormSkeleton inputsCount={8} />}
      {!fetchLoading && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={loading}
            inputOptions={register('title')}
            error={errors['title']?.message}
            label="Title"
          />
          <Input
            multiline={true}
            rows={3}
            disabled={loading}
            inputOptions={register('description')}
            error={errors['description']?.message}
            label="Description"
          />
          <Input
            disabled={loading}
            type="number"
            inputOptions={register('duration')}
            error={errors['duration']?.message}
            label="Duration (min)"
          />
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <FormControl>
                <Box
                  sx={{
                    width: 200,
                    ml: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ mr: 2, color: 'rgba(0, 0, 0, 0.6)' }}>Grade</Box>
                  <Rating
                    precision={0.5}
                    size="large"
                    value={Number(field.value)}
                    onChange={field.onChange}
                    disabled={loading}
                  />
                </Box>
                {errors['grade'] && (
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {errors['grade']?.message}
                  </FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Controller
            name="categories"
            control={control}
            render={({ field }) => {
              const value = field.value || [];
              const error = errors['categories']?.message;
              return (
                <FormControl>
                  <InputLabel id="select-categories">Categories</InputLabel>
                  <Select
                    labelId="select-categories"
                    disabled={loading}
                    color="secondary"
                    error={Boolean(error)}
                    multiple
                    input={
                      <OutlinedInput color="secondary" label="Categories" />
                    }
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: '200px',
                        },
                      },
                    }}
                    renderValue={(selected: string[]) => selected.join(', ')}
                    onChange={field.onChange}
                    value={value}
                  >
                    {fetchCategoriesLoading &&
                      Array.from(Array(3), (_, index) => (
                        <MenuItem key={index}>
                          <StyledSkeleton />
                        </MenuItem>
                      ))}
                    {!fetchCategoriesLoading &&
                      categories.map((category) => (
                        <MenuItem
                          color="secondary"
                          key={category._id}
                          value={category.name}
                        >
                          <Checkbox
                            color="secondary"
                            checked={value.indexOf(category.name) > -1}
                          />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                  </Select>
                  <FormHelperText sx={{ color: 'error.main' }}>
                    {error}
                  </FormHelperText>
                </FormControl>
              );
            }}
          />
          <Controller
            name="releaseDate"
            control={control}
            render={({ field }) => {
              const value = field.value || null;
              const error = errors['releaseDate']?.message;
              return (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Release date"
                    inputFormat="MM/DD/YYYY"
                    disabled={loading}
                    openTo="year"
                    views={['year', 'month', 'day']}
                    PopperProps={{
                      sx: {
                        '& .Mui-selected': {
                          bgcolor: '#e05326 !important',
                        },
                        '& .Mui-selected:hover': {
                          bgcolor: '#d14314 !important',
                        },
                      },
                    }}
                    InputProps={{
                      sx: { '& .MuiSvgIcon-root': { color: 'secondary.main' } },
                    }}
                    renderInput={(params) => (
                      <TextField
                        color="secondary"
                        {...params}
                        error={Boolean(error)}
                        helperText={error}
                      />
                    )}
                    {...field}
                    value={value}
                  />
                </LocalizationProvider>
              );
            }}
          />
          <FormControl>
            <Button
              variant="contained"
              disabled={loading}
              color={errors['imagePath'] ? 'error' : 'secondary'}
              component="label"
              startIcon={<ImageIcon />}
            >
              Upload poster
              <input
                hidden
                accept="image/*"
                type="file"
                {...register('imagePath', {
                  onChange: (event) => {
                    setPosterName(event.target.files[0].name);
                  },
                })}
              />
            </Button>
            {errors['imagePath'] && (
              <FormHelperText sx={{ color: 'error.main' }}>
                {errors['imagePath'].message}
              </FormHelperText>
            )}
            {posterName && <FormHelperText>{posterName}</FormHelperText>}
          </FormControl>
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
              {submitButtonText}
            </StyledButton>
          </StyledButtonsContainer>
        </StyledForm>
      )}
    </>
  );
};

MovieForm.defaultProps = {
  fetchLoading: false,
};
