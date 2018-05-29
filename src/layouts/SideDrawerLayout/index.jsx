import { Layout, Tooltip } from 'antd';
import classNames from 'classnames';
import PageHeader from './PageHeader';
import PageSidebar from './PageSidebar';

const { Header, Sider, Content } = Layout;

export default class SideDrawerLayout extends React.PureComponent {
    state = {
        collapsed: false
    };
    handleToggle = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed: collapsed });
    };
    render() {
        const { children, content, sidebarWidth = 220, wrapperClassName, action } = this.props;
        const { collapsed } = this.state;
        const direction = collapsed ? 'right' : 'left';
        const tooltipText = collapsed ? '展开' : '收起';
        return (
            <Layout className={classNames('drawer-layout-wrapper', wrapperClassName)}>
                <Header className="layout-header-wraper">
                    <PageHeader key="pageheader" action={action} />
                </Header>
                <Layout>
                    <Sider
                        breakpoint="lg"
                        trigger={null}
                        collapsedWidth={0}
                        collapsible
                        collapsed={this.state.collapsed}
                        width={sidebarWidth}
                    >
                        <PageSidebar>{content}</PageSidebar>
                        <Tooltip title={tooltipText} placement="right" mouseEnterDelay={2}>
                            <a className="drawer-trigger-wrapper" onClick={this.handleToggle}>
                                <i className={classNames('drawer-trigger', direction)} />
                            </a>
                        </Tooltip>
                    </Sider>
                    <Content className="page-content">{children && children}</Content>
                </Layout>
            </Layout>
        );
    }
}