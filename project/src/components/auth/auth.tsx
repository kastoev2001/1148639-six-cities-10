import SignOut from '../sign-out/sign-out';
import SignIn from '../sign-in/sign-in';

import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function Auth(): JSX.Element {
  const {authorizationStatus} = useAppSelector((state) => state);

  return authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />;
}

export default Auth;
