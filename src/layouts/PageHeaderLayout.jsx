import classNames from 'classnames';
import PageHeader from 'components/PageHeader';
import { Link } from 'react-router-dom';
import styles from './styles/PageHeaderLayout.less';

export default function PageHeaderLayout({ children, wrapperClassName, ...restProps }) {
    return (
        <div className={classNames('page-header-layout', wrapperClassName)}>
            <PageHeader className={styles['page-header-layout']} key="pageheader" {...restProps} linkElement={Link} />
            {children && children}
        </div>
    );
}
