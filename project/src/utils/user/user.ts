import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { AuthorizationStatus, CommentLength } from '../../const';
import { isLoginCheck, isPasswordCheck } from '../commands/commands';
import { StateCodeMapping } from '../../const';

export const chouldDisplayError = (response: AxiosResponse): boolean => StateCodeMapping[response.status];

export const notifyUserOfAnError = (error: AxiosError): void => {
  if (error.response && chouldDisplayError(error.response)) {
    const errorMessage = error.response.data.error;

    toast.warn(errorMessage);
  }
};

export const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export const checkLoginFormValidity = (loginElement: HTMLInputElement, passwordElement: HTMLInputElement): boolean => {
  const isCheckedLogin = isLoginCheck(loginElement);
  const isPasswordLogin = isPasswordCheck(passwordElement);
  let errorCount = 0;

  if (!isCheckedLogin) {
    const loginErrorMessage = 'Wrong login!';

    toast.error(loginErrorMessage);

    errorCount++;
  }

  if (!isPasswordLogin) {
    const passwordErrorMessage = 'Wrong password!';

    toast.error(passwordErrorMessage);

    errorCount++;
  }

  return !errorCount;
};

export const checkNewCommentValidity = (commentText: string, rating: number): number => {
  let errorCount = 0;

  if (commentText.length < CommentLength.MIN || commentText.length > CommentLength.MAX) {
    errorCount++;
  }

  if (!rating) {
    errorCount++;
  }

  return errorCount;
};
