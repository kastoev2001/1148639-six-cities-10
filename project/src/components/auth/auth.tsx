import SignOut from '../sign-out/sign-out';
import SignIn from '../sign-in/sign-in';

import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../store/user-process/user-selector';

function Auth(): JSX.Element {
	const authorizationStatus = useAppSelector(getAuthorizationStatus);

  return authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />;
}

export default Auth;
