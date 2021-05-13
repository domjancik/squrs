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

import { eval as evalExpr, parse } from 'expression-eval'

import React, { ReactElement, useEffect, useState } from "react"
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

// TODO toggle type information

// const handleTouch = <T extends unknown>(set: React.Dispatch<T>, off: T, on: T): {[key: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>]: Function} => ({
  const handleTouch = <T extends unknown>(current: T, set: React.Dispatch<T>, off: T, on: T) => ({
  // onTouchStart: () => set(on),
  onTouchStart: () => current === on ? set(off) : set(on),
  // onTouchStart: () => console.log(on),
  // onClick: () => console.log(on),
  // onTouchEnd: () => set(off),
  // onTouchEnd: () => console.log(off),
})

const safeInvoke = <T extends unknown>(f?: () => T) => f ? f() : undefined

type SetExpressionEventDetail = {
  expression: string
  condition?: string
}

const cloneToAll = (element: HTMLElement, expression: string) => {
  const event = new CustomEvent<SetExpressionEventDetail>('setExpression', {
    detail: {
        expression,
        // condition: 'x == 0',
        },
    bubbles: true
  })

  element.dispatchEvent(event)
}

const cloneToColumn = (element: HTMLElement, expression: string, column: number) => {
  const event = new CustomEvent<SetExpressionEventDetail>('setExpression', {
    detail: {
        expression,
        condition: `x === ${column}`,
        },
    bubbles: true
  })

  element.dispatchEvent(event)
}

function Squr({
  init,
  side = 100,
  expression: expressionExternal,
  setExpression: setExpressionExternal,
  variables = {},
  toggleInstrument,
  contentComponent = ExpressionContent,
  useExpressionHook = useExpressionWithSound,
}: SqurProps): ReactElement {
  const [expressionInternal, setExpressionInternal] = useState(init || "0")
  const expression = expressionExternal ?? expressionInternal
  const setExpression = setExpressionExternal ?? setExpressionInternal

  // TODO useTouch



  const { res: resBase, error, instrumentName, extra } = useExpressionHook(expression, setExpression, variables)
  const [touching, setTouching] = useState(0)

  const res = resBase
  const fontColor = res * touching < 0.5 ? "#abc" : "#444"
  const palette = res * touching > 0 ? trns(res) : black(-res)


  const ContentComponent = contentComponent

  // const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
  //   e.preventDefault()
  //   safeInvoke(toggleInstrument)  
  // }

  useEffect(() => {
    const listener = (e: Event) => {
      // TODO condition evaluation
      const setExpressionEvent = e as CustomEvent<SetExpressionEventDetail> 
      
      const { condition, expression } = setExpressionEvent.detail
      
      if (!condition || evalExpr(parse(condition), variables)) {
        setExpression(expression)
      }
    }
    window.addEventListener('setExpression', listener)

    return () => {
      window.removeEventListener('setExpression', listener)
    }
  }, [setExpression, variables])

  const handleContextMenu: React.MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    // TODO dispatch from current element -> forward ref on EmptySqur
    cloneToAll(document.body, expression)
    // cloneToColumn(document.body, expression, variables.x)
  }


  return (
    <EmptySqur
      palette={palette}
      side={side}
      onContextMenu={handleContextMenu}
      {...handleTouch(touching, setTouching, 0, 1)}
      >
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
