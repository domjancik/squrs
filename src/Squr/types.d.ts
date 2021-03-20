type ExpressionHookFunction = (
  expression: string,
  setExpression: (val: string) => void,
  variables?: { [key: string]: number }
) => {
  res: number;
  error: ParseError | null;
  instrumentName: string;
  extra?: { [key: string]: any };
};

export { ExpressionHookFunction };
