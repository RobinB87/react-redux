import Bugs from "./components/Bugs";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

import "./App.css";

const store = configureStore();

function App() {
  return (
    // StoreContext.Provider to be able to access store in every component (also childs from bugs)
    <Provider store={store}>
      <Bugs />
    </Provider>
  );
}

export default App;
