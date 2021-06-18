import { useContext, useState } from "react";
import { AppContext } from "./App";
import { Child } from "./Child";
import { usePrintComponentState } from "./usePrintComponentState";

export const Parent = () => {

    usePrintComponentState('Parent');
    const [num, setNum] = useState(0);

    // 通过useContext获取数据
    const { name, age, setAge } = useContext(AppContext);

    return (
        <div>
            <div>demo9</div>
            Parent, click times is {num}
            <button onClick={() => {
                setNum(num + 1);
                setAge(Math.random());
            }}>+1</button>
            <div>parent get data from context: name:{name}, age:{age}</div>
            <Child></Child>
        </div>
    );
}
