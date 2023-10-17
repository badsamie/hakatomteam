import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const user = getAuthUser();  
  return (
    <Route
      {...rest}
      render={(props) =>
        user && user.role === "admin" ? (
        <ProductEdit />
        ) : (
          <Redirect to="/login" />  
        )
      }
    />
  );
};
export default ProtectedRoute