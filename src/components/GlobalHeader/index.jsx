import { Icon, Menu, Dropdown, Avatar, Tooltip, Divider } from 'antd';
import { Link } from 'routes/shell';
import styles from './index.less';

function HeaderMenu(props) {
    const menu = (
        <Menu onClick={props.onMenuClick} className={styles.menu} selectedKeys={[]}>
            <Menu.Item disabled>
                <Icon type="user" />个人中心
            </Menu.Item>
            <Menu.Item disabled>
                <Icon type="setting" />设置
            </Menu.Item>
            <Menu.Item key="changeTheme"><Icon type="setting" />切换主题</Menu.Item>
            <Menu.Divider />
            <Menu.Item key="logout"><Icon type="logout" /> 退出登录</Menu.Item>
        </Menu>
    );
    return (
        <Dropdown overlay={menu}>
            <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                    size="small"
                    icon="user"
                    src={require('../../assets/avatar.png')}
                    className={styles.avatar}
                />
                <span className={styles.name}>Liuxin Test</span>
            </span>
        </Dropdown>
    );
}

export default function GlobalHeader({ logo, isMobile, collapsed, onCollapse, onMenuClick }) {
    return (
        <div className={[styles.header]}>
            {isMobile && [
                <Link to="/" className={styles.logo} key="logo">
                    <img src={logo} alt="logo" width="32" />
                </Link>,
                <Divider type="vertical" key="line" />
            ]}
            <Icon
                className={styles.trigger}
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => onCollapse(!collapsed)}
            />
            <div className={styles.right}>
                <Tooltip title="使用文档">
                    <a
                        target="_blank"
                        href="#"
                        rel="noopener noreferrer"
                        className={styles.action}
                    >
                        <Icon type="question-circle-o" />
                    </a>
                </Tooltip>
                <HeaderMenu onMenuClick={onMenuClick} />
            </div>

        </div>
    );
}
