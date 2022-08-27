import * as yup from 'yup';
import { Register } from '../types';

const required = 'This field is required';

export const registerSchema: yup.SchemaOf<Register> = yup.object({
  name: yup
    .string()
    .max(30, 'Name is too long - should be 30 chars maximum')
    .required(required),
  email: yup.string().email('Invalid email format').required(required),
  password: yup
    .string()
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
    .matches(new RegExp('.*\\d.*'), 'Should contains one number at least')
    .required(required),
});
