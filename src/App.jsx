import AppRouter from "./router/AppRouter";
import "../src/assets/css/Style.css";
import { Provider } from 'react-redux';
import { store } from "./redux/store";
import "./i18n";
function App() {
  return (
    <>
     <Provider store={store}>
      <AppRouter />
      </Provider>
    </>
  );
}

export default App;
