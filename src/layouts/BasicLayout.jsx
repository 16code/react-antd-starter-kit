import { Layout } from 'antd';
import SiderMenu from 'components/SiderMenu';
import GlobalHeader from 'components/Header';
import { getMenuData } from 'common/routerData';
import AuthorizedRoute from 'components/AuthComponent';
import { Switch } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';
import DocumentTitle from 'react-document-title';
import logo from '../assets/logo.svg';

const Form = AsyncComponent(() => import('routes/form'));
const Dashboard = AsyncComponent(() => import('routes/dashboard'));
const Lists = AsyncComponent(() => import('routes/list'));
const Home = AsyncComponent(() => import('routes/home'));

const { Content, Footer, Header } = Layout;

class BasicLayout extends React.PureComponent {
    state = {
        collapsed: false
    };
    constructor() {
        super();
        this.menus = getMenuData();
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
        this.setState({ collapsed });
    };
    get layout() {
        const { collapsed } = this.state;
        return (
            <Layout>
                <SiderMenu
                    logo={logo}
                    location={this.props.location}
                    menuData={this.menus}
                    collapsed={collapsed}
                    onCollapse={this.handleToggleCollapse}
                />
                <Layout>
                    <Header style={{ padding: 0 }}>
                        <GlobalHeader collapsed={collapsed} onCollapse={this.handleToggleCollapse} />
                    </Header>
                    <Content style={{ margin: '24px 24px 0', height: '100%' }}>
                        <Switch>
                            <AuthorizedRoute path="/home" component={Home} />
                            <AuthorizedRoute path="/dashboard" component={Dashboard} />
                            <AuthorizedRoute path="/form" component={Form} />
                            <AuthorizedRoute path="/list" component={Lists} />
                        </Switch>
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
