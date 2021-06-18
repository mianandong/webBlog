import { useEffect, useRef } from "react"

export const usePrintComponentState = (name) => {
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