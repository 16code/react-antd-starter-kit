import { AppContainer as RootContainer } from 'react-hot-loader';
import AppContainer from './containers/AppContainer';
import './utils/fetch';
import './styles/index.less';
const rootElement = document.getElementById('app-root');
const render = Component => {
    ReactDOM.render(
        <RootContainer warnings={false}>
            <Component />
        </RootContainer>,
        rootElement
    );
};
render(AppContainer);
if (__MOCK__ && module.hot) {
    module.hot.accept('./containers/AppContainer', () => render(AppContainer));
}
