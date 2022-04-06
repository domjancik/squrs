import React, { useState } from 'react'
import Button from '../../../Button/Button'
import ContentProps from '../../ContentProps'
import useInstrumentMenuItem from './uesInstrumentMenuItem'
import { MenuItem } from './menu'
import useCloneMenuItem from './useCloneMenuItem'

function MenuContent(props: ContentProps) {
  // Index based path in menu
  const [path, setPath] = useState<number[]>([])

  const menu = [useInstrumentMenuItem(props), useCloneMenuItem(props)]

  const selectedMenu = path.reduce((subMenu, index) => {
    const selectedSubMenu = subMenu[index]
    if (selectedSubMenu.children) {
      return selectedSubMenu.children
    }
    return subMenu
  }, menu)

  const handleMenuItemClick = (menuItem: MenuItem, index: number) => () => {
    if (menuItem.children) {
      setPath((path) => [...path, index])
      return
    }

    if (menuItem.action) {
      menuItem.action()
      return
    }
  }

  return selectedMenu.map((menuItem, index) => (
    <Button key={menuItem.title} onClick={handleMenuItemClick(menuItem, index)}>
      {menuItem.title}
    </Button>
  ))
}

export default MenuContent
