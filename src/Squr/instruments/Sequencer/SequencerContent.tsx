import React, { ReactElement } from 'react'
import Button from '../../../Button/Button'
import ContentProps from './../../ContentProps'

function SequencerToggle({ value, onClick, side, active }: { value: number, onClick: () => void, side: string | number, active: boolean }) {
    // const label = on ? '♥' : '🖤'

    let label = '🖤'
    if (value >= 0.25) label = '💔'
    if (value >= 0.5) label = '🧡'
    if (value >= 0.75) label = '💖'
    if (value >= 1) label = '💝'
    
    return <Button onClick={onClick} style={{width: side, height: side, background: active ? '#abc' : 'transparent'}}>{label}</Button>
}

function SequencerContent({res, expression, setExpression, side, extra}: ContentProps): ReactElement {
    // const steps = 8
    const currentStep = extra?.step || 0

    // TODO share with usesequencer
    const mappedSteps = expression.split(',').map(str => {
        const val = +str
        return isNaN(val) ? 0 : val
    })

    const steps = mappedSteps || [0]

    const setStep = (stepIndex: number, value: number) => {
        const updatedSteps = [...steps]
        updatedSteps[stepIndex] = value
        setExpression(updatedSteps.join(','))
    }

    const toggleSide =`calc(${side} / 4 - 5px)`
    const toggles = steps.map((step, index) => {
        return <SequencerToggle active={currentStep === index} side={toggleSide} key={index} value={step} onClick={() => setStep(index, (step + 0.25) % 1)} />
    })

    return (
        <div>
            {toggles}
        </div>
    )
}

export default SequencerContent
