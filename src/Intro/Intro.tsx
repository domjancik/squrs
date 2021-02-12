/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement } from 'react'

const cssSqur = css`
    border-radius: 0.5em;
    padding: 0.5em;
    box-sizing: border-box;
    box-shadow: inset 0em -.2em .5em #abc;
    background: transparent;
    color: #abc;
    border: none;
    transition: all 500ms;

    &:hover {
        box-shadow: inset 0em .2em .5em #abc;
    }
`

const cssIntro = css`
    color: white;
    text-align: center;
` 

interface Props {
    onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

function Intro({onClick}: Props): ReactElement {
    return (
        <div css={cssIntro}>
            <h1>SQUR!</h1>
            <div><button css={cssSqur} onClick={onClick}>□□ start □□</button></div>
            <div>
                <small>gotta make you click to make sounds, aight</small>
            </div>
        </div>
    )
}

export default Intro
