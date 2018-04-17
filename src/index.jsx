import { AppContainer } from 'react-hot-loader';
import App from './container/App.jsx';
const rootElement = document.getElementById('app-root');
AppContainer.displayName = 'App';
const render = (Component) => {
    ReactDOM.render(
        <AppContainer warnings={false}>
            <Component />
        </AppContainer>,
        rootElement
    );
};
render(App);
if (module.hot) {
    module.hot.accept('./container/App.jsx', () => render(App));
}