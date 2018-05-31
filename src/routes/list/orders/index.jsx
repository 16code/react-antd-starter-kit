import { Radio, Tag, Modal, Button, Steps, Form, Input, Select, Upload, Icon } from 'antd';
import { TopDrawerLayout } from 'layouts';
import { connect } from 'react-redux';
import DockPanel from 'components/DockPanel';
import DynamicTable from 'components/DynamicTable';
import SearchForm from './SearchForm';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const Step = Steps.Step;
const FormItem = Form.Item;
const Option = Select.Option;

@connect(({ ajax }) => ({ isFetching: ajax.isFetching }))
export default class Products extends React.PureComponent {
    state = {
        params: {},
        panelVisible: false,
        importPanelVisible: false,
        record: {}
    };
    handleColseDock = () => {
        this.setState({ panelVisible: false, importPanelVisible: false });
    };
    handleShowDock = record => {
        const { name, origin, sales, stock } = record;
        const panelExtraData = {
            name: {
                label: '名称',
                value: name
            },
            origin: {
                label: '来源',
                value: origin
            },
            sales: {
                label: '销量',
                value: sales
            },
            stock: {
                label: '库存',
                value: stock
            }
        };
        this.setState({ panelVisible: true, panelExtraData, record });
    };
    handleReset = () => {
        this.setState({ params: { state: '' } });
    };
    handleSearch = values => {
        values.state = this.state.params.state;
        this.setState({ params: { ...values } });
    };
    handleStateChange = e => {
        this.setState(prevState => {
            prevState.params.state = e.target.value;
            return { params: { ...prevState.params } };
        });
    };
    handleClickAction = (key, extra) => {
        console.info(extra);
        if (key === 'delete') {
            showDeleteConfirm({
                title: '你确定要删除该产品吗?',
                content: extra.name.value,
                onOk: this.handleConfirmOk
            });
        }
    };
    handleImport = () => {
        this.setState({ importPanelVisible: true });
    };
    render() {
        const columns = [
            {
                title: '名称',
                dataIndex: 'image',
                key: 'image',
                render: (value, record) => {
                    return (
                        <div>
                            <img src={value} width="50" height="67" />
                            <a
                                href="javascript:;"
                                style={{ paddingLeft: '8px' }}
                                onClick={() => this.handleShowDock(record)}
                            >
                                {record.name}
                            </a>
                        </div>
                    );
                }
            },
            { title: '操作员', dataIndex: 'createUser', key: 'createUser' },
            { title: '分类', dataIndex: 'category', key: 'category' },
            { title: '颜色', dataIndex: 'color', key: 'color' },
            { title: '单价', dataIndex: 'price', key: 'price' },
            { title: '销量', dataIndex: 'sales', key: 'sales' },
            { title: '库存', dataIndex: 'stock', key: 'stock' },
            {
                title: '来源',
                dataIndex: 'origin',
                key: 'origin',
                render: value => {
                    const gender =
                        value === 'self' ? { name: '自有产品', color: 'blue' } : { name: '外部采购', color: 'gold' };
                    return <Tag color={gender.color}>{gender.name}</Tag>;
                }
            },
            { title: '所属公司', dataIndex: 'company', key: 'company' },
            { title: '部门', dataIndex: 'department', key: 'department' },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: value => {
                    const gender =
                        value === 'online' ? { name: '已上线', color: 'green' } : { name: '已下线', color: 'magenta' };
                    return <Tag color={gender.color}>{gender.name}</Tag>;
                }
            },
            { title: '上架时间', dataIndex: 'createAt', key: 'createAt' }
        ];
        const extra = [
            <RadioGroup key="state" onChange={this.handleStateChange} value={this.state.params.state}>
                <RadioButton value="">全部</RadioButton>
                <RadioButton value="online">已上线</RadioButton>
                <RadioButton value="offline">已下线</RadioButton>
            </RadioGroup>
        ];
        const form = (
            <SearchForm loading={this.props.isFetching} onSearch={this.handleSearch} onReset={this.handleReset} />
        );
        const action = (
            <Button icon="to-top" onClick={this.handleImport}>导入</Button>
        );
        const step1 = (
            <div>
                <FormItem>
                    <Input placeholder="产品名称" />
                </FormItem>
                <FormItem label="数据来源">
                    <Select placeholder="来源" style={{ width: '100%' }}>
                        <Option value="self">自有产品</Option>
                        <Option value="external">外部采购</Option>
                    </Select>
                </FormItem>
            </div>
        );
        const step2 = (
            <FormItem>
                <Button href="#" icon="download" style={{ width: '100%' }}>下载模板</Button>
            </FormItem>	
        );
        const Dragger = Upload.Dragger;
        const step3 = (
            <FormItem>
                <Dragger>
                    <p className="ant-upload-drag-icon"><Icon type="inbox" /></p>
                    <p className="ant-upload-text">点击或拖拽文件至此区域</p>				
                </Dragger>
            </FormItem>
        );
        return (
            <TopDrawerLayout content={form} sidebarWidth={240} action={action}>
                <DynamicTable
                    rowKey="id"
                    url="/products"
                    searchParams={this.state.params}
                    fieldKey="data"
                    columns={columns}
                    scroll={{ x: 1440 }}
                    extra={extra}
                    showSizeChanger
                />
                <DockPanel
                    title="产品详情"
                    size="middle"
                    visible={this.state.panelVisible}
                    onClose={this.handleColseDock}
                    loading={this.props.isFetching}
                    extra={this.state.panelExtraData}
                    onClickAction={this.handleClickAction}
                >
                    <pre>{JSON.stringify(this.state.record, null, 2)}</pre>
                </DockPanel>
                <DockPanel
                    title="产品导入"
                    size="small"
                    visible={this.state.importPanelVisible}
                    onClose={this.handleColseDock}
                >
                    <Steps direction="vertical" size="small" current={-1}>
                        <Step title="设置选项" description={step1} />
                        <Step title="下载模板" description={step2} />
                        <Step title="上传文件" description={step3} />
                    </Steps>
                </DockPanel>
            </TopDrawerLayout>
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
