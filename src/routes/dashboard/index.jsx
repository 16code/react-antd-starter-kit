import AsyncComponent from 'components/AsyncComponent';
import { Switch, Redirect, Route } from 'react-router-dom';

const Monitor = AsyncComponent(() => import('./monitor'));
const Analysis = AsyncComponent(() => import('./analysis'));

export default class Dashboard extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Redirect exact from="/dashboard" to="/dashboard/analysis" />
                <Route exact path={`${match.path}/analysis`} component={Analysis} />
                <Route exact path={`${match.path}/monitor`} component={Monitor} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
