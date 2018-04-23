import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthorizedRoute from 'components/AuthComponent';
import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'layouts/LoginLayout';
import createStore from './Store';
const store = createStore();
const Container = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginLayout} exact />
                <Redirect from="/" to="/home" exact />
                <AuthorizedRoute path="/" component={BasicLayout} redirectPath="/login" />
            </Switch>
        </BrowserRouter>
    </Provider>
);
BrowserRouter.displayName = 'BrowserRouter';
Container.displayName = 'Container';
export default Container;
