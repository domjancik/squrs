interface SqurProps {
    expression?: string
    setExpression?: (val: string) => void //React.Dispatch<React.SetStateAction<string>>
    side?: number | string
    /**
     * Initial expression
     */
    init?: string
    variables?: { [key: string]: number }
}

export default SqurProps