import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo((props) => {
    usePrintComponentState('Child');

    const name = useSelector((state) => state.name);

    const dispatch = useDispatch();

    return (
        <div>
            child get data from context: name: {name}
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
