import ParseError from "./ParseError";
import SqurProps from "./SqurProps";

interface ContentProps extends Omit<SqurProps, "ContentComponent" | "useExpressionHook"> {
    expression: string;
    setExpression: (val: string) => void;
    res: number
    fontColor: string
    error: ParseError
    instrumentName?: string
    extra?: {[key: string]: number}
}

export default ContentProps