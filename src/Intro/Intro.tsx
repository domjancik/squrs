/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement } from 'react'
import Button from '../Button/Button'


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
            <div><Button onClick={onClick}>□□ start □□</Button></div>
            <div>
                <small>gotta make you click to make sounds, aight, domj</small>
            </div>
        </div>
    )
}

export default Intro
