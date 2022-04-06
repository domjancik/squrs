/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement, useState } from 'react'
import Button from '../Button/Button'
import ReactMarkdown from 'react-markdown'
import { helpTextMarkdown } from './helpContent'

const cssHelp = css`
  position: fixed;
  left: 2em;
  top: 2em;
  pointer-events: none;
`

const cssHelpContent = css`
  background: rgba(0, 0, 0, 0.5);
  color: #abc;
  border-radius: 0.5em;
  padding: 1em;
`

const cssHelpNavigation = css`
  pointer-events: all;
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

const PAGES = {
  intro: () => <ReactMarkdown>{helpTextMarkdown}</ReactMarkdown>,
  variables: () => (
    <>
      <h3>Variables</h3>
      {renderHelpItems(variables)}
    </>
  ),
  functions: () => (
    <>
      <h3>Functions</h3>
      {renderHelpItems(functions)}
    </>
  ),
} as const

type Page = keyof typeof PAGES

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

function ClosedHelpButtons({ setOpen }: { setOpen: SetState<boolean> }) {
  return <Button onClick={() => setOpen(true)}>What am I to do?</Button>
}

function OpenedHelpButtons({
  setOpen,
  setPage,
}: {
  setOpen: SetState<boolean>
  setPage: SetState<Page>
}) {
  return (
    <>
      <Button onClick={() => setPage('intro')}>Intro</Button>
      <Button onClick={() => setPage('functions')}>Functions</Button>
      <Button onClick={() => setPage('variables')}>Variables</Button>
      <Button onClick={() => setOpen(false)}>Got it!</Button>
    </>
  )
}

function Help(): ReactElement {
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState<Page>('intro')

  const helpContent = <div css={cssHelpContent}>{PAGES[page]()}</div>

  return (
    <div css={cssHelp}>
      <div css={cssHelpNavigation}>
        {open ? (
          <OpenedHelpButtons setOpen={setOpen} setPage={setPage} />
        ) : (
          <ClosedHelpButtons setOpen={setOpen} />
        )}
      </div>
      {open && helpContent}
    </div>
  )
}

export default Help
