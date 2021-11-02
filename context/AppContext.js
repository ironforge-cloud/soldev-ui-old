import { createContext, useContext, useReducer, useMemo } from "react";

const AppStateContext = createContext();
const AppDispatchContext = createContext();

function AppReducer(state, action) {
  switch (action.type) {
    case "editMode":
      if (window) window.sessionStorage.setItem("editMode", action.payload);
      return {
        ...state,
        editMode: action.payload,
      };
    case "vertical":
      if (window) window.sessionStorage.setItem("vertical", action.payload);
      return {
        ...state,
        vertical: action.payload,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function AppWrapper({ children }) {
  const [state, dispatch] = useReducer(AppReducer, {
    editMode: false,
    vertical: "Solana",
  });

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

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
