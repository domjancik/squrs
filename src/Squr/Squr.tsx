
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


import React, { ReactElement, useContext, useRef, useState } from 'react'
import useAnimationFrame from './useAnimationFrame'

import { parse, eval as evalast /* avoiding eslint warn */ } from 'expression-eval'
import { TimeContext } from './TimeContext'
import SqurProps from './SqurProps'
import { normalizedSin, normalizedSquare, normalizedTriangle } from './functions'

// const COLOR = '#72dec2'
// const COLOR_RGB = '114, 222, 194'
// const COLOR_RGB = '255, 0, 255'
const COLOR_RGB = '170, 187, 204'

const sqr = (side: number | string) => ({
    width: side,
    height: side
})

const com = (a: any[]) => a.map(e => e.toString()).join(',')

const dim = (val: number) => {
    const v = val * 255
    return {background: `rgb(${com([v, v, v])})`}
}

const trns = (a: number) => {
    return { background: `rgba(${COLOR_RGB}, ${a})`}
}

// TODO available in expr eval lib?
type ParseError = null | {
    index: number
    description: string
}

function Squr({init, side = 100, expression: expressionExternal, setExpression: setExpressionExternal, variables = {}}: SqurProps   ): ReactElement {
    const time = useContext(TimeContext)
    const [uptime, setUptime] = useState(0)
    useAnimationFrame((time) => {setUptime(ut => ut + time / 1000)})

    const [expressionInternal, setExpressionInternal] = useState(init || '0')
    const expression = expressionExternal ?? expressionInternal
    const setExpression = setExpressionExternal ?? setExpressionInternal
    
    const lastValidAst = useRef(parse('0'))
    const parseError = useRef<ParseError>(null)

    try {
        const ast = parse(expression)
        lastValidAst.current = ast
        parseError.current = null
    } catch(e) {
        console.error(e)
        parseError.current = e as ParseError
    }

    


    const exprEvalRes = evalast(lastValidAst.current, {localTime: uptime, lt: uptime, local_time: uptime, uptime, time, t: time, sin: normalizedSin, tri: normalizedTriangle, sqr: normalizedSquare, ...variables})
    const res = typeof exprEvalRes === 'number' ? exprEvalRes : 0 // evalast may return strings, functions, ...

    const fontColor = res < 0.5 ? '#abc' : '#444'

    return (
        <div style={
            {
                ...{borderRadius: '0.5em', padding: '0.5em', boxSizing: 'border-box', boxShadow: 'inset 0em -.2em .5em #abc'},
                ...sqr(side),
                ...trns(res),
            }
        }>
            <input
                style={{fontFamily: 'monospace', borderRadius: '0.3em', padding: '0.5em', boxSizing: 'border-box', border: 'none', width: '100%', boxShadow: 'inset 0em .2em .5em #abc', background: 'transparent', color: fontColor, fontWeight: 'bold', transition: 'all 300ms'}}
                type="text" value={expression} onChange={e => setExpression(e.target.value)}
            />
            {parseError.current && <div style={{color: 'red'}}>{parseError.current.description}</div>}
        </div>
    )
}

export default Squr