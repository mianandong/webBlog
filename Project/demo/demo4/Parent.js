import { useState } from "react";
import { Child } from "./Child";
import { usePrintComponentState } from "./usePrintComponentState";

export const Parent = () => {

    usePrintComponentState('Parent');
    const [num, setNum] = useState(0);

    const [info, setInfo] = useState({
        name: 'xuwei',
        age: 18,
        school: {
            address: 'xian'
        }
    })

    return (
        <div>
            <div>demo4</div>
            Parent, click times is {num}
            <button onClick={() => setNum(num + 1)}>+1</button>
            <Child info={{...info}}></Child>
        </div>
    );
}