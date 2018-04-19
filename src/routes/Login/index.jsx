import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.less';
const FormItem = Form.Item;
class Login extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object,
        form: PropTypes.object
    };
    handleLoginSuccess(userData) {
        const { history, location } = this.props;
        const {
            state: { from }
        } = location;
        localStorage.setItem('user', JSON.stringify(userData));
        history.push({ pathname: from.pathname || '/' });
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { userName, password } = values;
                if (userName && password) {
                    this.handleLoginSuccess(values);
                }
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-form-wrapper">
                <img src={require('./logo.png')} alt="logo" className="logo" />
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入您的用户名!' }]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="user" className="input-icon" />}
                                placeholder="用户名或手机号"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入您的用户密码!' }]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="lock" className="input-icon" />}
                                type="password"
                                autoComplete="off"
                                placeholder="登陆密码"
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true
                        })(<Checkbox>记住用户名</Checkbox>)}
                        <a className="login-form-forgot" href="">
                            忘记密码
                        </a>
                        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
                            登陆
                        </Button>
                    </FormItem>
                </Form>
                <img src={require('./bg.png')} alt="bg" className="background" />
            </div>
        );
    }
}

export default Form.create()(Login);
