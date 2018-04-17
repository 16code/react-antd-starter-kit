import { Switch, Route } from 'react-router-dom';
import AsyncComponent from 'components/AsyncComponent';
const AsyncHome = AsyncComponent(() => import('./Home'));

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={AsyncHome} exact />
        </Switch>
    );
}
Routes.displayName = 'Routes';
