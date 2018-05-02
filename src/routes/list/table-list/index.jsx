import { Input, Select } from 'antd';
import DynamicTable from 'components/DynamicTable';
import Header from './Header';
const Option = Select.Option;

export default class TableList extends React.PureComponent {
    handleClick = (record) => {
        console.log(record);
    };
    render() {
        const columns = [
            { title: 'Full Name', dataIndex: 'name', key: 'name' },
            { title: 'Age', dataIndex: 'age', key: 'age' },
            { title: 'Address', dataIndex: 'address', key: 'address' },
            { title: 'Email', dataIndex: 'email', key: 'email' },
            { title: 'Sex', dataIndex: 'sex', key: 'sex' },
            {
                title: 'Action',
                key: 'operation',
                fixed: 'right',
                width: 120,
                render: (record) => {
                    return (
                        <a href="javascript:;" onClick={() => this.handleClick(record)}>
                            action
                        </a>
                    );
                }
            }
        ];
        const data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edrward ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
                email: `130866602@qq.com. ${i}`,
                sex: '男'
            });
        }
        const extra = (<div>
            <Select
                showSearch
                style={{ width: 200, marginRight: 8 }}
                placeholder="Select a person"
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="tom">Tom</Option>
            </Select>
            <Input.Search onSearch={value => console.log(value)} placeholder="Basic usage" />
        </div>);
        return (
            <Header>
                <DynamicTable
                    dataSource={data}
                    columns={columns}
                    extra={extra}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1030 }}
                />
            </Header>
        );
    }
}
