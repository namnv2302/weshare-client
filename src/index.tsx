import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from '@utils/i18next';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from '@components/GlobalStyles';
import { store } from 'redux/store';
import WebsocketProvider from 'context/WebsocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <WebsocketProvider>
      <Router>
        <I18nextProvider i18n={i18n}>
          <GlobalStyles>
            <App />
          </GlobalStyles>
        </I18nextProvider>
      </Router>
    </WebsocketProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
