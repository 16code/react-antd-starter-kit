import DynamicTable from 'components/DynamicTable';
import Header from './Header';
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
        return (
            <Header>
                <DynamicTable
                    dataSource={data}
                    columns={columns}
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 1030 }}
                />
            </Header>
        );
    }
}
