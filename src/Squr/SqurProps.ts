import { ReactElement } from "react";
import ContentProps from "./ContentProps";
import { ExpressionHookFunction } from "./types";

interface SqurProps {
    expression?: string
    setExpression?: (val: string) => void //React.Dispatch<React.SetStateAction<string>>
    side?: number | string
    /**
     * Initial expression
     */
    init?: string
    variables?: { [key: string]: number }
    contentComponent?: (props: ContentProps) => ReactElement
    useExpressionHook?: ExpressionHookFunction
}

export default SqurProps