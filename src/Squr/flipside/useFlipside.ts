import { useState } from 'react'
import { ContentElement } from '../types'
import MenuContent from './menu/MenuContent'

function useFlipside(baseContent: ContentElement) {
  const [isFlipped, setIsFlipped] = useState(false)
  const handleFlip = () => {
    setIsFlipped((flipped) => !flipped)
  }

  const ContentComponent = isFlipped ? MenuContent : baseContent

  return {
    handleFlip,
    ContentComponent,
  }
}

export default useFlipside
