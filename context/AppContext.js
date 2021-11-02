import { createContext, useContext, useReducer, useMemo } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const AppReducer = (state, action) => {
  switch (action.type) {
    case "editMode":
      return action.payload;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, false);

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

  return (
    <AppDispatchContext.Provider value={dispatch}>
      <AppStateContext.Provider value={state}>
        {children}
      </AppStateContext.Provider>
    </AppDispatchContext.Provider>
  );
}

export const useAppState = () => useContext(AppStateContext);
export const useAppDispatch = () => useContext(AppDispatchContext);
