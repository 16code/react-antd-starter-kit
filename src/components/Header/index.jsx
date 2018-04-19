import { Icon } from 'antd';
import './index.less';
export default function GlobalHeader({ collapsed, onCollapse }) {
    return (
        <div className="app-header">
            <Icon
                className="trigger"
                type={collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={() => onCollapse(!collapsed)}
            />
        </div>
    );
}
