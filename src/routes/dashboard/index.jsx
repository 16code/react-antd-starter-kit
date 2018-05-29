import { Row, Col, Card } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { BlockLayout } from '../../layouts';
// 数据源
const data = [
    { genre: 'Sports', sold: 275, income: 2300 },
    { genre: 'Strategy', sold: 115, income: 667 },
    { genre: 'Action', sold: 120, income: 982 },
    { genre: 'Shooter', sold: 350, income: 5271 },
    { genre: 'Other', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
    sold: {
        alias: '销售量',
        min: 0,
        max: 400
    },
    genre: { alias: '游戏种类' }
};
const title = {
    x: {
        autoRotate: true,
        offset: 35
    },
    y: {
        autoRotate: true,
        offset: 50
    }
};
const label = {
    autoRotate: true,
    offset: 15
}; 
export default class Dashboard extends React.PureComponent {
    renderChart() {
        return (
            <Chart height={320} padding={[40, 0, 40, 60]} data={data} scale={cols} forceFit>
                <Axis name="genre" title={title.x} label={label} />
                <Axis name="sold" title={title.y} label={label} />
                <Legend position="top" />
                <Tooltip />
                <Geom type="interval" position="genre*sold" color="genre" />
            </Chart>
        );
    }
    render() {
        return (
            <BlockLayout>
                <Row>
                    <Col span={12}>
                        <Card title="销售量">
                            {this.renderChart()}
                        </Card>	
                    </Col>
                </Row>
            </BlockLayout>
        );
    }
}