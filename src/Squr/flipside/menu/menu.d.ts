type MenuItem = {
  title: string
  action?: () => void
  children?: MenuItem[]
}

export { MenuItem }
