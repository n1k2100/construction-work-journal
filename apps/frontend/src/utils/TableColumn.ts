import type { TableProps } from 'antd'

export const getRowNumberColumn = <T>(
  current: number,
  pageSize: number,
): NonNullable<TableProps<T>['columns']>[number] => ({
  title: '№',
  key: 'rowNumber',
  align: 'center',
  width: 60,
  render: (_, __, index) => index + 1 + (current - 1) * pageSize,
})
