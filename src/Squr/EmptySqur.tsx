import React, { ReactElement, ReactNode } from 'react'

interface Props {
    color: { background: string }
    children: ReactNode
    side: number | string
    onContextMenu?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const sqr = (side: number | string) => ({
    width: side,
    height: side
})

function EmptySqur({color, children, side, onContextMenu}: Props): ReactElement {
    return (
        <div onContextMenu={onContextMenu} style={
            {
                ...{borderRadius: '0.5em', padding: '0.5em', boxSizing: 'border-box', boxShadow: 'inset 0em -.2em .5em #abc'},
                ...sqr(side),
                ...color,
            }
        }>
            {children}
        </div>
    )
}

export default EmptySqur
