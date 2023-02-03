import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function RouteController({ children }) {
  const isAuth = Boolean(useSelector((state) => state.user.username));

  return isAuth ? children : <Navigate to='/login' />;
}

export default RouteController;
