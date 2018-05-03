import { Input, Select, Tag, Avatar, DatePicker } from 'antd';
import DynamicTable from 'components/DynamicTable';
import Header from './Header';
const Option = Select.Option;

export default class TableList extends React.PureComponent {
	state = {
	    params: {}
	};
    handleClick = record => {
        console.log(record);
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
                filterOption={(input, option) =>
                    option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
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
            { title: '电话', dataIndex: 'phone', key: 'phone', width: 140 },
            { title: '邮件', dataIndex: 'email', key: 'email' },
            { title: '公司', dataIndex: 'company', key: 'company' },
            { title: '地址', dataIndex: 'address', key: 'address' },
            { title: '邮编', dataIndex: 'zipcode', key: 'zipcode' },
            { title: '创建时间', dataIndex: 'createAt', key: 'createAt' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 80,
                render: record => {
                    return (
                        <a href="javascript:;" onClick={() => this.handleClick(record)}>
                            action
                        </a>
                    );
                }
            }
        ];
        const extra = [this.personSelect(), this.searchInput()];
        return (
            <Header>
                <DynamicTable
                    rowKey="id"
                    url="/list"
                    searchParams={this.state.params}
                    fieldKey="data"
                    columns={columns}
                    extra={extra}
                    scroll={{ x: 1240 }}
                    showSizeChanger
                />
            </Header>
        );
    }
}
