import { Component, createContext } from "react";

export const AppContext = createContext();

export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'xuwei',
            age: 0,
            setName: this.setName,
            setAge: this.setAge
        }
    }

    setName = (name) => {
        this.setState({
            name
        });
    }

    setAge = (age) => {
        this.setState({
            age: age
        })
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        );
    }
}
