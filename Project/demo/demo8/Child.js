import { memo } from "react";
import { usePrintComponentState } from "./usePrintComponentState";

export const Child = memo((props) => {
        usePrintComponentState('Child');
        return (
            <div>
                Child name : {props.info.name}, age: {props.info.age}
            </div>
        );
   }
);