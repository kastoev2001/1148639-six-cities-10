
import { AxiosError } from 'axios';

export const isLoginCheck = (loginElement: HTMLInputElement): boolean =>
  /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/.test(loginElement.value);

export const isPasswordCheck = (passwordElement: HTMLInputElement): boolean =>
  /^.*(?=.{1,})(?=.*[a-zA-Z])(?=.*\d)/.test(passwordElement.value);

export const isAxiosError = (error: any): error is AxiosError =>
  typeof error.response.data.error === 'string';
