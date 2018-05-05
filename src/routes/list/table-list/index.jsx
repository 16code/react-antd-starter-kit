import { Input, Select, Tag, Avatar, DatePicker, Modal, Card, Collapse, Timeline } from 'antd';
import connect from 'redux-connect-decorator';
import DynamicTable from 'components/DynamicTable';
import DockPanel from 'components/DockPanel';
import DescriptionList from 'components/DescriptionList';
import { delay } from 'utils/index.js';
import Header from './Header';

const { Description } = DescriptionList;
const Panel = Collapse.Panel;
const Option = Select.Option;

@connect(({ ajax }) => ({ isFetching: ajax.isFetching }))
export default class TableList extends React.PureComponent {
    state = {
        params: {},
        panelVisible: false,
        record: {}
    };
    actions = ['delete', 'export', 'share'];
    handleShowDock = record => {
        const { address, userName, email } = record;
        const panelExtraData = {
            userName: {
                label: '姓名',
                value: userName
            },
            email: {
                label: '邮箱',
                value: email
            },
            address: {
                label: '地址',
                value: address
            }
        };
        this.setState({ panelVisible: true, panelExtraData, record });
    };
    handleColseDock = () => {
        this.setState({ panelVisible: false });
    };
    handleUpdateParams(key, value = '') {
        const { params } = this.state;
        if (!params[key] && value.trim() === '') return;
        if (params[key] !== value) {
            params[key] = value;
            this.setState({ params: { ...params } });
        }
    }
    personSelect() {
        return (
            <Select
                showSearch
                key="searchPerson"
                placeholder="性别"
                optionFilterProp="children"
                onChange={v => this.handleUpdateParams('gender', v)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="">不限</Option>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
            </Select>
        );
    }
    searchInput() {
        return [
            <Input.Search
                key="searchUser"
                onBlur={event => this.handleUpdateParams('username', event.target.value)}
                onSearch={v => this.handleUpdateParams('username', v)}
                placeholder="姓名"
            />,
            <Input.Search
                key="searchPhone"
                onBlur={event => this.handleUpdateParams('phone', event.target.value)}
                onSearch={v => this.handleUpdateParams('phone', v)}
                placeholder="电话"
            />,
            <DatePicker
                key="searchDate"
                onChange={(v, dateString) => this.handleUpdateParams('createAt', dateString)}
                placeholder="创建时间"
            />
        ];
    }
    handleConfirmOk = async () => {
        await delay(3000);
        this.setState({ panelVisible: false });
    };
    handleClickAction = (key, extra) => {
        if (key === 'delete') {
            showDeleteConfirm({
                title: `你确定要删除用户${extra.userName.value}吗?`,
                content: `该操作执行后不可恢复, 用户地址: ${extra.address.value}`,
                onOk: this.handleConfirmOk
            });
        }
    };
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
                width: 200,
                render: (value, { avatar }) => {
                    return [
                        <Avatar key="avatar" src={avatar} />,
                        <span style={{ paddingLeft: 5 }} key="name">
                            {value}
                        </span>
                    ];
                }
            },
            {
                title: '性别',
                dataIndex: 'gender',
                key: 'gender',
                render: value => {
                    const gender = value === 'Male' ? { name: '男', color: 'green' } : { name: '女', color: 'magenta' };
                    return <Tag color={gender.color}>{gender.name}</Tag>;
                }
            },
            { title: '邮件', dataIndex: 'email', key: 'email' },
            { title: '公司', dataIndex: 'company', key: 'company' },
            { title: '地址', dataIndex: 'address', key: 'address' },
            { title: '邮编', dataIndex: 'zipcode', key: 'zipcode' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 80,
                render: record => {
                    return (
                        <div>
                            <a href="javascript:;" onClick={() => this.handleShowDock(record)}>
                                详情
                            </a>
                        </div>
                    );
                }
            }
        ];
        const extra = [this.personSelect(), this.searchInput()];
        return (
            <Header>
                <DynamicTable
                    rowKey="id"
                    url="/users"
                    searchParams={this.state.params}
                    fieldKey="data"
                    columns={columns}
                    extra={extra}
                    scroll={{ x: 1280 }}
                    showSizeChanger
                />
                <DockPanel
                    title="查看详情"
                    size="large"
                    visible={this.state.panelVisible}
                    onClose={this.handleColseDock}
                    loading={this.props.isFetching}
                    extra={this.state.panelExtraData}
                    actions={this.actions}
                    onClickAction={this.handleClickAction}
                >
                    <Card>
                        <Collapse bordered={false} defaultActiveKey={['1']}>
                            <Panel header="主信息" key="1">
                                <DescriptionList size="small" col="2">
                                    <Description term="用户ID">{this.state.record.id}</Description>
                                    <Description term="姓名">{this.state.record.userName}</Description>
                                    <Description term="性别">{this.state.record.gender}</Description>
                                    <Description term="职位">{this.state.record.profession}</Description>
                                    <Description term="电话">{this.state.record.phone}</Description>
                                    <Description term="生日">{this.state.record.birthday}</Description>
                                </DescriptionList>
                            </Panel>
                            <Panel header="其它信息" key="2">
                                <DescriptionList size="small" col="2">
                                    <Description term="年龄">{this.state.record.age}</Description>
                                    <Description term="国家">{this.state.record.country}</Description>
                                    <Description term="邮箱">{this.state.record.email}</Description>
                                    <Description term="主页">{this.state.record.website}</Description>
                                    <Description term="公司">{this.state.record.company}</Description>
                                    <Description term="IP">{this.state.record.ip}</Description>
                                    <Description term="注册">{this.state.record.createAt}</Description>
                                    <Description term="最后登录">{this.state.record.updateAt}</Description>
                                </DescriptionList>
                                <br />
                                <DescriptionList size="small" col="1">
                                    <Description term="代理">{this.state.record.userAgent}</Description>
                                </DescriptionList>
                            </Panel>
                            <Panel header="操作日志" key="3">
                                <Timeline>
                                    <Timeline.Item>Create a services site 2017-09-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2017-09-01</Timeline.Item>
                                    <Timeline.Item>Technical testing 2018-01-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2018-04-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2017-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2018-04-01</Timeline.Item>
                                    <Timeline.Item>Technical testing 2018-01-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2018-04-01</Timeline.Item>
                                    <Timeline.Item>Solve initial network problems 2017-09-01</Timeline.Item>
                                    <Timeline.Item>Network problems being solved 2018-04-01</Timeline.Item>
                                </Timeline>
                            </Panel>
                        </Collapse>

                    </Card>	
                </DockPanel>	
            </Header>
        );
    }
}

function showDeleteConfirm({ title, content, ...rest }) {
    Modal.confirm({
        title,
        content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        width: 520,
        ...rest
    });
}
