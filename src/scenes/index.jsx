import { Switch, Route } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';
const AsyncHome = AsyncComponent(() => import('./Home'));

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={AsyncHome} />
        </Switch>
    );
}
Routes.displayName = 'Routes';
