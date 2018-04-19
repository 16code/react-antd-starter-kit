import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const AuthorizedRoute = ({ component: ComposedComponent, ...rest }) => {
    class AuthorizedComponent extends React.Component {
        constructor() {
            super();
            this.componentRender = this.componentRender.bind(this);
        }
        componentRender(props) {
            if (!localStorage.getItem('user')) {
                return (
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
            } else {
                return <ComposedComponent {...props} />;
            }
        }

        render() {
            return <Route {...rest} render={this.componentRender} />;
        }
    }
    return <AuthorizedComponent />;
};
AuthorizedRoute.propTypes = {
    component: PropTypes.func
};
export default AuthorizedRoute;
