import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { getMenuData, getMenuDataPathKeys } from 'common/menuData';

const menuData = getMenuData();
const menuDataPathKeys = getMenuDataPathKeys(menuData);
const loginPage = props => (
    <Redirect
        to={{
            pathname: '/login',
            state: {
                from: props.location,
                message: 'You need to sign in'
            }
        }}
    />
);
const prmissionDeniedePage = props => (
    <Redirect
        to={{
            pathname: '/403',
            state: {
                from: props.location,
                message: '无权限进入'
            }
        }}
    />
);
const AuthorizedRoute = ({ component: ComposedComponent, ...rest }) => {
    class AuthComponent extends React.PureComponent {
        componentRender = props => {
            const { location } = props;
            const { currentUserRole } = rest;
            const user = localStorage.getItem('user');
            if (user) {
                const { authRole } = menuDataPathKeys[location.pathname] || {};
                if (authRole && currentUserRole && !~authRole.indexOf(currentUserRole)) {
                    return prmissionDeniedePage(props);
                }
                return <ComposedComponent routesMap={menuDataPathKeys} {...props} />;
            }
            return loginPage(props);
        };

        render() {
            return <Route {...rest} render={this.componentRender} />;
        }
    }
    return <AuthComponent />;
};
AuthorizedRoute.propTypes = {
    component: PropTypes.func
};
export default AuthorizedRoute;
