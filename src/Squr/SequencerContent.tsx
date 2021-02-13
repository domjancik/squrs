import React, { ReactElement } from 'react'
import ContentProps from './ContentProps'

function SequencerContent({res}: ContentProps): ReactElement {
    return (
        <div>
            🟦🟥🟧🟨🟩
            {res}
        </div>
    )
}

export default SequencerContent
