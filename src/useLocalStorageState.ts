import { useEffect, useState } from 'react'

const getItem = (key: string, defaultItem: string) => {
  const item = window.localStorage.getItem(key)
  return item === null ? defaultItem : item
}

const setItem = (key: string, item: string) => {
  window.localStorage.setItem(key, item)
}

// TODO callback queue

function useLocalStorageState(
  key: string,
  defaultItem: string
): [string, (value: string) => void] {
  const [state, setState] = useState(() => getItem(key, defaultItem))
  // TODO polling update - sync between application instances
  useEffect(() => {
    const interval = setInterval(() => {
      const currentItem = getItem(key, defaultItem)
      if (state !== currentItem) {
        setState(currentItem)
      }
    }, 500)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultItem])

  const setStateAndPersist = (value: string) => {
    setState(value)
    setItem(key, value)
  }

  return [state, setStateAndPersist]
}

export default useLocalStorageState
