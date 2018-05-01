import { Switch, Route } from 'react-router-dom';
import Authorized from 'components/AuthComponent';
import AsyncComponent from 'components/AsyncComponent';
import NotFound from 'routes/errors/404';

const home = AsyncComponent(() => import('routes/home'));
const dashboard = AsyncComponent(() => import('routes/dashboard'));
const form = AsyncComponent(() => import('routes/form'));
const list = AsyncComponent(() => import('routes/list'));
const page403 = require('routes/errors/403').default;

export default class Routes extends React.PureComponent {
    render() {
        const { currentUserRole: role } = this.props;
        return (
            <div>
                <Switch>
                    <Authorized userRole={role} path="/home" component={home} exact />
                    <Authorized userRole={role} path="/dashboard" component={dashboard} />
                    <Authorized userRole={role} path="/form" component={form} />
                    <Authorized userRole={role} path="/list" component={list} />
                    <Authorized userRole={role} path="/403" component={page403} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }
}
Routes.displayName = 'Routes';
