import classNames from 'classnames';
import PageHeader from './PageHeader';
import styles from './style.less';

export default function PageHeaderLayout({ children, wrapperClassName, ...restProps }) {
    return (
        <div className={classNames('page-header-layout-wrapper', wrapperClassName)}>
            <PageHeader className={styles['page-header-layout']} key="pageheader" {...restProps} />
            {children && children}
        </div>
    );
}
