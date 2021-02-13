import React, { ReactElement, useRef, useState } from 'react'
import useAnimationFrame from '../Squr/useAnimationFrame'

interface Props {
    value: number
}

function Visualizer({value}: Props): ReactElement {
    const values = useRef<number[]>(Array(30).fill(0))
    const [valuesState, setValuesState] = useState(values.current)

    const v = useRef(0)
    v.current = value

    useAnimationFrame(() => {
        values.current = values.current.slice(1, values.current.length)
        values.current.push(v.current)
        setValuesState(values.current)
    })

    const path = valuesState
        .map((val, index) => `L${index * 1} ${100 - (Math.abs(val) * 90 + 5)}`)
        .join(' ')

    return (
        <div style={{width: '100%'}}>
            <svg height="30" width="100%" viewBox="0 0 30 100" preserveAspectRatio="none">
                <path d={`M-5 0 ${path}`} strokeWidth="2" stroke="currentColor" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
        </div>
    )
}

export default Visualizer
