// src/main.jsx

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App.jsx";
import "./index.css";
import store, { customPersisor } from "./redux/userInfo/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={customPersisor}>
        <BrowserRouter>
          <App />{" "}
        </BrowserRouter>
      </PersistGate>
    </Provider>{" "}
  </StrictMode>
);