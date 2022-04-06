/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement } from 'react'
import Button from '../Button/Button'
import ReactMarkdown from 'react-markdown'

const buttonNoticeMarkdown = `Hello Visitor.

For your safety no sounds will play until you press the button above.

Godspeed, *domj*`

const cssIntro = css`
  color: white;
  text-align: center;
`

const cssMargin = css`
  margin-top: 1em;
`

interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Intro({ onClick }: Props): ReactElement {
  return (
    <div css={cssIntro}>
      <h1>SQUR!</h1>
      <div>
        <Button onClick={onClick}>□□ start □□</Button>
      </div>
      <div css={cssMargin}>
        <small>
          <ReactMarkdown>{buttonNoticeMarkdown}</ReactMarkdown>
        </small>
      </div>
    </div>
  )
}

export default Intro
