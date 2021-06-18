import { memo } from "react";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo(() => {
    usePrintComponentState('Child');

    return (
        <div>
            Child
        </div>
    );}
);