import { compile } from 'expression-eval'
import { useContext, useEffect, useRef, useState } from 'react'
import * as Tone from 'tone'
import ConfigContext from '../../ConfigContext'
import {
  invert,
  lerp,
  normalizedSin,
  normalizedSquare,
  normalizedStep,
  normalizedTriangle,
} from '../../functions'
import { getNoteFrequency } from '../../notes'
import ParseError from '../../ParseError'
import { ExpressionHookFunction } from '../../types'
import useAnimationFrame from '../../useAnimationFrame'

const useExpressionWithSound: ExpressionHookFunction = (
  expression,
  setExpression,
  variables
) => {
  const { volume } = useContext(ConfigContext)
  const [res, setRes] = useState(0)

  useAnimationFrame((_time) => {
    // Expression result is evaluated in Tone.loop below
    setRes(resRef.current)
  })

  const lastValidCompiled = useRef<(context: object) => any>(() => {
    return 0.5
  })
  const parseError = useRef<ParseError>(null)

  useEffect(() => {
    try {
      lastValidCompiled.current = compile(expression)
      parseError.current = null
    } catch (e) {
      parseError.current = e as ParseError
    }
  }, [expression])

  // #region AUDIO
  const resRef = useRef(0)

  // Frequency may change with the modification of global musical scale
  // May be optimized by setting up event+listener or passing note as explicit variable
  const frequency = getNoteFrequency(variables?.i || 0)
  useEffect(() => {
    osc.current = new Tone.Oscillator({
      frequency,
      type: 'sine',
      volume: -60,
      detune: Math.random() * 30 - 15,
    })
      .toDestination()
      .start()

    return () => {
      osc.current?.dispose()
    }
  }, [frequency])

  const osc = useRef<Tone.Oscillator | null>(null)
  useEffect(() => {
    const clamp = (x: number) => Math.max(Math.min(x, 1), -1)

    const loop = new Tone.Loop((time) => {
      const exprEvalRes = lastValidCompiled.current({
        time,
        t: time,
        sin: normalizedSin,
        tri: normalizedTriangle,
        sqr: normalizedSquare,
        stp: normalizedStep,
        inv: invert,
        ...variables,
      })
      resRef.current = typeof exprEvalRes === 'number' ? clamp(exprEvalRes) : 0 // evalast may return strings, functions, ...

      if (isNaN(resRef.current) || !osc.current || !volume) return
      const volumeTarget =
        resRef.current === 0
          ? -Infinity
          : lerp(-60, lerp(-60, -40, volume.current), Math.abs(resRef.current))

      if (osc.current) {
        osc.current.volume.rampTo(volumeTarget, 0.06, time)
        osc.current.type = resRef.current >= 0 ? 'sine' : 'square'
      }
    }, '0.03').start(0)

    return () => {
      osc.current?.dispose()
      loop.dispose()
    }
  }, [])
  // #endregion AUDIO

  return {
    res: Math.abs(res),
    error: parseError.current,
    instrumentName: 'expsyn',
  }
}

export default useExpressionWithSound
