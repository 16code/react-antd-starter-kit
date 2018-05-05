import PageHeaderLayout from 'layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import { Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const description = (
    <DescriptionList size="small" col="2">
        <Description term="查询人">测试</Description>
        <Description term="查询时间">2018-05-01</Description>
        <Description term="服务">XX 服务</Description>
        <Description term="外部链接"><a href="">12421</a></Description>
    </DescriptionList>
);

const menu = (
    <Menu>
        <Menu.Item key="1">选项一</Menu.Item>
        <Menu.Item key="2">选项二</Menu.Item>
        <Menu.Item key="3">选项三</Menu.Item>
    </Menu>
);

const action = (
    <div>
        <ButtonGroup>
            <Button>导出</Button>
            <Button>编辑</Button>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button><Icon type="ellipsis" /></Button>
            </Dropdown>
        </ButtonGroup>
        <Button type="primary">新增用户</Button>
    </div>
);

const extra = (
    <Row>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>在线用户</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>3017</div>
        </Col>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>用户总数</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>168,123</div>
        </Col>
    </Row>
);

const tabList = [{
    key: 'detail',
    tab: '在线用户'
}, {
    key: 'rule',
    tab: '离线用户'
}];

function onTabChange(key) {
    console.log(key);
}
export default function D(props) {
    return (
        <PageHeaderLayout
            title="用户列表"
            logo={<img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />}
            action={action}
            content={description}
            extraContent={extra}
            tabList={tabList}
            tabActiveKey="detail"
            onTabChange={onTabChange}
        >
            {props.children}	
        </PageHeaderLayout>	
    );
};
