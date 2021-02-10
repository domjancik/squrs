
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
// TODO ...


import React, { ReactElement, useContext, useRef, useState } from 'react'
import useAnimationFrame from './useAnimationFrame'

import { parse, eval as evalast /* avoiding eslint warn */ } from 'expression-eval'
import { TimeContext } from './TimeContext'


interface Props {
    side?: number | string
    /**
     * Initial expression
     */
    init?: string
}

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
    return { background: `rgba(255, 255, 255, ${a})`}
}

// TODO available in expr eval lib?
type ParseError = null | {
    index: number
    description: string
}

function Squr({init, side = 100}: Props): ReactElement {
    const time = useContext(TimeContext)
    const [uptime, setUptime] = useState(0)
    useAnimationFrame((time) => {setUptime(ut => ut + time / 1000)})

    const [expression, setExpression] = useState(init || '0')
    
    const lastValidAst = useRef(parse(''))
    const parseError = useRef<ParseError>(null)

    try {
        const ast = parse(expression)
        lastValidAst.current = ast
        parseError.current = null
    } catch(e) {
        parseError.current = e as ParseError
    }

    /**
     * Sin function normalized to 0-1 cycle input, 0-1 return
     */
    const normalizedSin = (x: number) => Math.sin(x * Math.PI * 2) / 2 + 0.5

    /**
     * input is period
     */
    // const timeSin = TODO


    const res = evalast(lastValidAst.current, {localTime: uptime, lt: uptime, local_time: uptime, uptime, time, t: time, sin: normalizedSin})

    return (
        <div style={
            {
                ...{borderRadius: '0.5em', padding: '1em', boxSizing: 'border-box', boxShadow: 'inset 0em -.2em .5em #abc'},
                ...sqr(side),
                ...trns(res),
            }
        }>
            <input
                style={{fontFamily: 'monospace', borderRadius: '0.3em', padding: '1em', boxSizing: 'border-box', border: 'none', width: '100%', boxShadow: 'inset 0em .2em .5em #abc'}}
                type="text" value={expression} onChange={e => setExpression(e.target.value)}
            />
            {parseError.current && <div style={{color: 'red'}}>{parseError.current.description}</div>}
        </div>
    )
}

export default Squr
