import React from 'react'
import PersistentSqur from './PersistentSqur'
import { UsePersistenceHook } from './store/squrStore'

const makeSqurs = (
  resolution: number,
  room: string,
  usePersistenceHook: UsePersistenceHook
) => {
  const sqursPerRow = resolution
  const sqursPerCol = resolution

  const squrCount = sqursPerRow * sqursPerCol
  const sideSize = `${80 / sqursPerRow}vmin`

  const getXIndex = (index: number, perRow = sqursPerRow) => index % perRow
  const getYIndex = (index: number, perRow = sqursPerRow) =>
    Math.floor(index / perRow)
  const a = new Array(squrCount).fill(1)
  const squrs = a.map((_v, index) => {
    return (
      <PersistentSqur
        usePersistenceHook={usePersistenceHook}
        key={index}
        side={sideSize}
        storageKey={`/${room}/${index}`}
        variables={{
          i: index,
          i1: index + 1,
          x: getXIndex(index),
          x1: getXIndex(index) + 1,
          y: getYIndex(index),
          y1: getYIndex(index) + 1,
        }}
      />
    )
  })

  return {
    squrs,
    sideSize,
  }
}

export default makeSqurs
