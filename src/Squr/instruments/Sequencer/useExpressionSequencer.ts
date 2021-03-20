import { ExpressionHookFunction } from "../../types";
import * as Tone from 'tone'
import { useEffect, useRef, useState } from "react";


const useExpressionSequencer: ExpressionHookFunction = (expression: string, variables?: { [key: string]: number }) => {
    const steps = useRef<number[]>([0])
    const [step, setStep] = useState(0)

    useEffect(() => {
        const mappedSteps = expression.split(',').map(str => {
            const val = +str
            return isNaN(val) ? 0 : val
        })

        steps.current = mappedSteps || [0]
    }, [expression])

    const [res, setRes] = useState(0)

    const noise = useRef<Tone.MembraneSynth | null>(null)
    useEffect(() => {
        noise.current = new Tone.MembraneSynth().toDestination()
        noise.current.volume.rampTo(-30, 0)

        const loopA = new Tone.Loop(time => {
            const stepIndex = Math.round(time * 4) % steps.current.length
            const currentStep = steps.current[stepIndex]
            setStep(stepIndex)
            
            const playing = currentStep >= Math.random()

            setRes(playing ? 0.5 : 0)
            // if (playing) noise.current?.start(time).stop("+32n");
            if (playing) noise.current?.triggerAttackRelease("C4", "32n");
        }, "8n").start(0);
        
        return () => {
            noise.current?.dispose()
            loopA.dispose()
        }
    }, [])

    return { res, error: null, instrumentName: 'sequencer', extra: {step} }

}

export default useExpressionSequencer