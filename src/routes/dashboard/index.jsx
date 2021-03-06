import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route } from 'react-router-dom';

const Monitor = AsyncComponent(() => import('./monitor'));
const Analysis = AsyncComponent(() => import('./analysis'));

export default class Dashboard extends React.Component {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route exact path={`${match.path}/monitor`} component={Monitor} />
                <Route exact path={`${match.path}/analysis`} component={Analysis} />
                <Route exact path={match.path} render={() => <Redirect to="/dashboard/monitor" />} />
            </div>
        );
    }
}
