import PropTypes from 'prop-types';
import classNames from 'classnames';
import Breadcrumb from 'components/Breadcrumb';

import styles from './style.less';
export default class PageHeader extends React.PureComponent {
    static propTypes = {
        action: PropTypes.element
    };
    render() {
        const { action, className } = this.props;
        const clsString = classNames(styles.pageHeader, className);
        return (
            <div className={clsString}>
                <Breadcrumb />
                {action && action}
            </div>
        );
    }
};