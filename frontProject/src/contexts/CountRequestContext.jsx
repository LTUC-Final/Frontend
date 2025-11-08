import { createContext } from "react";

const defaultValue = {
  value: 0,
  reqItem: 0
};

export const CountRequest = createContext(defaultValue);

// Provide a default Context.Provider value
CountRequest.defaultValue = defaultValue;
