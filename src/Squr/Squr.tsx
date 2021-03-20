/**
 *
 *       * ******* *
 *       *         *
 *       *   .5    *
 *       *         *
 *       * ******* *
 *
 */

//useAnimationFrame((time) => {setDimmer(state => (state + time / 1000) % 1)})

// TODO multiple preset animations
// TODO beat sync
// TODO rounded corners
// TODO expression evaluation
// TODO saving expression as preset
// TODO persisting presets
// TODO live sync of presets / selection (fbase realtime db?)
// TODO support 2x not just 2*x
// TODO input bg on focus
// TODO shared globals (exposed to users)
// TODO graph display
// TODO deterministic noise functions
// TODO splittable squrs
// TODO keyboard func ~ key.a / key('a') / variable for few special keys / gamepad
// TODO ...

import React, { ReactElement, useState } from "react"
import EmptySqur from "./EmptySqur"
import ExpressionContent from "./instruments/Expression/ExpressionContent"
import SqurProps from "./SqurProps"
import useExpressionWithSound from "./instruments/Expression/useExpressionWithSound"

// const COLOR = '#72dec2'
// const COLOR_RGB = '114, 222, 194'
// const COLOR_RGB = '255, 0, 255'
const COLOR_RGB = "170, 187, 204"

// const com = (a: any[]) => a.map(e => e.toString()).join(',')

// const dim = (val: number) => {
//     const v = val * 255
//     return {background: `rgb(${com([v, v, v])})`}
// }

const trns = (a: number) => ({ background: `rgba(${COLOR_RGB}, ${a})` })
const black = (a: number) => ({ background: `rgba(0,0,0, ${a})` })

function Squr({
  init,
  side = 100,
  expression: expressionExternal,
  setExpression: setExpressionExternal,
  variables = {},
  contentComponent = ExpressionContent,
  useExpressionHook = useExpressionWithSound
}: SqurProps): ReactElement {
  const [expressionInternal, setExpressionInternal] = useState(init || "0")
  const expression = expressionExternal ?? expressionInternal
  const setExpression = setExpressionExternal ?? setExpressionInternal

  const { res, error, instrumentName, extra } = useExpressionHook(expression, setExpression, variables)

  const fontColor = res < 0.5 ? "#abc" : "#444"
  const color = res > 0 ? trns(res) : black(-res)

  const ContentComponent = contentComponent

  return (
    <EmptySqur color={color} side={side}>
      <ContentComponent
        side={side}
        expression={expression}
        setExpression={setExpression}
        res={res}
        fontColor={fontColor}
        variables={variables}
        error={error}
        instrumentName={instrumentName}
        extra={extra}
      />
    </EmptySqur>
  )
}

export default Squr
