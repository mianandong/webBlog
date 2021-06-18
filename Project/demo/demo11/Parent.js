import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Child } from "./Child";
import { usePrintComponentState } from "./usePrintComponentState";

export const Parent = () => {

    usePrintComponentState('Parent');
    const [num, setNum] = useState(0);

    // 通过useContext获取数据
    const age = useSelector((state) => state.age);

    const dispatch = useDispatch();

    return (
        <div>
            <div>demo11</div>
            Parent, click times is {num}
            <button onClick={() => {
                setNum(num + 1);
                dispatch({
                    type: 'setAge',
                    data: {
                        age: Math.random()
                    }
                })
            }}>+1</button>
            <div>parent get data from context: age:{age}</div>
            <Child></Child>
        </div>
    );
}
