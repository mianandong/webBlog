import { useCallback, useState } from "react";
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

    const [notUsed, setNotUsed] = useState(0);

    return (
        <div>
            <div>demo8</div>
            Parent, click times is {num}
            <button onClick={() => {
                setNum(num + 1);
                setNotUsed(Math.random);
            }}>+1</button>
            <Child info={info} not={notUsed}></Child>
        </div>
    );
}