import { ExpressionHookFunction } from "./types";
import * as Tone from 'tone'
import { useEffect, useRef, useState } from "react";


const useExpressionSequencer: ExpressionHookFunction = (expression: string, variables?: { [key: string]: number }) => {
    const steps = useRef<number[]>([0])

    useEffect(() => {
        const mappedSteps = expression.split(',').map(str => {
            const val = +str
            return isNaN(val) ? 0 : val
        })

        steps.current = mappedSteps || [0]
    }, [expression])

    const [res, setRes] = useState(0)

    const noise = useRef<Tone.Noise | null>(null)
    useEffect(() => {
        noise.current = new Tone.Noise("white").toDestination()
        noise.current.volume.rampTo(-20, 0)

        const loopA = new Tone.Loop(time => {
            const currentStep = steps.current[Math.round(time * 4) % steps.current.length]
            
            const playing = currentStep >= Math.random()

            setRes(playing ? 1 : 0)
            if (playing) noise.current?.start(time).stop("+32n");
        }, "8n").start(0);
        
        return () => {
            noise.current?.dispose()
            loopA.dispose()
        }
    }, [])

    return { res, error: null, instrumentName: 'sequencer' }

}

export default useExpressionSequencer