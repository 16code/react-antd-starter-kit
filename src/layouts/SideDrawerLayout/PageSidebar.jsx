import styles from './style';
export default class PageSidebar extends React.PureComponent {
    render() {
        return (
            <div className={styles['drawer-sidebar']}>
                <div className={[styles['drawer-sidebar-inner']]}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
