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
        option.color = [
            '#19d4ae',
            '#5ab1ef',
            '#fa6e86',
            '#ffb980',
            '#0067a6',
            '#c4b4e4',
            '#d87a80',
            '#9cbbff',
            '#d9d0c7',
            '#87a997',
            '#d49ea2',
            '#5b4947',
            '#7ba3a8'
        ];
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
