import AuthorizedRoute from 'components/AuthComponent';
import AsyncComponent from 'components/AsyncComponent';
import { Switch, RouteShell, RouteNotFound } from 'routes/shell';

const routeConfig = {
    '/home': {
        exact: true,
        component: AsyncComponent(() => import('routes/home'))
    },
    '/dashboard': {
        component: AsyncComponent(() => import('routes/dashboard'))
    },
    '/form': {
        component: AsyncComponent(() => import('routes/form'))
    },
    '/list': {
        component: AsyncComponent(() => import('routes/list'))
    },
    '/403': {
        component: AsyncComponent(() => import('routes/errors/403'))
    }
};

export default class Routes extends React.PureComponent {
    render() {
        const { props } = this;
	        console.info('componentDidMount');
        return (
            <RouteShell>
                <Switch>
                    {Object.keys(routeConfig).map(path => {
                        const { component, exact } = routeConfig[path];
                        return (
                            <AuthorizedRoute
                                currentUserRole={props.currentUserRole}
                                key={path}
                                path={path}
                                component={component}
                                exact={!!exact}
                            />
                        );
                    })};
                    <RouteNotFound />
                </Switch>
            </RouteShell>
        );
    }
}
Routes.displayName = 'Routes';
