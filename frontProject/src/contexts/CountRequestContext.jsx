import { createContext } from "react";

const defaultValue = {
  value: 0,
  setCount: () => {},
};

export const CountRequest = createContext(defaultValue);
