import { memo } from "react";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo((props) => {
    usePrintComponentState('Child');

    return (
        <div>
            Child name : {props.info.name}, age: {props.info.age}
        </div>
    );}, (prev, next) => {
        if (prev.info.name === next.info.name &&
            prev.info.age === next.info.age) {
            return true;
        }
        return false;
    }
);