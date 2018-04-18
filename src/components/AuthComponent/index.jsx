import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
const Authorized = ({ component: ComposedComponent, ...rest }) => {
    console.info(rest);
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
    };
    return <AuthorizedComponent />;
};
Authorized.propTypes = {
    component: PropTypes.func
};
export default Authorized;