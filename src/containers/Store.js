import { createStore, applyMiddleware, compose } from 'redux';
import rootReducers from '../ducks';

const middlewares = [];
if (__MOCK__) {
    const { createLogger } = require('redux-logger');
    const loggerMiddleware = createLogger({
        collapsed: true,
        timestamp: false,
        level: 'info'
    });
    middlewares.push(loggerMiddleware);
}
export default initialState => {
    return createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : fn => fn
        )
    );
};