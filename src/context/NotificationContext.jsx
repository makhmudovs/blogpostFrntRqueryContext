import { createContext, useContext, useReducer } from "react";

// Default state
const defaultState = {
  message: "",
  messageType: "info",
};

// Initialize state with localStorage value if available
const getInitialState = () => {
  try {
    return {
      ...defaultState,
    };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return defaultState;
  }
};

// Create contexts
const NotificationContext = createContext(undefined);
const NotificationDispatchContext = createContext(undefined);

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case "setMessage": {
      try {
        return {
          ...state,
          message: action.message,
          messageType: action.messageType,
        };
      } catch (error) {
        console.error("Error setting user:", error);
        return state;
      }
    }
    case "clearMessage": {
      try {
        return {
          ...state,
          message: "",
          messageType: "info",
        };
      } catch (error) {
        console.error("Error clearing user:", error);
        return state;
      }
    }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Provider component
// eslint-disable-next-line react/prop-types
export function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, null, getInitialState);

  return (
    <NotificationContext.Provider value={state}>
      <NotificationDispatchContext.Provider value={dispatch}>
        {children}
      </NotificationDispatchContext.Provider>
    </NotificationContext.Provider>
  );
}

// Custom hooks
export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useNotificationDispatch() {
  const context = useContext(NotificationDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}
