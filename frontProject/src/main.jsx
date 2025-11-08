import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import store, { customPersisor } from "./redux/userInfo/store.js";
function Root() {
  const [count, setCount] = useState(0);

  return (
    <CountRequest.Provider value={{ value: count, setCount }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={customPersisor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </CountRequest.Provider>
  );
}

createRoot(document.getElementById("root")).render(<Root />);

