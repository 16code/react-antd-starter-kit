import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AuthorizedRoute from 'components/AuthComponent';
import BasicLayout from 'layouts/BasicLayout';
import LoginLayout from 'layouts/LoginLayout';

const Container = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginLayout} exact />
            <AuthorizedRoute path="/" component={BasicLayout} redirectPath="/login" />
        </Switch>
    </BrowserRouter>
);
BrowserRouter.displayName = 'BrowserRouter';
Container.displayName = 'Container';
export default Container;
