import { Route, Switch } from 'react-router-dom';
import Authorized from 'components/AuthComponent';
import NotFound from 'routes/errors/404';

const home = asyncComponent(() => import( 'routes/home'));
const list = asyncComponent(() => import( 'routes/list'));
const page403 = require('routes/errors/403').default;

export default class Routes extends React.PureComponent {
    render() {
        const { currentUserRole: role } = this.props;
        return (
            <Switch>
                <Authorized userRole={role} path="/home" component={home} exact />
                <Authorized userRole={role} path="/list" component={list} />
                <Authorized userRole={role} path="/403" component={page403} />
                <Route component={NotFound} />
            </Switch>
        );
    }
}
Routes.displayName = 'Routes';
