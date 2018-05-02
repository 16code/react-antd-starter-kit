import PageHeaderLayout from 'layouts/PageHeaderLayout';
import DescriptionList from 'components/DescriptionList';
import { Button, Menu, Dropdown, Icon, Row, Col } from 'antd';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const description = (
    <DescriptionList size="small" col="2">
        <Description term="创建人">测试</Description>
        <Description term="订购产品">XX 服务</Description>
        <Description term="创建时间">2018-04-28</Description>
        <Description term="关联单据"><a href="">12421</a></Description>
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
            <Button>操作</Button>
            <Button>操作</Button>
            <Dropdown overlay={menu} placement="bottomRight">
                <Button><Icon type="ellipsis" /></Button>
            </Dropdown>
        </ButtonGroup>
        <Button type="primary">主操作</Button>
    </div>
);

const extra = (
    <Row>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>状态</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>待审批</div>
        </Col>
        <Col sm={24} md={12}>
            <div style={{ color: 'rgba(0, 0, 0, 0.43)' }}>订单金额</div>
            <div style={{ color: 'rgba(0, 0, 0, 0.85)', fontSize: 20 }}>¥ 568.08</div>
        </Col>
    </Row>
);

const tabList = [{
    key: 'detail',
    tab: '列表1'
}, {
    key: 'rule',
    tab: '列表2'
}];

function onTabChange(key) {
    console.log(key);
}
export default function D(props) {
    return (
        <PageHeaderLayout
            title="单号：234231029431"
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
