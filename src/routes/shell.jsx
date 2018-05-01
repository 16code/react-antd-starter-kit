import { withRouter, Redirect, Route, Switch, Link } from 'react-router-dom';
import NotFound from 'routes/errors/404';

const RouteShell = withRouter(({ children, location }) => {
    return location && location.state && location.state.notFoundRoute ? <NotFound /> : children;
});
const RouteNotFound = () => <Redirect to={{ state: { notFoundRoute: true } }} />;

export { Redirect, Route, Switch, Link, RouteShell, RouteNotFound };
