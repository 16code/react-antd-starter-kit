import { Switch, Route } from 'react-router-dom';
import AuthorizedRoute from 'components/AuthComponent';
import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'layouts/LoginLayout';
import Login from './Login';

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
                exact
            />
            <AuthorizedRoute path="/" component={BasicLayout} redirectPath="/login" />
        </Switch>
    );
}
Routes.displayName = 'Routes';
