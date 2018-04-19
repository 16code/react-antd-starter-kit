import { Switch, Redirect } from 'react-router-dom';
import AuthorizedRoute from 'components/AuthComponent';
import AsyncComponent from 'components/AsyncComponent';

const FormRoute = AsyncComponent(() => import('routes/form'));
const DashboardRoute = AsyncComponent(() => import('routes/dashboard'));
const ListRoute = AsyncComponent(() => import('routes/list'));
const HomeRoute = AsyncComponent(() => import('routes/home'));

export default function Routes() {
    return (
        <Switch>
            <AuthorizedRoute path="/home" component={HomeRoute} />
            <AuthorizedRoute path="/dashboard" component={DashboardRoute} />
            <AuthorizedRoute path="/form" component={FormRoute} />
            <AuthorizedRoute path="/list" component={ListRoute} />
            <Redirect from="/" to="/home" />
        </Switch>
    );
}
Routes.displayName = 'Routes';
