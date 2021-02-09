import React, { ReactElement, useState } from 'react'
import useAnimationFrame from './useAnimationFrame'

interface Props {
    side?: number | string
}

const sqr = (side: number | string) => ({
    width: side,
    height: side
})

const com = (a: any[]) => a.map(e => e.toString()).join(',')

const dim = (val: number) => {
    const v = val * 255
    return {background: `rgb(${com([v, v, v])})`}
}

function Squr({side = 100}: Props): ReactElement {
    const [dimmer, setDimmer] = useState(.5)
    
    useAnimationFrame((time) => {setDimmer(state => (state + time / 1000) % 1)})

// TODO multiple preset animations
// TODO beat sync
// TODO rounded corners
// TODO expression evaluation
// TODO saving expression as preset
// TODO persisting presets
// TODO live sync of presets / selection (fbase realtime db?)
// TODO ...

    return (
        <div style={
            {
                ...sqr(side),
                ...dim(dimmer),
            }
        }>
            
        </div>
    )
}

export default Squr
