
import { compile, parse } from 'expression-eval'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import ConfigContext from '../../ConfigContext'
import { invert, lerp, normalizedSin, normalizedSquare, normalizedStep, normalizedTriangle } from '../../functions'
import { getNote, getNoteFrequency } from '../../notes'
import ParseError from '../../ParseError'
import { ExpressionHookFunction } from '../../types'
import useAnimationFrame from '../../useAnimationFrame'

const useExpressionWithSound: ExpressionHookFunction = (expression, setExpression, variables) => {
    const { volume } = useContext(ConfigContext)
    const [res, setRes] = useState(0)

    useAnimationFrame((_time) => {
        setRes(resRef.current)
    })
    
    // const lastValidAst = useRef(parse('0'))
    const lastValidCompiled = useRef<(context: object) => any>(() => {return 0.5})
    const parseError = useRef<ParseError>(null)

    useEffect(() => {
        try {
            // const ast = parse(expression)
            // lastValidAst.current = ast
            lastValidCompiled.current = compile(expression)
            parseError.current = null
        } catch(e) {
            parseError.current = e as ParseError
        }
    }, [expression])
    

    // #region AUDIO

    // const prevRes = useRef(0)
    const resRef = useRef(0)
    
    // Trigger notes - didn't sound half bad
    // const synth = useRef<Tone.Synth<Tone.SynthOptions> | null>(null)
    // useEffect(() => {
    //     synth.current = new Tone.Synth().toDestination()
    //     return () => {
    //         synth.current?.disconnect().dispose()
    //     }
    // }, [])

    useEffect(() => {
        osc.current = new Tone.Oscillator({
            // frequency: 32 * Math.pow(2, variables.i),
            frequency: getNoteFrequency(variables?.i || 0),
            type: "sine",
            // type: "square",
            volume: -60,
            detune: Math.random() * 30 - 15,
        }).toDestination().start()

        return () => {
            osc.current?.dispose()
        }
    }, [])
    
    const osc = useRef<Tone.Oscillator | null>(null)
    useEffect(() => {
        const clamp = (x: number) => Math.max(Math.min(x, 1), -1)

        const loop = new Tone.Loop(time => {
            // const exprEvalRes = evalast(lastValidAst.current, {time, t: time, sin: normalizedSin, tri: normalizedTriangle, sqr: normalizedSquare, stp: normalizedStep, inv: invert, ...variables})
            const exprEvalRes = lastValidCompiled.current({time, t: time, sin: normalizedSin, tri: normalizedTriangle, sqr: normalizedSquare, stp: normalizedStep, inv: invert, ...variables})
            resRef.current = typeof exprEvalRes === 'number' ? clamp(exprEvalRes) : 0 // evalast may return strings, functions, ...
            // resRef.current = Math.sin(time) / 2 + 0.5

            // if (resRef.current - prevRes.current > 0.95 && synth.current && volume) {
            //     synth.current.triggerAttackRelease(getNote(variables?.i || 0), "8n", time, volume.current)
            // }
            // prevRes.current = resRef.current

            if (isNaN(resRef.current) || !osc.current || !volume) return
            const volumeTarget = resRef.current === 0 ? -Infinity : lerp(-60, lerp(-60, -40, volume.current), Math.abs(resRef.current))
            
            osc.current.volume.rampTo(volumeTarget, 0.06, time)
            osc.current.type = resRef.current >= 0 ? 'sine' : 'square'
            
        }, "0.03").start(0);

        return () => {
            osc.current?.dispose()
            loop.dispose()
        }
    }, [])

    return { res: Math.abs(res), error: parseError.current, instrumentName: 'expsyn' }
}

export default useExpressionWithSound