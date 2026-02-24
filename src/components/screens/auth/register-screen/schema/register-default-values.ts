import type { RegisterFormData } from './register-form-schema';

export const registerDefaultValues: RegisterFormData = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  password_confirmation: '',
  terms_accepted: false,
};
