import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route, Switch, RouteNotFound } from 'routes/shell';

const Articles = AsyncComponent(() => import('./articles'));
const Projects = AsyncComponent(() => import('./projects'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Route exact path={`${match.path}/projects`} component={Projects} />
                <Route exact path={`${match.path}/articles`} component={Articles} />
                <Redirect exact from={match.path} to={`${match.path}/articles`} />
                <RouteNotFound />
            </Switch>
        );
    }
}
