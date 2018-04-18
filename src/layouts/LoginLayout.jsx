import PropTypes from 'prop-types';

export default function LoginLayout(props) {
    return <div className="loginPage">{React.cloneElement(props.children, props)}</div>;
}

LoginLayout.propTypes = {
    children: PropTypes.element
};
