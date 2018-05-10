export default class TopDrawer extends React.PureComponent {
    render() {
        const { children, className } = this.props;
        return (
            <div className={className}>{children}</div>
        );
    }
}
