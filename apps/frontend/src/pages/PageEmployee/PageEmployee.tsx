import { useMemo } from 'react'
import { Button, Space, type TableProps } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'

import { useTableCrud } from '../../hooks'
import { getRowNumberColumn } from '../../utils'
import { POSITION_LABELS, URL_API_EMPLOYEE } from '../../constants'
import { CrudTableLayout, EmployeeUpsertModal } from '../../components'

import type { Employee } from 'shared'

export function PageEmployee() {
  const tableState = useTableCrud<Employee>({
    fetchUrl: URL_API_EMPLOYEE.toString(),
    deleteUrl: new URL('delete', URL_API_EMPLOYEE).toString(),
  })

  const {
    current,
    pageSize,
    openDeleteModal,
    openUpsertModal,
    isUpsertModalOpen,
    editingRecord,
    closeUpsertModal,
    refresh,
  } = tableState

  const columns = useMemo<TableProps<Employee>['columns']>(
    () => [
      getRowNumberColumn<Employee>(current, pageSize),
      {
        key: 'fullName',
        align: 'center',
        title: 'ФИО',
        dataIndex: 'fullName',
      },
      {
        key: 'position',
        align: 'center',
        title: 'Должность',
        dataIndex: 'position',
        render: (pos: Employee['position']) => POSITION_LABELS[pos] || pos,
      },
      {
        title: 'Действия',
        align: 'center',
        render: (_, record) => (
          <Space>
            <Button
              type='primary'
              icon={<EditOutlined />}
              title='Редактировать'
              onClick={() => openUpsertModal(record)}
            />
            <Button
              danger
              type='primary'
              icon={<DeleteOutlined />}
              title='Удалить'
              onClick={() => openDeleteModal([record.id])}
            />
          </Space>
        ),
      },
    ],
    [current, pageSize, openUpsertModal, openDeleteModal],
  )

  return (
    <>
      <CrudTableLayout
        tableState={tableState}
        columns={columns}
        extraHeaderActions={
          <Button type='primary' onClick={() => openUpsertModal()}>
            Добавить работника
          </Button>
        }
      />
      <EmployeeUpsertModal
        open={isUpsertModalOpen}
        editingRecord={editingRecord}
        onClose={closeUpsertModal}
        onSuccess={refresh}
      />
    </>
  )
}
