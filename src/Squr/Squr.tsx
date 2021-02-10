
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
// TODO ...








import React, { ReactElement, useContext, useState } from 'react'
import { setSyntheticTrailingComments } from 'typescript'
import useAnimationFrame from './useAnimationFrame'

import { parse, eval as evalast /* avoiding eslint warn */ } from 'expression-eval'
import { TimeContext } from './TimeContext'


interface Props {
    side?: number | string
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

function Squr({side = 100}: Props): ReactElement {
    const time = useContext(TimeContext)
    const [uptime, setUptime] = useState(0)
    useAnimationFrame((time) => {setUptime(ut => ut + time / 1000)})

    const [expression, setExpression] = useState('.5+t%1')

    const ast = parse(expression)
    const res = evalast(ast, {localTime: uptime, lt: uptime, local_time: uptime, uptime, time, t: time})

    return (
        <div style={
            {
                ...sqr(side),
                ...dim(res),
            }
        }>
            <input type="text" value={expression} onChange={e => setExpression(e.target.value)} />
        </div>
    )
}

export default Squr
