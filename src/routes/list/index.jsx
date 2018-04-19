import AsyncComponent from 'components/AsyncComponent';
import { Redirect, Route } from 'react-router-dom';

const Search = AsyncComponent(() => import('./search'));
const Tablelist = AsyncComponent(() => import('./table-list'));

export default class Forms extends React.PureComponent {
    render() {
        const { match } = this.props;
        return (
            <div>
                <Route exact path={`${match.url}/table-list`} component={Tablelist} />
                <Route exact path={match.url} render={() => <Redirect to={`${match.url}/table-list`} />} />
                <Route path={`${match.url}/search`} component={Search} />
            </div>
        );
    }
}
