import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/index';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
let persistor = persistStore(store);


ReactDOM.render(

    <Provider store={store}>
        <BrowserRouter>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
