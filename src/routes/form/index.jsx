import { Redirect, Route, Switch, Link } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';
import PageHeaderLayout from 'layouts/PageHeaderLayout';

const Basic = AsyncComponent(() => import('./basic-form'));
const Step = AsyncComponent(() => import('./step-form'));

const Topic = ({ match }) => (
    <div>
        <h3>Topic {match.params.userId}</h3>
    </div>
);

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <PageHeaderLayout
                title="基础表单"
                content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
                {...this.props}
            >
                <Link to={'/form/step-form/user1'}>user1</Link>
                <br />
                <br />
                <Link to={'/form/step-form/user2'}>user2</Link>
                <br />
                <br />
                <Link to={'/form/step-form1111'}>404页面</Link>
                <Switch>
                    <Redirect exact from={match.path} to={`${match.path}/basic-form`} />
                    <Route exact path={`${match.path}/step-form/:userId`} component={Topic} />
                    <Route exact path={`${match.path}/step-form`} component={Step} />
                    <Route exact path={`${match.path}/basic-form`} component={Basic} />
                    <Route render={() => <Redirect to="/404" />} />
                </Switch>
            </PageHeaderLayout>
        );
    }
}
