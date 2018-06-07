/* eslint-disable */
import { Echarts, Chart } from 'components/Echarts';
import Draggable from './Draggable';

class Home extends React.PureComponent {
    state = {};
    componentDidMount() {
        fetch('/charts').then(response => {
            this.setState({
                data: response.data
            });
        });
    }
    handleEchartCreated = ({ barChart, lineChart, pieChart, radarChart }) => {
        fetch('/charts/bar').then(response => {
            barChart.setOption(response.data);
        });
        fetch('/charts/line').then(response => {
            lineChart.setOption(response.data);
        });
        fetch('/charts/pie').then(response => {
            pieChart.setOption(response.data);
        });
        fetch('/charts/radar').then(response => {
            radarChart.setOption(response.data);
        });
        lineChart.on('click', params => {
            console.log(params);
        });
        lineChart.on('legendselectchanged', params => {
            console.log('legendselectchanged', params);
        });
    };
    render() {
        return (
            <div className="page-content ant-layout-content" style={{ opacity: 1 }}>
                <Draggable data={this.state.data} />

                <Echarts onCreated={this.handleEchartCreated} className="echart-wrapper-custom">
                    <Chart type="bar" name="barChart" />
                    <Chart type="line" style={{ width: '48%', float: 'left' }} name="lineChart" />
                    <Chart type="pie" style={{ width: '48%', float: 'right' }} name="pieChart" />
                    <Chart type="radar" name="radarChart" style={{ float: 'left' }} />
                </Echarts>
            </div>
        );
    }
}

export default Home;
