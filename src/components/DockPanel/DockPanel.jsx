import className from 'classnames';
import styles from './index.less';
export function DockPanelWrapper({ visible, size, children }) {
    const visibleCls = className({ [styles.visible]: visible });
    const panelCls = className(styles['dock-panel'], { [`${styles[size]}`]: size });
    const panel = (
        <div key="panel" className={className([panelCls, visibleCls])}>
            {children}
        </div>
    );
    return panel;
}
export function DockPanelMask({ visible, onClick }) {
    const visibleCls = className({ [styles.visible]: visible });
    const mask = <div key="mask" className={className(styles['dock-panel-mask'], visibleCls)} onClick={onClick} />;
    return mask;
}
