import { Echarts, Chart } from 'components/Echarts';

class BarChart extends React.PureComponent {
    state = {
        option: {}
    };
    componentDidMount() {
        fetch('/charts/bar').then(response => {
            this.setState({ option: response.data });
        });
    }
    render() {
        return (
            <Echarts>
                <Chart name="myBar" option={this.state.option} />
            </Echarts>
        );
    }
}

export default BarChart;
