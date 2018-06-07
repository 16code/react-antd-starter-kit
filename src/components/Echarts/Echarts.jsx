import PropTypes from 'prop-types';
import Loader from './loader';
import themeJson from './theme.json';

export default class Echarts extends React.PureComponent {
    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]).isRequired
    };
    state = {
        echartLoaded: false
    };
    instances = {};
    constructor(props) {
        super(props);
        this.childrenCount = React.Children.count(props.children);
        this.echarts = null;
        this.loader = new Loader().require({
            v: '4.1.0',
            file: 'echarts.min.js',
            host: '//cdn.bootcss.com/echarts'
        });
    }
    componentDidMount() {
        this.loader.then(echarts => {
            if (!this.echarts) {
                this.echarts = echarts;
                this.echarts.registerTheme('macarons', themeJson.theme);
                this.setState({ echartLoaded: true });
            }
        });
    }
    handleChartCreated = (instance, name) => {
        this.instances[name] = instance;
        if (this.childrenCount === Object.keys(this.instances).length) {
            this.props.onCreated && this.props.onCreated(this.instances);
        }
    };
    renderChildren(children) {
        return React.Children.map(children, (child, index) => {
            const { name, className, style, ...otherProps } = child.props;
            const instanceName = name || `echart_instance_${index}`;
            const mergedClassNames = ['echart-item', instanceName, className].join(' ');
            const newStyle = Object.assign({ width: '100%', height: '400px' }, style);
            return (
                <div className={mergedClassNames} style={newStyle}>
                    {React.cloneElement(child, {
                        echarts: this.echarts,
                        theme: 'macarons',
                        name: instanceName,
                        onCreated: this.handleChartCreated,
                        style: { width: '100%', height: '100%' },
                        ...otherProps
                    })}
                </div>
            );
        });
    }
    render() {
        const { children, className } = this.props;
        const { echartLoaded } = this.state;
        const mergedClassNames = ['echart-wrapper clearfix', className].join(' ');
        return children && <div className={mergedClassNames}>{echartLoaded && this.renderChildren(children)}</div>;
    }
}
