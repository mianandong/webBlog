import { useEffect, useRef } from "react"

export const usePrintComponentState = (name) => {
    // 使用useRef定义类似class组件中的对象属性
    const isMount = useRef(true);

    useEffect(() => {
        if (isMount.current) {
            console.log(`${name} component did mount....`);
            isMount.current = false;
        } else {
            console.log(`${name} component did update...`);
        }
    })
}