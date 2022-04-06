import React, { ReactElement, useEffect } from 'react'
import ReactJson from 'react-json-view'

import 'firebase/database'
import { useDatabase, useDatabaseListData } from 'reactfire'

interface Props {}

function FirebaseTest({}: Props): ReactElement {
  const ref = useDatabase().ref('/test')

  useEffect(() => {
    ref.set([1, 2, 3])
    // ref.root.set('am cool')
    // ref.set({a: 'b', b: [1, 2, 3]})
  }, [])

  const { status, data } = useDatabaseListData(ref)
  return (
    <div style={{ background: 'white ' }}>
      FBasjdahdalkjshd
      {status === 'success' && <ReactJson src={data} />}
    </div>
  )
}

export default FirebaseTest
