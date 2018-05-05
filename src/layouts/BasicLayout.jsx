import { Layout } from 'antd';
import connect from 'redux-connect-decorator';
import classNames from 'classnames';
import { ContainerQuery } from 'react-container-query';
import SiderMenu from 'components/SiderMenu';
import GlobalHeader from 'components/GlobalHeader';
import { ButterBar } from 'components/Loading';
import DocumentTitle from 'react-document-title';
import { getMenuData } from 'common/menuData';
import AuthService from 'services/auth.service';

import { uiActions } from 'reducers/ui';
import { userActions } from 'reducers/auth';
import Routes from 'routes/index';
import { enquireScreen, unenquireScreen } from 'utils/enquire';
import logo from '../assets/logo.svg';

const { Content, Header } = Layout;
const query = {
    'screen-xs': {
        maxWidth: 575
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199
    },
    'screen-xl': {
        minWidth: 1200
    }
};

let isMobile;
enquireScreen(b => {
    isMobile = b;
});
@connect(({ ui, ajax }) => ({ theme: ui.theme, sideBarCollapsed: ui.sideBarCollapsed, isFetching: ajax.isFetching }), {
    ...uiActions,
    userLogout: userActions.userLogout
})
class BasicLayout extends React.PureComponent {
    state = {
        isMobile
    };
    constructor() {
        super();
        this.menus = getMenuData();
        this.currentUserRole = AuthService.getAuthority();
    }
    componentDidMount() {
        this.enquireHandler = enquireScreen(mobile => {
            this.setState({
                isMobile: mobile
            });
        });
    }
    componentWillUnmount() {
        unenquireScreen(this.enquireHandler);
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
        let title = 'React Admin';
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - React Admin`;
        }
        return title;
    }
    handleToggleCollapse = collapsed => {
        const { toggleSideBarMenu } = this.props;
        toggleSideBarMenu(collapsed);
    };
    handleToggleTheme = () => {
        const { theme, toggleTheme } = this.props;
        toggleTheme(theme);
    };
    handleLogout = () => {
        this.props.userLogout();
    };
    handleMenuClick = ({ key }) => {
        console.info(key);
        switch (key) {
            case 'changeTheme':
                this.handleToggleTheme();
                break;
            case 'logout':
                this.handleLogout();
                break;
            default:
                break;
        }
    };
    get layout() {
        const { theme, location, history, match, staticContext } = this.props;
        return (
            <Layout className="ant-layout-wrapper">
                <SiderMenu
                    logo={logo}
                    theme={theme}
                    location={location}
                    menuData={this.menus}
                    authorizeHelper={AuthService}
                    isMobile={this.state.isMobile}
                    collapsed={this.props.sideBarCollapsed}
                    onCollapse={this.handleToggleCollapse}
                    currentUserRole={this.currentUserRole}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader
                            logo={logo}
                            isMobile={this.state.isMobile}
                            collapsed={this.props.sideBarCollapsed}
                            onMenuClick={this.handleMenuClick}
                            onCollapse={this.handleToggleCollapse}
                        />
                    </Header>
                    <ButterBar key="ButterBar" visible={this.props.isFetching} />
                    <Content className="page-content not-scroll-x">
                        <Routes
                            currentUserRole={this.currentUserRole}
                            location={location}
                            history={history}
                            match={match}
                            staticContext={staticContext}
                        />
                    </Content>
                </Layout>
            </Layout>
        );
    }
    render() {
        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames('layout-wrapper', params)}>{this.layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}

export default BasicLayout;
