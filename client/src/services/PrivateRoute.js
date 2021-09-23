import { Route, Redirect } from "react-router-dom";
import useStore from "./store";

const PrivateRoute = ({ component: Component, ...rest}) => {
  const currentUser = useStore(state => state.currentUser);

return (
  <Route
    {...rest}
    render={props => {
      return currentUser ? <Component {...props} /> : <Redirect  to="/"/>
    }}
    ></Route>
  )
}

export default PrivateRoute;
