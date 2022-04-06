import { SetExpressionEventDetail } from './SetExpressionEventDetail'

const SET_EXPRESSION_EVENT_NAME = 'setExpression'

const createSetExpressionEvent = (
  expression: string,
  condition?: string,
  bubbles = true
) =>
  new CustomEvent<SetExpressionEventDetail>(SET_EXPRESSION_EVENT_NAME, {
    detail: {
      expression,
      condition,
    },
    bubbles: true,
  })

const setExpression = (
  expression: string,
  condition?: string,
  element?: HTMLElement
) => {
  const event = createSetExpressionEvent(expression, condition)

  const dispatchElement = element ?? document

  dispatchElement.dispatchEvent(event)
}

export default setExpression
