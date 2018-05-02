import { PureComponent } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { pathToRegexp, urlToList } from 'utils';
import classNames from 'classnames';

import './index.less';

const { Sider } = Layout;
const { SubMenu } = Menu;
const getIcon = icon => {
    if (typeof icon === 'string' && icon.indexOf('http') === 0) {
        return <img src={icon} alt="icon" className={'icon sider-menu-item-img'} />;
    }
    if (typeof icon === 'string') {
        return <Icon type={icon} />;
    }
    return icon;
};

const getMeunMatcheys = (flatMenuKeys, path) => {
    return flatMenuKeys.filter(item => {
        return pathToRegexp(item).test(path);
    });
};
export default class SiderMenu extends PureComponent {
    constructor(props) {
        super(props);
        this.menus = props.menuData;
        this.flatMenuKeys = this.getFlatMenuKeys(this.menus);
        this.state = {
            openKeys: this.getDefaultCollapsedSubMenus(props)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setState({
                openKeys: this.getDefaultCollapsedSubMenus(nextProps)
            });
        }
    }
    getFlatMenuKeys(menus) {
        let keys = [];
        menus.forEach(item => {
            if (item.children) {
                keys = keys.concat(this.getFlatMenuKeys(item.children));
            }
            keys.push(item.path);
        });
        return keys;
    }
    getDefaultCollapsedSubMenus(props) {
        const {
            location: { pathname }
        } =
            props || this.props;
        return urlToList(pathname)
            .map(item => {
                return getMeunMatcheys(this.flatMenuKeys, item)[0];
            })
            .filter(item => item);
    }
    getSelectedMenuKeys = () => {
        const {
            location: { pathname }
        } = this.props;
        return urlToList(pathname).map(itemPath => getMeunMatcheys(this.flatMenuKeys, itemPath).pop());
    };
    isMainMenu = key => {
        return this.menus.some(item => key && (item.key === key || item.path === key));
    };
    handleOpenChange = openKeys => {
        const lastOpenKey = openKeys[openKeys.length - 1];
        const moreThanOne = openKeys.filter(openKey => this.isMainMenu(openKey)).length > 1;
        this.setState({
            openKeys: moreThanOne ? [lastOpenKey] : [...openKeys]
        });
    };
    getSubMenuOrItem = item => {
        if (item.children && item.children.some(child => child.name)) {
            const childrenItems = this.getNavMenuItems(item.children);
            // 当无子菜单时就不展示菜单
            if (childrenItems && childrenItems.length > 0) {
                return (
                    <SubMenu
                        title={
                            item.icon ? (
                                <span>
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </span>
                            ) : (
                                item.name
                            )
                        }
                        key={item.path}
                    >
                        {childrenItems}
                    </SubMenu>
                );
            }
            return null;
        } else {
            return <Menu.Item key={item.path}>{this.getMenuItemPath(item)}</Menu.Item>;
        }
    };
    conversionPath = path => {
        if (path && path.indexOf('http') === 0) {
            return path;
        } else {
            return `/${path || ''}`.replace(/\/+/g, '/');
        }
    };
    getMenuItemPath = item => {
        const itemPath = this.conversionPath(item.path);
        const icon = getIcon(item.icon);
        const { target, name } = item;
        // Is it a http link
        if (/^https?:\/\//.test(itemPath)) {
            return (
                <a href={itemPath} target={target}>
                    {icon}
                    <span>{name}</span>
                </a>
            );
        }
        return (
            <Link
                to={itemPath}
                target={target}
                onClick={
                    this.props.isMobile
                        ? () => {
                            this.props.onCollapse(true);
                        }
                        : undefined
                }
            >
                {icon}
                <span>{name}</span>
            </Link>
        );
    };
    getNavMenuItems = (menusData = []) => {
        return menusData
            .filter(item => item.name && !item.hideInMenu)
            .map(item => {
                const ItemDom = this.getSubMenuOrItem(item);
                return this.checkPermissionItem(item.role, ItemDom);
            })
            .filter(item => item);
    };
    checkPermissionItem = (authRole, ItemDom) => {
        const { authorizeHelper, currentUserRole } = this.props;
        return authorizeHelper.check(authRole, currentUserRole, ItemDom);
    };
    render() {
        const { collapsed, onCollapse, logo, theme } = this.props;
        const { openKeys } = this.state;
        const menuProps = collapsed ? {} : { openKeys };
        let selectedKeys = this.getSelectedMenuKeys();
        if (!selectedKeys.length) {
            selectedKeys = [openKeys[openKeys.length - 1]];
        }
        const clsString = classNames({ 'app-sider-theme-light': theme === 'light' }, 'app-sider');
        return (
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                breakpoint="lg"
                onCollapse={() => onCollapse}
                width={200}
                className={clsString}
            >
                <div className="logo" key="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                        <h1>Demo Admin</h1>
                    </Link>
                </div>
                <Menu
                    key="Menu"
                    theme={theme}
                    mode="inline"
                    {...menuProps}
                    selectedKeys={selectedKeys}
                    onOpenChange={this.handleOpenChange}
                    style={{ padding: '16px 0', width: '100%' }}
                >
                    {this.getNavMenuItems(this.menus)}
                </Menu>
            </Sider>
        );
    }
}
