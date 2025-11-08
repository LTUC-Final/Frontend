import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import store, { customPersisor } from "./redux/userInfo/store.js";

createRoot(document.getElementById("root")).render(
//  <StrictMode>
<CountRequest.Provider value={{ value: 0 }}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={customPersisor}>
        <BrowserRouter>
            <App />{" "}
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </CountRequest.Provider>
//  </StrictMode>
);
