
import { eval as evalast /* avoiding eslint warn */, parse } from 'expression-eval'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import ConfigContext from './ConfigContext'
import { invert, lerp, normalizedSin, normalizedSquare, normalizedStep, normalizedTriangle } from './functions'
import { getNote, getNoteFrequency } from './notes'
import ParseError from './ParseError'
import { TimeContext } from './TimeContext'
import useAnimationFrame from './useAnimationFrame'






function useExpressionWithSound(expression: string, variables?: { [key: string]: number }) {
    const time = useContext(TimeContext)
    const { volume } = useContext(ConfigContext)

    const [uptime, setUptime] = useState(0)
    useAnimationFrame((time) => {setUptime(ut => ut + time / 1000)})

    
    
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
            synth.current.triggerAttackRelease(getNote(variables?.i || 0), "8n", undefined, volume.current)
        }
        prevRes.current = res
    }, [res])

    const osc = useRef<Tone.Oscillator | null>(null)
    useEffect(() => {
        osc.current = new Tone.Oscillator({
            // frequency: 32 * Math.pow(2, variables.i),
            frequency: getNoteFrequency(variables?.i || 0),
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
        const volumeTarget = res === 0 ? -Infinity : lerp(-30, lerp(-30, 15, volume.current), Math.abs(res))
        
        osc.current.volume.rampTo(volumeTarget, 0.01)
        osc.current.type = res > 0 ? 'sine' : 'square'
    }, [res])

    return { res, parseError: parseError.current }
}

export default useExpressionWithSound