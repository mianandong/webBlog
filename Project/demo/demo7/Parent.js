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

    // 任何时候都不修改
    const consoleInfo = useCallback(() => {
        console.log(JSON.stringify(info));
    }, []);

    // 当info改变时，重新生成consoleInfo
    // 当函数使用了哪个state，则第二个参数的数组中就要添加该state
    // const consoleInfo = useCallback(() => {
    //     console.log(JSON.stringify(info));
    // }, [info]);

    return (
        <div>
            <div>demo7</div>
            Parent, click times is {num}
            <button onClick={() => {
                setNum(num + 1);
                // setInfo({
                //     ...info,
                //     name: 'REA'
                // })
            }}>+1</button>
            <Child info={info} consoleInfo={consoleInfo}></Child>
        </div>
    );
}