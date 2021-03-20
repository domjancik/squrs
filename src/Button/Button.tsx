/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'

import React, { ReactElement } from 'react'

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    
}

const cssSqur = css`
    border-radius: 0.5em;
    padding: 0.5em;
    box-sizing: border-box;
    box-shadow: inset 0em -.2em .5em #abc;
    background: transparent;
    color: #abc;
    border: none;
    /* transition: all 100ms; */

    &:hover {
        box-shadow: inset 0em .2em .5em #abc;
    }
`

function Button({children, ...rest}: Props): ReactElement {
    return (
            <button css={cssSqur} {...rest}>{children}</button>
    )
}

export default Button
