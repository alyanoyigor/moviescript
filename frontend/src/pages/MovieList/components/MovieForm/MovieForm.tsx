import React, { useEffect } from 'react';
import {
  Checkbox,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  ThemeProvider,
  FormControl,
  Button,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Controller, useForm } from 'react-hook-form';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { Input } from '../../../../components/Input';
import { getTheme } from '../../../../styles/theme';
import {
  MovieUserInput,
  MovieCategory,
  MovieFormSchema,
} from '../../../../types';
import { StyledButton, StyledForm, StyledButtonsContainer } from './styled';
import { Preloader } from '../../../../components/Preloader';

type MovieFormProps = {
  loading: boolean;
  onCancel: () => void;
  onSubmit: (data: MovieFormSchema) => void;
  categories: MovieCategory[];
  fetchCategoriesLoading: boolean;
  options?: MovieUserInput;
  fetchLoading?: boolean;
};

export const MovieForm = (props: MovieFormProps) => {
  const {
    loading,
    fetchLoading,
    fetchCategoriesLoading,
    categories,
    onCancel,
    onSubmit,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<MovieFormSchema>();

  useEffect(() => reset(), [reset]);

  return (
    <ThemeProvider theme={getTheme('light')}>
      {/* {fetchLoading && <FormSkeleton inputsCount={inputsInfo.length} />} */}
      {!fetchLoading && (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <Input<MovieFormSchema>
            disabled={loading}
            valueWatcher={watch('title')}
            inputOptions={register('title')}
            error={errors['title']?.message}
            label="Title"
          />
          <Input<MovieFormSchema>
            multiline={true}
            rows={3}
            disabled={loading}
            valueWatcher={watch('description')}
            inputOptions={register('description')}
            error={errors['description']?.message}
            label="Description"
          />
          <Input<MovieFormSchema>
            disabled={loading}
            type="number"
            min={1}
            valueWatcher={watch('duration')}
            inputOptions={register('duration')}
            error={errors['duration']?.message}
            label="Duration"
          />
          <Controller
            name="grade"
            control={control}
            render={({ field }) => (
              <TextField
                color="secondary"
                size="small"
                select
                label="Grade"
                SelectProps={{
                  MenuProps: {
                    sx: { maxHeight: '200px' },
                  },
                }}
                onChange={field.onChange}
                value={field.value || ''}
              >
                {Array.from(Array(13), (_, index) => {
                  const value = index === 0 ? '' : index;
                  const label = index === 0 ? 'Select grade' : index;
                  return (
                    <MenuItem key={label} value={value}>
                      {label}
                    </MenuItem>
                  );
                })}
              </TextField>
            )}
          />
          <FormControl>
            <InputLabel id="select-categories">Categories</InputLabel>
            <Controller
              name="categories"
              control={control}
              render={({ field }) => {
                const value = field.value || [];
                return (
                  <Select
                    labelId="select-categories"
                    color="secondary"
                    multiple
                    input={
                      <OutlinedInput color="secondary" label="Categories" />
                    }
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: '200px',
                        },
                      },
                    }}
                    renderValue={(selected: MovieCategory[]) =>
                      selected.map((select) => select.name).join(', ')
                    }
                    onChange={field.onChange}
                    value={value}
                  >
                    {fetchCategoriesLoading && <Preloader />}
                    {!fetchCategoriesLoading &&
                      categories.map((category) => (
                        <MenuItem
                          color="secondary"
                          key={category._id}
                          value={category as any}
                        >
                          <Checkbox
                            color="secondary"
                            checked={Boolean(
                              value.find(
                                (selectedCategory) =>
                                  selectedCategory.name === category.name
                              )
                            )}
                          />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                  </Select>
                );
              }}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="releaseDate"
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  label="Release date"
                  inputFormat="MM/DD/YYYY"
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
                    <TextField color="secondary" {...params} />
                  )}
                  {...field}
                  value={field.value || null}
                />
              )}
            />
          </LocalizationProvider>
          <Button
            variant="contained"
            color="secondary"
            component="label"
            startIcon={<ImageIcon />}
          >
            Upload
            <input
              hidden
              accept="image/*"
              type="file"
              {...register('imagePath')}
            />
          </Button>
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

MovieForm.defaultProps = {
  fetchLoading: false,
};
