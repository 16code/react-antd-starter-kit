import { Icon, Button } from 'antd';
import './index.less';
export default function GlobalHeader({ collapsed, onCollapse, onToggleTheme }) {
    return (
        <div className="app-header">
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => onCollapse(!collapsed)}
            />
            <Button type="primary" onClick={onToggleTheme}>切换主题</Button>
        </div>
    );
}
