const getAllCondition = () => 'true'
const getColumnCondition = (column: number) => `y === ${column}`
const getRowCondition = (row: number) => `x === ${row}`

export { getAllCondition, getColumnCondition, getRowCondition }
