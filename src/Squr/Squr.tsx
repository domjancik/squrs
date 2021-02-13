/** @jsxImportSource @emotion/react */

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
import { lerp, normalizedSin, normalizedSquare, normalizedStep, normalizedTriangle, invert } from './functions'

import * as Tone from 'tone'
import Visualizer from '../Visualizer/Visualizer'
import { collect } from 'fp-ts/lib/Record'
import { pipe } from 'fp-ts/lib/function'

import { css } from '@emotion/react'
import ConfigContext from './ConfigContext'

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

// const notes = ['C', 'G', 'D', 'A', 'E']
// const notes = ['C', 'D', 'E', 'A', 'G']

const C = 'C'
const D = 'D'
const E = 'E'
const Eb = 'Eb'
const F = 'F'
const G = 'G'
const A = 'A'
const Ab = 'Ab'
const B = 'B'
const Bb = 'Bb'

const SCALE_5_MAJOR_PENTATONIC = [C, D, E, G, A]
const SCALE_5_EGYPTIAN_SUSPENDED = [C, D, F, G, Bb]
// const SCALE_5_BLUES_MINOR_MAN_GONG = [C, Eb, F, Ab, Bb, C]
const SCALE_5_BLUES_MINOR_MAN_GONG = [C, Eb, F, Ab, Bb]
const SCALE_5_BLUES_MAJOR_RITSUSEN = [C, D, F, G, A]
const SCALE_5_MINOR_PENTATONIC = [C, Eb, F, G, Bb]
const notes = SCALE_5_EGYPTIAN_SUSPENDED

const getNote = (i: number) => {
    const note = notes[i % notes.length]
    const octave = Math.floor(i / notes.length)
    return `${note}${octave + 2}`
}
// const getNote = (i: number) => `C${i}`
const getNoteFrequency = (i: number) => Tone.Frequency(getNote(i)).toFrequency()

const renderVariables = (variables: {[key: string]: number}) => {
    return pipe(
        variables,
        collect((key, value) => <span><strong> {key}:</strong>{value}</span>)
    )
}

const cssExtra = css`
    opacity: 0.3;
    transition: all 500ms;
    &:hover {
        opacity: 1;
    }
`

function Squr({init, side = 100, expression: expressionExternal, setExpression: setExpressionExternal, variables = {}}: SqurProps   ): ReactElement {
    const time = useContext(TimeContext)
    const { volume } = useContext(ConfigContext)

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
        parseError.current = e as ParseError
    }

    


    const exprEvalRes = evalast(lastValidAst.current, {localTime: uptime, lt: uptime, local_time: uptime, uptime, time, t: time, sin: normalizedSin, tri: normalizedTriangle, sqr: normalizedSquare, stp: normalizedStep, inv: invert, ...variables})
    const clamp = (x: number) => Math.max(Math.min(x, 1), -1)
    const res = typeof exprEvalRes === 'number' ? clamp(exprEvalRes) : 0 // evalast may return strings, functions, ...

    const fontColor = res < 0.5 ? '#abc' : '#444'

    // #region AUDIO

    // Trigger notes - didn't sound half bad
    const prevRes = useRef(res)
    const synth = useRef<Tone.Synth<Tone.SynthOptions> | null>(null)

    useEffect(() => {
        synth.current = new Tone.Synth().toDestination()
        return () => {
            synth.current?.disconnect().dispose()
        }
    }, [])
    
    useEffect(() => {
        if (res - prevRes.current > 0.95 && synth.current && volume) {
            synth.current.triggerAttackRelease(getNote(variables.i), "8n", undefined, volume.current)
        }
        prevRes.current = res
    }, [res])

    const osc = useRef<Tone.Oscillator | null>(null)
    useEffect(() => {
        osc.current = new Tone.Oscillator({
            // frequency: 32 * Math.pow(2, variables.i),
            frequency: getNoteFrequency(variables.i),
            type: "sine",
            // type: "square",
            volume: -30,
            detune: Math.random() * 30 - 15,
        }).toDestination().start()
        return () => {
            osc.current?.disconnect().dispose()
        }
    }, [])

    useEffect(() => {
        if (isNaN(res) || !osc.current || !volume) return
        const volumeTarget = res === 0 ? -Infinity : lerp(-80, lerp(-30, 15, volume.current), Math.abs(res))
        
        osc.current.volume.rampTo(volumeTarget, 0.01)
        osc.current.type = res > 0 ? 'sine' : 'square'
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
            <div css={cssExtra} style={{color: fontColor}}>
                <Visualizer value={res} />
                <div>
                {getNote(variables.i)}
                {renderVariables(variables)}
                </div>
            </div>
            {parseError.current && <div style={{color: 'red'}}>{parseError.current.description}</div>}
        </div>
    )
}

export default Squr