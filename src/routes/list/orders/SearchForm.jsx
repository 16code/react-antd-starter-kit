import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
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
        const layout = {
            sm: 12,
            md: 6,
            lg: 6,
            xl: 6
        };
        const formItemLayout = {};
        return (
            <Row gutter={8}>
                <Col span={20}>
                    <Form layout="vertical" onSubmit={this.handleSubmit}>
                        <Row gutter={8}>
                            <Col {...layout}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('origin')(
                                        <Select placeholder="来源">
                                            <Option value="">全部</Option>
                                            <Option value="self">自有产品</Option>
                                            <Option value="external">外部采购</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...layout}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('company')(
                                        <Select placeholder="所属公司">
                                            <Option value="">全部</Option>
                                            <Option value="Louisiana-Pacific Corporation">
                                                Louisiana-Pacific Corporation
                                            </Option>
                                            <Option value="Pharmacia Corp">Pharmacia Corp</Option>
                                            <Option value="Atmel Corporation">Atmel Corporation</Option>
                                            <Option value="Prudential Financial Inc.">Prudential Financial Inc.</Option>
                                            <Option value="NCR Corporation">NCR Corporation</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            </Col>
                            <Col {...layout}>
                                <FormItem {...formItemLayout}>
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
                            </Col>
                            <Col {...layout}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('date')(<DatePicker style={{ width: '100%' }} />)}
                                </FormItem>
                            </Col>
                            <Col {...layout}>
                                <FormItem {...formItemLayout}>
                                    {getFieldDecorator('name')(<Input placeholder="姓名" />)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col span={4}>
                    <div style={{ textAlign: 'right' }}>
                        <FormItem>
                            <Button type="primary" htmlType="button" onClick={this.handleSubmit}>
								查询
                            </Button>
                        </FormItem>
                        <FormItem>
                            <Button
                                type="default"
                                htmlType="button"
                                onClick={this.handleReset}
                                disabled={!isFieldsTouched()}
                            >
								重置
                            </Button>
                        </FormItem>	
                    </div>	
                </Col>
            </Row>
        );
    }
}
