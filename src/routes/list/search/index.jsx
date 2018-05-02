import { Redirect, Route, Switch } from 'react-router-dom';

const Articles = asyncComponent(() => import('./articles'));
const Projects = asyncComponent(() => import('./projects'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Redirect exact from={match.path} to={`${match.path}/articles`} />
                <Route exact path={`${match.path}/projects`} component={Projects} />
                <Route exact path={`${match.path}/articles`} component={Articles} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
