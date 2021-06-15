import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import appStore from './reducers/index';
import sagas from './sagas/sagas';
// import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    const store = createStore(
        appStore,
        applyMiddleware(
            sagaMiddleware
            //
            // ,logger
            //
        )
    );
    sagaMiddleware.run(sagas);
    return store;
}
