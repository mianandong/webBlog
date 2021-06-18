import { usePrintComponentState } from "./usePrintComponentState";

export const Child = () => {
    usePrintComponentState('Child');
    return (
        <div>
            Child
        </div>
    );
}