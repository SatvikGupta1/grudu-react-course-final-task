import * as EmailValidator from 'email-validator';

export function validateEmail(email: string): string | null {
  if (!email) return 'Email is required';
  if (!EmailValidator.validate(email)) return 'Invalid email';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Invalid password (minimum 8 characters)';
  if (password.length > 256) return 'Invalid password (maximum 256 characters)';
  return null;
}

export function validateFullName(name: string): string | null {
  if (!name) return 'Full name is required';
  if (name.length < 1) return 'Invalid full name (minimum 1 character)';
  if (name.length > 512) return 'Invalid full name (maximum 512 characters)';
  return null;
}

export function validateTweetText(text: string): string | null {
  if (!text || text.trim().length === 0) return 'Tweet text is required';
  if (text.length > 140) return 'Invalid tweet (maximum 140 characters)';
  return null;
}
