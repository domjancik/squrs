import setExpression from './setExpression'

const safeInvoke = <T extends unknown>(f?: () => T) => (f ? f() : undefined)

/**
 * Emit an event that clones given expression to all Squrs
 *
 * @param expression
 * @param element Element to emit event on, will default to document
 */
const cloneToAll = (expression: string, element?: HTMLElement) => {
  setExpression(expression, undefined, element)
}

/**
 * Emit an event that clones given expression to specific column of squrs
 *
 * @param expression
 * @param column
 * @param element Element to emit event on, will default to document
 */
const cloneToColumn = (
  expression: string,
  column: number,
  element?: HTMLElement
) => {
  setExpression(expression, `x === ${column}`, element)
}

/**
 * Emit an event that clones given expression to specific row of squrs
 *
 * @param expression
 * @param row
 * @param element Element to emit event on, will default to document
 */
const cloneToRow = (expression: string, row: number, element?: HTMLElement) => {
  setExpression(expression, `y === ${row}`, element)
}

export { safeInvoke, cloneToAll, cloneToColumn, cloneToRow }
