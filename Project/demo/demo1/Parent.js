import { useState } from "react";
import { Child } from "./Child";
import { usePrintComponentState } from "./usePrintComponentState";

export const Parent = () => {

    usePrintComponentState('Parent');
    const [num, setNum] = useState(0);

    return (
        <div>
            <div>demo1</div>
            Parent, click times is {num}
            <button onClick={() => setNum(num + 1)}>+1</button>
            <Child></Child>
        </div>
    );
}