import ParseError from "./ParseError";

interface ContentProps {
    expression: string
    side: number | string
    setExpression: (val: string) => void
    res: number
    fontColor: string
    variables?: { [key: string]: number }
    error: ParseError
    instrumentName?: string
    extra?: {[key: string]: number}
}

export default ContentProps