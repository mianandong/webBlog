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

    const consoleInfo = () => {
        console.log(JSON.stringify(info));
    }

    return (
        <div>
            <div>demo6</div>
            Parent, click times is {num}
            <button onClick={() => setNum(num + 1)}>+1</button>
            <Child info={info} consoleInfo={consoleInfo}></Child>
        </div>
    );
}