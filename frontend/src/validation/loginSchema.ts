import * as yup from 'yup';
import { Login } from '../types';

const required = 'This field is required';

export const loginSchema: yup.SchemaOf<Login> = yup.object({
  email: yup.string().email('Invalid email format').required(required),
  password: yup
    .string()
    .required(required)
    .min(8, 'Password is too short - should be 8 chars minimum')
    .max(30, 'Password is too long - should be 30 chars maximum')
    .matches(
      new RegExp('.*[A-Z].*'),
      'Should contains one uppercase character at least'
    )
    .matches(
      new RegExp('.*[a-z].*'),
      'Should contains one lowercase character at least'
    )
    .matches(new RegExp('.*\\d.*'), 'Should contains one number at least'),
});
