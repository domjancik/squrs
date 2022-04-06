import ContentProps from '../../ContentProps'
import { cloneToAll, cloneToColumn, cloneToRow } from '../../events/clone'
import { MenuItem } from './menu'

function useCloneMenuItem({ variables, expression }: ContentProps): MenuItem {
  return {
    title: 'Clone expr',
    children: [
      {
        title: 'To All',
        action: () => cloneToAll(expression),
      },
      {
        title: 'To Row',
        action: () => cloneToRow(expression, variables?.y || 0),
      },
      {
        title: 'To Column',
        action: () => cloneToColumn(expression, variables?.x || 0),
      },
    ],
  }
}

export default useCloneMenuItem
