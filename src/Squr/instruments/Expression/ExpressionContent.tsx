/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { pipe } from 'fp-ts/lib/function'
import { collect } from 'fp-ts/lib/Record'
import React, { ReactElement } from 'react'
import Visualizer from '../../../Visualizer/Visualizer'
import ContentProps from '../../ContentProps'
import { getNote } from '../../notes'

const renderVariables = (variables: {[key: string]: number}) => {
    return pipe(
        variables,
        collect((key, value) => <span><strong> {key}:</strong>{value}</span>)
    )
}

const cssExtra = css`
    opacity: 0.3;
    transition: all 500ms;
    &:hover {
        opacity: 1;
    }
`

function ExpressionContent({expression, setExpression, res, fontColor, variables, error, instrumentName}: ContentProps): ReactElement {
    return (
        <>
            <textarea
                style={{fontFamily: 'monospace', borderRadius: '0.3em', padding: '0.5em', boxSizing: 'border-box', border: 'none', width: '100%', boxShadow: 'inset 0em .2em .5em #abc', background: 'transparent', color: fontColor, fontWeight: 'bold', transition: 'all 300ms', maxWidth: '100%', minWidth: '100%', minHeight: '50%', maxHeight: '100%'}}
                value={expression} onChange={e => setExpression(e.target.value)}
            />
            <div css={cssExtra} style={{color: fontColor}}>
                <Visualizer value={res} />
                <div>
                {getNote(variables?.i || 0)}
                {renderVariables(variables || {})}
                </div>
                
                <div style={{color: fontColor, fontSize: '2em'}}>{instrumentName}</div>
            </div>
            {error && <div style={{color: 'red'}}>{error.description}</div>}
        </>
    )
}

export default ExpressionContent
