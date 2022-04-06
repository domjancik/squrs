import React, { ReactElement } from 'react'
import Button from '../../../Button/Button'
import ContentProps from './../../ContentProps'

const ACTIVE_COLOR = '#abc'
const INACTIVE_BG_COLOR = 'transparent'
const INACTIVE_FG_COLOR = ACTIVE_COLOR
const ACTIVE_FG_COLOR = 'black'
const INACTIVE_FG_WHENON_COLOR = 'rgba(0,0,0,0.1)'

function SequencerToggle({
  res,
  value,
  onClick,
  side,
  active,
}: {
  res: number
  value: number
  onClick: () => void
  side: string | number
  active: boolean
}) {
  let label = '0'
  if (value >= 0.5) label = '?'
  if (value >= 1) label = '!'

  const bg = active ? ACTIVE_COLOR : INACTIVE_BG_COLOR
  const inactiveFg = res > 0.5 ? INACTIVE_FG_WHENON_COLOR : INACTIVE_FG_COLOR
  const fg = active ? ACTIVE_FG_COLOR : inactiveFg

  return (
    <Button
      onClick={onClick}
      style={{
        width: side,
        height: side,
        background: bg,
        color: fg,
        borderRadius: '100%',
      }}
    >
      {label}
    </Button>
  )
}

function SequencerContent({
  res,
  expression,
  setExpression,
  side,
  extra,
}: ContentProps): ReactElement {
  const currentStep = extra?.step || 0

  // TODO share with usesequencer
  const mappedSteps = expression.split(',').map((str) => {
    const val = +str
    return isNaN(val) ? 0 : val
  })

  const steps = mappedSteps || [0]

  const setStep = (stepIndex: number, value: number) => {
    const updatedSteps = [...steps]
    updatedSteps[stepIndex] = value
    setExpression(updatedSteps.join(','))
  }

  const toggleStep = (stepIndex: number) => {
    const step = steps[stepIndex]
    setStep(stepIndex, (step + 0.5) % 1.5)
  }

  const toggleSide = `calc(${side} / 4 - 5px)`
  const toggles = steps.map((step, index) => {
    return (
      <SequencerToggle
        res={res}
        active={currentStep === index}
        side={toggleSide}
        key={index}
        value={step}
        onClick={() => toggleStep(index)}
      />
    )
  })

  return <div style={{ textAlign: 'center' }}>{toggles}</div>
}

export default SequencerContent
