type ExpressionHookFunction = (expression: string, variables?: { [key: string]: number }) => { res: number, error: ParseError | null, instrumentName: string}

export { ExpressionHookFunction }