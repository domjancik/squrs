
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


import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react'
import useAnimationFrame from './useAnimationFrame'

import { parse, eval as evalast /* avoiding eslint warn */ } from 'expression-eval'
import { TimeContext } from './TimeContext'
import SqurProps from './SqurProps'
import { lerp, normalizedSin, normalizedSquare, normalizedStep, normalizedTriangle } from './functions'

import * as Tone from 'tone'

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

const black = (a: number) => {
    return { background: `rgba(0,0,0, ${a})`}
}

// TODO available in expr eval lib?
type ParseError = null | {
    index: number
    description: string
}

const notes = ['C', 'G', 'D', 'A', 'E']
const getNote = (i: number) => {
    const note = notes[i % notes.length]
    const octave = Math.floor(i / notes.length)
    return `${note}${octave + 2}`
}
// const getNote = (i: number) => `C${i}`
const getNoteFrequency = (i: number) => Tone.Frequency(getNote(i)).toFrequency()

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

    


    const exprEvalRes = evalast(lastValidAst.current, {localTime: uptime, lt: uptime, local_time: uptime, uptime, time, t: time, sin: normalizedSin, tri: normalizedTriangle, sqr: normalizedSquare, stp: normalizedStep, ...variables})
    const res = typeof exprEvalRes === 'number' ? exprEvalRes : 0 // evalast may return strings, functions, ...

    const fontColor = res < 0.5 ? '#abc' : '#444'

    // #region AUDIO

    // Trigger notes - didn't sound half bad
    const prevRes = useRef(res)
    const synth = useRef<Tone.Synth<Tone.SynthOptions> | null>(null)
    useEffect(() => {
        if (res - prevRes.current > 0.95) synth.current?.triggerAttackRelease(getNote(variables.i), "8n")
        prevRes.current = res
    }, [res])

    useEffect(() => {
        synth.current = new Tone.Synth().toDestination()
        return () => {
            synth.current?.disconnect().dispose()
        }
    }, [])

    const osc = useRef<Tone.Oscillator | null>(null)
    useEffect(() => {
        osc.current = new Tone.Oscillator({
            // frequency: 32 * Math.pow(2, variables.i),
            frequency: getNoteFrequency(variables.i),
            type: "sawtooth4",
            volume: -30,
            detune: Math.random() * 30 - 15,
        }).toDestination().start()
        return () => {
            osc.current?.disconnect().dispose()
        }
    }, [])

    useEffect(() => {
        if (isNaN(res)) return
        const volumeTarget = res === 0 ? -Infinity : lerp(-80, -20, res)
        osc.current?.volume.rampTo(volumeTarget, 0.01)
    }, [res])

    // #endregion

    const color = res > 0 ? trns(res) : black(-res)

    return (
        <div style={
            {
                ...{borderRadius: '0.5em', padding: '0.5em', boxSizing: 'border-box', boxShadow: 'inset 0em -.2em .5em #abc'},
                ...sqr(side),
                ...color,
            }
        }>
            <textarea
                style={{fontFamily: 'monospace', borderRadius: '0.3em', padding: '0.5em', boxSizing: 'border-box', border: 'none', width: '100%', boxShadow: 'inset 0em .2em .5em #abc', background: 'transparent', color: fontColor, fontWeight: 'bold', transition: 'all 300ms', maxWidth: '100%', minWidth: '100%', minHeight: '50%', maxHeight: '100%'}}
                value={expression} onChange={e => setExpression(e.target.value)}
            />
            {getNote(variables.i)}
            {parseError.current && <div style={{color: 'red'}}>{parseError.current.description}</div>}
        </div>
    )
}

export default Squr