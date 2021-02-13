import ParseError from "./ParseError";

interface ContentProps {
    expression: string
    setExpression: (val: string) => void
    res: number
    fontColor: string
    variables?: { [key: string]: number }
    error: ParseError
}

export default ContentProps