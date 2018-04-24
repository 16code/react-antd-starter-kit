import PropTypes from 'prop-types';
import Login from 'routes/login';
import DocumentTitle from 'react-document-title';

export default function LoginLayout(props) {
    return (
        <DocumentTitle title="用户登录">
            <div className="loginPage">
                <Login {...props} />
            </div>
        </DocumentTitle>
    );
}

LoginLayout.propTypes = {
    children: PropTypes.element
};
