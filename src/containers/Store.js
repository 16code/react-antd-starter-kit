import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducers from '../reducers';
import rootSagas from '../sagas';

const sagaMiddleware = createSagaMiddleware(rootSagas);
const middlewares = [sagaMiddleware];

if (__MOCK__) {
    const { createLogger } = require('redux-logger');
    const loggerMiddleware = createLogger({
        collapsed: true,
        timestamp: false,
        level: 'info'
    });
    middlewares.push(loggerMiddleware);
}

const store = ((initialState) => {
    const s = createStore(
        rootReducers,
        initialState,
        compose(
            applyMiddleware(...middlewares),
            window.devToolsExtension ? window.devToolsExtension() : fn => fn
        )
    );
    sagaMiddleware.run(rootSagas);
    return s;
})();
export { store };
