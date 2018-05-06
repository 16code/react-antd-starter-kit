import classNames from 'classnames';
import { Layout } from 'antd';
import PageHeader from './PageHeader';
import styles from './style.less';

const { Header, Content } = Layout;

export default function PageHeaderLayout({ children, wrapperClassName, ...restProps }) {
    return (
        <Layout className={classNames('page-header-layout-wrapper', wrapperClassName)}>
            <Header className={styles['page-header']}>
                <PageHeader key="pageheader" {...restProps} />
            </Header>
            <Layout>
                <Content className="page-content">{children}</Content>
            </Layout>
        </Layout>
    );
}
// className="page-content not-scroll-x"