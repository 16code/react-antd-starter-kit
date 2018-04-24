import { Layout } from 'antd';
import connect from 'redux-connect-decorator';
import SiderMenu from 'components/SiderMenu';
import GlobalHeader from 'components/Header';
import DocumentTitle from 'react-document-title';
import { getMenuData } from 'common/menuData';
import AuthService from 'services/auth.service';

import { uiActions } from 'reducers/ui';
import { userActions } from 'reducers/auth';
import Routes from 'routes/index';
import logo from '../assets/logo.svg';

const { Content, Footer, Header } = Layout;

@connect(({ ui }) => ({ theme: ui.theme, sideBarCollapsed: ui.sideBarCollapsed }), {
    ...uiActions,
    userLogout: userActions.userLogout
})
class BasicLayout extends React.PureComponent {
    constructor() {
        super();
        this.menus = getMenuData();
        this.currentUserRole = AuthService.getAuthority();
    }
    getFlatMenuKeys(menus) {
        let keys = {};
        menus.forEach(item => {
            if (item.children) {
                keys = Object.assign(keys, this.getFlatMenuKeys(item.children));
            }
            keys[item.path] = {
                name: item.name
            };
        });
        return keys;
    }
    getPageTitle() {
        const { location } = this.props;
        const { pathname } = location;
        const routerData = this.getFlatMenuKeys(this.menus);
        let title = 'Ant Design Pro';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - Ant Design Pro`;
        }
        return title;
    }
    handleToggleCollapse = collapsed => {
        const { toggleSideBarCollaps } = this.props;
        toggleSideBarCollaps(collapsed);
    };
    handleToggleTheme = () => {
        const { theme, toggleTheme } = this.props;
        toggleTheme(theme);
    };
    handleLogout = () => {
        this.props.userLogout();
    };
    get layout() {
        const { theme, location } = this.props;
        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    theme={theme}
                    location={location}
                    menuData={this.menus}
                    collapsed={this.props.sideBarCollapsed}
                    authorizeHelper={AuthService}
                    currentUserRole={this.currentUserRole}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            collapsed={this.props.sideBarCollapsed}
                            onCollapse={this.handleToggleCollapse}
                            onToggleTheme={this.handleToggleTheme}
                            onLogout={this.handleLogout}
                        />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Routes currentUserRole={this.currentUserRole} {...this.props} />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2016 Created by Ant UED</Footer>
                </Layout>
            </Layout>
        );
    }
    render() {
        return <DocumentTitle title={this.getPageTitle()}>{this.layout}</DocumentTitle>;
    }
}

export default BasicLayout;
