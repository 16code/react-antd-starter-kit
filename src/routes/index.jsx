import { Route, Switch } from 'react-router-dom';
import Authorized from 'components/AuthComponent';
import NotFound from 'routes/errors/404';

const dashboard = asyncComponent(() => import(/* webpackChunkName: "dashboard" */ 'routes/dashboard'));
const list = asyncComponent(() => import(/* webpackChunkName: "table-list" */ 'routes/list'));
const page403 = require('routes/errors/403').default;

export default class Routes extends React.PureComponent {
    render() {
        const { currentUserRole: role } = this.props;
        return (
            <Switch>
                <Authorized userRole={role} path="/dashboard" component={dashboard} exact />
                <Authorized userRole={role} path="/list" component={list} />
                <Authorized userRole={role} path="/403" component={page403} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
Routes.displayName = 'Routes';
