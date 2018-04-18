import { Switch, Route } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';
import AuthorizedRoute from 'components/AuthComponent';
import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'layouts/LoginLayout';
// const Home = AsyncComponent(() => import('./Home'));
const Login = AsyncComponent(() => import('./Login'));

export default function Routes() {
    return (
        <Switch>
            <Route
                path="/login"
                render={props => (
                    <LoginLayout {...props}>
                        <Login />
                    </LoginLayout>
                )}
            />
            <AuthorizedRoute path="/" component={BasicLayout} redirectPath="/login" exact />
        </Switch>
    );
}
Routes.displayName = 'Routes';
