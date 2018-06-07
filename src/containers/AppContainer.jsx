import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'layouts/LoginLayout';
import { store } from './Store';

const Container = () => (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={LoginLayout} exact />
                <Redirect from="/" to="/dashboard" exact />
                <Route
                    path="/"
                    render={props =>
                        store.getState().auth.token ? <BasicLayout {...props} /> : <Redirect to="/login" />
                    }
                />
            </Switch>
        </BrowserRouter>
    </Provider>
);
BrowserRouter.displayName = 'BrowserRouter';
Container.displayName = 'Container';
export default Container;
