import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route } from 'react-router-dom';

const Search = AsyncComponent(() => import('./search'));
const Tablelist = AsyncComponent(() => import('./table-list'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route
                    exact
                    path={`${match.path}/table-list`}
                    component={(props) => <Tablelist {...props} {...this.props} />}
                />
                <Route exact path={match.path} render={() => <Redirect to={`${match.path}/table-list`} />} />
                <Route path={`${match.path}/search`} component={Search} />
            </div>
        );
    }
}
