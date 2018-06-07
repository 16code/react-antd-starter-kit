import { Redirect, Route, Switch } from 'react-router-dom';

const Search = asyncComponent(() => import('./search'));
const UserList = asyncComponent(() => import('./users'));
const ProductsList = asyncComponent(() => import('./products'));
const OrdersList = asyncComponent(() => import('./orders'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <Switch>
                <Redirect exact from={match.path} to={`${match.path}/users`} />
                <Route exact path={`${match.path}/users`} component={UserList} />
                <Route exact path={`${match.path}/products`} component={ProductsList} />
                <Route exact path={`${match.path}/orders`} component={OrdersList} />
                <Route path={`${match.path}/search`} component={Search} />
                <Route render={() => <Redirect to="/404" />} />
            </Switch>
        );
    }
}
