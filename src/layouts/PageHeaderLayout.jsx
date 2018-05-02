import classNames from 'classnames';
import PageHeader from 'components/PageHeader';
import { Link } from 'react-router-dom';
import styles from './styles/PageHeaderLayout.less';

export default function PageHeaderLayout({ children, wrapperClassName, ...restProps }) {
    return (
        <div className={classNames(styles.wrapper, wrapperClassName)}>
            <PageHeader key="pageheader" {...restProps} linkElement={Link} />
            {children ? <div className={styles.content}>{children}</div> : null}
        </div>
    );
}
