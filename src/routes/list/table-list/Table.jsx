import { Table } from 'antd';

const columns = [
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'Age', dataIndex: 'age', key: 'age' },
    { title: 'Column 1', dataIndex: 'address', key: '1' },
    { title: 'Column 2', dataIndex: 'address', key: '2' },
    { title: 'Column 3', dataIndex: 'address', key: '3' },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        width: 120,
        render() {
            return <a href="javascript:;"> action</a>;
        }
    }
];

const data = [];
for (let i = 0; i < 100; i++) {
    data.push({
        key: i,
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
    });
}

export default function T() {
    return <Table columns={columns} pagination={{ pageSize: 20 }} dataSource={data} />;
}
