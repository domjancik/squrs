import { useState } from "react"
import { ContentElement } from "../types"
import InstrumentSelection from "./InstrumentSelection"

function useFlipside(baseContent: ContentElement) {
    const [isFlipped, setIsFlipped] = useState(false)
    const handleFlip = () => {
        setIsFlipped((flipped) => !flipped)
    }

    const ContentComponent = isFlipped ? InstrumentSelection : baseContent

    return {
        handleFlip,
        ContentComponent
    }
}

export default useFlipside