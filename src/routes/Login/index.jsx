import PropTypes from 'prop-types';
import connect from 'redux-connect-decorator';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { authRequest } from 'reducers/auth';

import './index.less';
const FormItem = Form.Item;

@connect(({ auth }) => ({ token: auth.token, isloading: auth.isloading }), { authRequest })
@Form.create({})
class Login extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object,
        form: PropTypes.object
    };
    handleLoginSuccess(user) {
        const { history, location } = this.props;
        const { state } = location;
        const toPathName = (state && state.from && state.from.pathname) || '/';
        user.client_id = '55d584fa0d074d71bebcaeea613013c3';
        user.grant_type = 'password';
        user.terminal = 'MC';
        user.username = 'fuchao';
        user.password = 'Aa123456';
        user.terminal_type = 'terminal_type';
        this.props.authRequest(user, toPathName, history);
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, password } = values;
                if (username && password) {
                    this.handleLoginSuccess(values);
                }
            }
        });
    };
    getBtnText(state) {
        return state ? '登录中...' : '登 陆';
    }
    render() {
        const { isloading, form } = this.props;
        const { getFieldDecorator } = form;
        return (
            <div className="login-form-wrapper">
                {this.props.isloading}
                <img src={require('./logo.png')} alt="logo" className="logo" />
                <Form className="login-form" onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('username', {
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
                        <Button
                            loading={this.props.isloading}
                            size="large"
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            {this.getBtnText(isloading)}
                        </Button>
                    </FormItem>
                </Form>
                <img src={require('./bg.png')} alt="bg" className="background" />
            </div>
        );
    }
}

export default Login;
