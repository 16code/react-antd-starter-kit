import PropTypes from 'prop-types';
import Login from 'routes/login';

export default function LoginLayout(props) {
    return (
        <div className="loginPage">
            <Login {...props} />
        </div>
    );
}

LoginLayout.propTypes = {
    children: PropTypes.element
};
