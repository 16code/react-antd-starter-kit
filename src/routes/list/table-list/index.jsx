import { Input, Select, Tag, Avatar } from 'antd';
import DynamicTable from 'components/DynamicTable';
import Header from './Header';
const Option = Select.Option;

export default class TableList extends React.PureComponent {
    state = {
        list: [],
        pagination: {
            current: 1,
            pageSize: 20,
            showSizeChanger: true,
            onChange: this.handleShowSizeChange.bind(this),
            onShowSizeChange: this.handleShowSizeChange.bind(this)
        }
    };
    handleClick = record => {
        console.log(record);
    };
    handleShowSizeChange(current, pagSize) {
        const { pagination } = this.state;
        pagination.current = current;
        pagination.pageSize = pagSize;
        this.setState({ pagination }, () => {
            this.fetchData();
        });
    };
    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        const { current, pageSize } = this.state.pagination;
        fetch('/list', {
            params: {
                pageSize,
                current
            }
        })
            .then(res => {
                this.setState({
                    list: res.data,
                    pagination: Object.assign(this.state.pagination, res.meta)
                });
            })
            .catch(error => {
                console.info(error, 'list');
            });
    }
    render() {
        const columns = [
            {
                title: '姓名',
                dataIndex: 'userName',
                key: 'userName',
                width: 140,
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
            { title: '电话', dataIndex: 'phone', key: 'phone' },
            { title: '邮件', dataIndex: 'email', key: 'email' },
            { title: '公司', dataIndex: 'company', key: 'company' },
            { title: '地址', dataIndex: 'address', key: 'address' },
            { title: '邮编', dataIndex: 'zipcode', key: 'zipcode' },
            { title: '更新时间', dataIndex: 'createAt', key: 'createAt' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 120,
                render: record => {
                    return (
                        <a href="javascript:;" onClick={() => this.handleClick(record)}>
                            action
                        </a>
                    );
                }
            }
        ];
        const extra = (
            <div>
                <Select
                    showSearch
                    style={{ width: 200, marginRight: 8 }}
                    placeholder="Select a person"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="tom">Tom</Option>
                </Select>
                <Input.Search onSearch={value => console.log(value)} placeholder="Basic usage" />
            </div>
        );
        return (
            <Header>
                <DynamicTable
                    rowKey="id"
                    dataSource={this.state.list}
                    columns={columns}
                    extra={extra}
                    pagination={this.state.pagination}
                    scroll={{ x: 1200 }}
                />
            </Header>
        );
    }
}
