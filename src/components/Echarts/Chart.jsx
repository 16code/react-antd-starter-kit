export default class Chart extends React.PureComponent {
    static defaultProps = {
        option: {}
    };
    constructor() {
        super();
        this.dom = React.createRef();
        this.chart = null;
    }
    componentDidMount() {
        const { echarts, theme, onCreated, name } = this.props;
        this.chart = echarts.init(this.dom.current, theme);
        this.setOption();
        onCreated(this.chart, name);
        window.addEventListener('resize', this.handleResize);	
    }
    componentDidUpdate() {
        this.setOption();
    }
    componentWillUnmount() {
        this.dispose();
        window.removeEventListener('resize', this.handleResize);
    }
    setOption() {
        const { option } = this.props;
        this.chart && this.chart.setOption(option);
    }
    dispose() {
        if (this.chart) {
            this.chart.dispose();
            this.chart = null;
        }
    }
    handleResize = () => {
        this.chart && this.chart.resize();
    };
    render() {
        const { style } = this.props;
        return <div ref={this.dom} style={style} />;
    }
}
