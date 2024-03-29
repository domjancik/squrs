import React from 'react'

const useAnimationFrame = (callback: (time: number) => void) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef<number>()
  const previousTimeRef = React.useRef<number>()

  const animate = (time: number) => {
    if (!!previousTimeRef.current) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }

  React.useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []) // Make sure the effect runs only once
}

export default useAnimationFrame
