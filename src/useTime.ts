import { useState } from 'react'
import useAnimationFrame from './Squr/useAnimationFrame'

// TODO allow refing other times
// TODO time controls (reffable, context)
const useTime = (init: number = 0) => {
  const [time, setTime] = useState(init)
  useAnimationFrame((time) => setTime((ut) => ut + time / 1000))

  return time
}

export default useTime
