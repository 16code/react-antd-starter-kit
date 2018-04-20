import PageHeader from 'components/PageHeader';
import { Link } from 'react-router-dom';
import styles from './styles/PageHeaderLayout.less';

export default function PageHeaderLayout({ children, wrapperClassName, ...restProps }) {
    return (
        <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
            <PageHeader key="pageheader" {...restProps} linkElement={Link} />
            {children ? <div className={styles.content}>{children}</div> : null}
        </div>
    );
}
