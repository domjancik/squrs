import React, { ReactElement, ReactNode } from 'react'

interface Props {
    palette: { background: string }
    children: ReactNode
    side: number | string
}

const sqr = (side: number | string) => ({
    width: side,
    height: side
})

function EmptySqur({palette, children, side, onContextMenu, ...rest}: Props & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>): ReactElement {
    return (
        <div onContextMenu={onContextMenu} style={
            {
                ...{borderRadius: '0.5em', padding: '0.5em', boxSizing: 'border-box', boxShadow: 'inset 0em -.2em .5em #abc'},
                ...sqr(side),
                ...palette,
            }
        } {...rest}>
            {children}
        </div>
    )
}

export default EmptySqur
