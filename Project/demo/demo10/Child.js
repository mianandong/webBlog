import { memo, useContext } from "react";
import { AppContext } from "./App";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo((props) => {
    usePrintComponentState('Child');

    // 通过useContext获取数据
    const { state, dispatch } = useContext(AppContext);

    return (
        <div>
            child get data from context: name: {state.name}
            <button onClick={() => {
                dispatch({
                    type: 'setAge',
                    data: {
                        age: Math.random()
                    }
                })
            }}>点我</button>
        </div>
    );}
);
