import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { userActions } from 'reducers/auth';

import './index.less';
const FormItem = Form.Item;

@connect(
    ({ auth }) => ({ token: auth.token, isloading: auth.isloading }),
    { userLogin: userActions.userLogin }
)
@Form.create({})
class Login extends React.PureComponent {
    static propTypes = {
        history: PropTypes.object,
        form: PropTypes.object
    };
    handleLoginSuccess(user) {
        const { history, location } = this.props;
        this.props.userLogin(user, { location, history });
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
                    <FormItem key="username">
                        {getFieldDecorator('username', {
                            initialValue: 'liuxin',
                            rules: [{ required: true, message: '请输入您的用户名!' }]
                        })(
                            <Input
                                size="large"
                                prefix={<Icon type="user" className="input-icon" />}
                                placeholder="用户名或手机号"
                            />
                        )}
                    </FormItem>
                    <FormItem key="password">
                        {getFieldDecorator('password', {
                            initialValue: 'Aa123456',
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
