import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import ReduxThunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, createStore} from 'redux';
import {rootReducer} from './redux/reducers/rootReducer'

const store = createStore(
    rootReducer,
    applyMiddleware(ReduxThunk)
);

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
