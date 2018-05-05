import className from 'classnames';
import styles from './index.less';

export default function DockPanelBody({ extra, children }) {
    const bodyCls = className(styles['dock-panel-body'], { [styles['with-header-extra']]: extra });
    return (
        <div className={bodyCls}>{children}</div>
    );

}