import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import store, { customPersisor } from "./redux/userInfo/store.js";
import { CountRequestProvider } from "./contexts/CountRequestProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={customPersisor}>
        <BrowserRouter>
          <CountRequestProvider>
            <App />
          </CountRequestProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
