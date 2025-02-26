import { createContext, useContext, useReducer } from "react";

// Default state
const defaultState = {
  user: null,
};

// Initialize state with localStorage value if available
const getInitialState = () => {
  try {
    const storedUser = localStorage.getItem("blogPostQueryUser");
    return {
      ...defaultState,
      user: storedUser ? JSON.parse(storedUser) : null,
    };
  } catch (error) {
    console.error("Error parsing stored user:", error);
    return defaultState;
  }
};

// Create contexts
const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

// Reducer function
function userReducer(state, action) {
  switch (action.type) {
    case "setUser": {
      try {
        const userData = action.user;
        localStorage.setItem("blogPostQueryUser", JSON.stringify(userData));
        return {
          ...state,
          user: userData,
        };
      } catch (error) {
        console.error("Error setting user:", error);
        return state;
      }
    }
    case "clearUser": {
      try {
        localStorage.removeItem("blogPostQueryUser");
        return {
          ...state,
          user: null, // Fixed: explicitly set user to null instead of message
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
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, null, getInitialState);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

// Custom hooks
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export function useUserDispatch() {
  const context = useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}