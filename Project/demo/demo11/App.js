import { Provider } from "react-redux";
import { createStore } from "redux";

const global = {
    name: 'xuwei',
    age: 0
}

const reducer = (state = global, action) => {
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

const store = createStore(reducer);

export const App = ({ children }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}
