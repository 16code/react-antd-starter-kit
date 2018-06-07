import { Echarts, Chart } from 'components/Echarts';

class PieChart extends React.PureComponent {
    state = {
        option: {}
    };
    componentDidMount() {
        fetch('/charts/pie').then(response => {
            this.setState({ option: response.data });
        });
    }
    render() {
        return (
            <Echarts>
                <Chart name="myPie" option={this.state.option} />
            </Echarts>
        );
    }
}

export default PieChart;
