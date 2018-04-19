import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route } from 'react-router-dom';

const Articles = AsyncComponent(() => import('./articles'));
const Projects = AsyncComponent(() => import('./projects'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route exact path={`${match.url}/projects`} component={Projects} />
                <Route exact path={`${match.url}/articles`} component={Articles} />
                <Route exact path={match.url} render={() => <Redirect to={`${match.url}/articles`} />} />
            </div>
        );
    }
}
