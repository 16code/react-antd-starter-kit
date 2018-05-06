import { Form, Input, Button, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
@Form.create()
export default class SearchForm extends React.PureComponent {
    handleReset = () => {
        this.props.form.resetFields();
        this.props.onReset && this.props.onReset();
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (values.date) {
                    values.date = moment(values.date).format('YYYY-MM-DD');
                }
                this.props.onSearch && this.props.onSearch(values);
            }
        });
    };
    render() {
        const { getFieldDecorator, isFieldsTouched } = this.props.form;
        return (
            <div>
                <Form layout="vertical" onSubmit={this.handleSubmit}>
                    <FormItem label="来源">
                        {getFieldDecorator('origin')(
                            <Select placeholder="来源">
                                <Option value="">全部</Option>
                                <Option value="self">自有产品</Option>
                                <Option value="external">外部采购</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="所属公司">
                        {getFieldDecorator('company')(
                            <Select placeholder="所属公司">
                                <Option value="">全部</Option>
                                <Option value="Louisiana-Pacific Corporation">Louisiana-Pacific Corporation</Option>
                                <Option value="Pharmacia Corp">Pharmacia Corp</Option>
                                <Option value="Atmel Corporation">Atmel Corporation</Option>
                                <Option value="Prudential Financial Inc.">Prudential Financial Inc.</Option>
                                <Option value="NCR Corporation">NCR Corporation</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="品类">
                        {getFieldDecorator('category')(
                            <Select placeholder="品类">
                                <Option value="">全部</Option>
                                <Option value="jacket">上衣</Option>
                                <Option value="shoes">鞋子</Option>
                                <Option value="socks">袜子</Option>
                                <Option value="hat">帽子</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="上架日期">
                        {getFieldDecorator('date')(<DatePicker style={{ width: '100%' }} />)}
                    </FormItem>
                    <FormItem label="名称">{getFieldDecorator('name')(<Input />)}</FormItem>
                    <FormItem>
                        <div>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </div>
                        <div>
                            <Button
                                type="default"
                                htmlType="button"
                                onClick={this.handleReset}
                                disabled={!isFieldsTouched()}
                            >
                                重置
                            </Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}