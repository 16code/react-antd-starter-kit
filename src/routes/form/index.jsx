import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route } from 'react-router-dom';

const Basic = AsyncComponent(() => import('./basic-form'));
const Step = AsyncComponent(() => import('./step-form'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route exact path={`${match.url}/basic-form`} component={Basic} />
                <Route exact path={`${match.url}/step-form`} component={Step} />
                <Route exact path={match.url} render={() => <Redirect to={`${match.url}/basic-form`} />} />
            </div>
        );
    }
}
