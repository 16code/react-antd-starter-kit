import { Echarts, Chart } from 'components/Echarts';

class LineChart extends React.PureComponent {
    state = {
        option: {}
    };
    componentDidMount() {
        fetch('/charts/line').then(response => {
            this.setState({ option: response.data });
        });
    }
    render() {
        return (
            <Echarts>
                <Chart name="myLine" option={this.state.option} />
            </Echarts>
        );
    }
}

export default LineChart;
