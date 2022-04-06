import { ExpressionHookFunction } from '../../types'
import * as Tone from 'tone'
import { useEffect, useRef, useState } from 'react'
import { getNote } from '../../notes'

const useExpressionSequencer: ExpressionHookFunction = (
  expression,
  setExpression,
  variables
) => {
  const steps = useRef<number[]>([0])
  const [step, setStep] = useState(0)

  useEffect(() => {
    const mappedSteps = expression.split(',').map((str) => {
      const val = +str
      return isNaN(val) ? 0 : val
    })

    steps.current = mappedSteps || [0]
    if (steps.current.length < 16) {
      setExpression('0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0')
    }
  }, [expression, setExpression])

  const [res, setRes] = useState(0)

  const synth = useRef<Tone.Synth | null>(null)
  useEffect(() => {
    synth.current = new Tone.Synth().toDestination()
    synth.current.volume.rampTo(-30, 0)

    const loopA = new Tone.Loop((time) => {
      const stepIndex = Math.round(time * 4) % steps.current.length
      const currentStep = steps.current[stepIndex]
      setStep(stepIndex)

      const playing = currentStep >= Math.random()

      setRes(playing ? 1 : 0)
      // if (playing) synth.current?.start(time).stop("+32n");
      if (playing)
        synth.current?.triggerAttackRelease(
          getNote(variables?.i || 0),
          '8n',
          time
        )
    }, '8n').start(0)

    return () => {
      synth.current?.dispose()
      loopA.dispose()
    }
  }, [])

  return { res, error: null, instrumentName: 'sequencer', extra: { step } }
}

export default useExpressionSequencer
