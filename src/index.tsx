import ReactDOM from 'react-dom';
import App from './components/app/App';
import '@fontsource/roboto';
import GlobalContext from './contexts/GlobalContext';

ReactDOM.render(
  // <React.StrictMode>
  <GlobalContext>
    <App />
  </GlobalContext>
  //   </React.StrictMode>
  ,
  document.getElementById('root')
);