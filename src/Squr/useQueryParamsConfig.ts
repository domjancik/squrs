import { useMemo } from 'react'
import { useFirebasePersistence, useLocalStoragePersistence } from './store'
import { UsePersistenceHook } from './store/squrStore'

const STORES: { [key: string]: UsePersistenceHook } = {
  firebase: useFirebasePersistence,
  local: useLocalStoragePersistence,
}

function useQueryParamsConfig() {
  // TODO update on change (MutationObserver, https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes)
  const search = window.location.search
  const params = useMemo(() => {
    const searchParams = new URLSearchParams(search)
    const storeParam = searchParams.get('store') || 'firebase'
    const store = STORES[storeParam] || useLocalStoragePersistence
    return {
      store,
      resolution: +(searchParams.get('resolution') || '4'),
      room: searchParams.get('room') || 'squrs',
    }
  }, [search])

  return params
}

export default useQueryParamsConfig
