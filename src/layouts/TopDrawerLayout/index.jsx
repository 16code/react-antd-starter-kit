import { Layout, Tooltip } from 'antd';
import classNames from 'classnames';
import PageHeader from './PageHeader';
import TopDrawer from './TopDrawer';
import styles from './style.less';

const { Header, Content } = Layout;

export default class SideDrawerLayout extends React.PureComponent {
    state = {
        collapsed: false
    };
    handleToggle = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed: collapsed });
    };
    render() {
        const { children, content, wrapperClassName, action } = this.props;
        const { collapsed } = this.state;
        const direction = collapsed ? 'down' : 'up';
        const tooltipText = collapsed ? '展开' : '收起';
        const collapsedCls = classNames({ [styles.collapsed]: collapsed });
        return (
            <Layout className={classNames(wrapperClassName)}>
                <Header className="layout-header-wraper">
                    <PageHeader key="pageheader" action={action} />
                </Header>
                <Layout>
                    <div className={classNames(styles['top-drawer-wrapper'], collapsedCls)}>
                        <TopDrawer className={styles['top-drawer-inner']}>{content}</TopDrawer>
                        <Tooltip title={tooltipText} placement="bottom" mouseEnterDelay={2}>
                            <a className="drawer-trigger-wrapper top" onClick={this.handleToggle}>
                                <i className={classNames('drawer-trigger', direction)} />
                            </a>
                        </Tooltip>
                    </div>	
                    <Content className="page-content">{children && children}</Content>
                </Layout>
            </Layout>
        );
    }
}
