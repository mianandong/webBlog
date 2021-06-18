import { createContext, useReducer } from "react"

export const AppContext = createContext();

const global = {
    name: 'xuwei',
    age: 0
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setName":
            return {
                ...state,
                name: action.data.name
            }
        case "setAge":
            return {
                ...state,
                age: action.data.age
            }
        default:
            return state;
    }
}

export const App = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, global);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    );
}
