import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';
import { useAppSelector } from '../../hooks/index';

type PrivateRouteProps = {
  children: JSX.Element,
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
	const { authorizationStatus } = useAppSelector((state) => state);

  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} />

  );
}

export default PrivateRoute;
