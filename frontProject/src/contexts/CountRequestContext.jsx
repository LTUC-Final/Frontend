import { createContext } from "react";

export const CountRequest = createContext({
  value: 0,
  reqItem: 0,
  setValue: () => {}
});
