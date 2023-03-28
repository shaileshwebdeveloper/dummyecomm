import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
 

  const isAuth =  useSelector(state => state.AuthReducer.isAuth)


  if (!isAuth) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export default PrivateRoute;
