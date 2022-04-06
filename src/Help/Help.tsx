/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement, useState } from 'react'
import Button from '../Button/Button'

interface Props {}

const cssHelp = css`
  position: fixed;
  left: 2em;
  top: 2em;
`

const cssHelpContent = css`
  background: rgba(0, 0, 0, 0.5);
  color: #abc;
  border-radius: 0.5em;
  padding: 1em;
  pointer-events: none;
`

type HelpItem = {
  title: string
  value: string
}

const variables: HelpItem[] = [
  {
    title: 't',
    value: 'time in secs',
  },
  {
    title: 'i',
    value: 'index of squr - 0, 1, 2... use i1 for 1-indexed',
  },
  {
    title: 'x',
    value: 'x index of squr, use x1 for 1-indexed',
  },
  {
    title: 'y',
    value: 'y index of squr, use y1 for 1-indexed',
  },
]

const functions: HelpItem[] = [
  {
    title: 'sin(x)',
    value: 'sine with 0-1 cycle input and 0-1 output',
  },
  {
    title: 'tri(x)',
    value: 'triangle with 0-1 cycle input and 0-1 output',
  },
  {
    title: 'sqr(x, phase?)',
    value: 'square with 0-1 cycle input, optional phase',
  },
  {
    title: 'stp(x, a, b, c, ...)',
    value: 'step sequencer with 0-1 cycle input',
  },
]

const renderHelpItems = (items: HelpItem[]) => {
  const itemElements = items.map(({ title, value }) => (
    <li key={title + value}>
      <strong>{title}:</strong> {value}
    </li>
  ))
  return <ul>{itemElements}</ul>
}

function Help({}: Props): ReactElement {
  const [open, setOpen] = useState(false)

  const helpContent = (
    <div css={cssHelpContent}>
      <p>make the squrs sing and shine with math expressions and clicks</p>
      <p>all is syncd, tell friends</p>
      <p>RIGHT CLICK switches instruments</p>
      <h3>Variables</h3>
      {renderHelpItems(variables)}
      <h3>Functions</h3>
      {renderHelpItems(functions)}
    </div>
  )

  return (
    <div css={cssHelp}>
      <div>
        <Button onClick={() => setOpen((o) => !o)}>Help pls</Button>
      </div>
      {open && helpContent}
    </div>
  )
}

export default Help
