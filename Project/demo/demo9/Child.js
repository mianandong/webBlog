import { memo, useContext } from "react";
import { AppContext } from "./App";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo((props) => {
    usePrintComponentState('Child');

    // 通过useContext获取数据
    const { name } = useContext(AppContext);

    return (
        <div>
            child get data from context: name: {name}
        </div>
    );}
);
