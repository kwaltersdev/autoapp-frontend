// react
import { FunctionComponent } from 'react';
// react-router-dom
import { Route, Redirect } from 'react-router-dom';
// THIS PROJECT
// hooks
import { useAuthContext } from '../../contexts/AuthContext';

interface PrivateRouteProps {
  exact?: boolean,
  path: string,
  component: FunctionComponent,
};
export default function PrivateRoute(props: PrivateRouteProps): React.ReactElement {
  const { currentUser } = useAuthContext();
  let Component: FunctionComponent = props.component;

  let renderComponent: JSX.Element = (<div></div>);
  if (currentUser) {
    renderComponent = (
      <Component />
    );
  } else if (!currentUser) {
    renderComponent = (
      <Redirect to='/log-in' />
    );
  };

  return (
    <Route
      {...props.exact}
      path={props.path}
    >
      {renderComponent}
    </Route >
  );
}