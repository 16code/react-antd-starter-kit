import { Redirect, Route, Switch } from 'react-router-dom';

const Search = asyncComponent(() => import('./search'));
const Tablelist = asyncComponent(() => import('./table-list'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Redirect exact from={match.path} to={`${match.path}/table-list`} />
                <Route
                    exact
                    path={`${match.path}/table-list`}
                    component={Tablelist}
                />
                <Route path={`${match.path}/search`} component={Search} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
