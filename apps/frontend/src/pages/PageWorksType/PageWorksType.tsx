import { useMemo } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Flex, Space, Tooltip, type TableProps } from 'antd'

import { useTableCrud } from '../../hooks'
import { getRowNumberColumn } from '../../utils'
import { UNIT_LABELS, URL_API_WORKS_TYPE } from '../../constants'
import { CrudTableLayout, WorkTypeUpsertModal } from '../../components'

import type { WorkType } from 'shared'

export function PageWorksType() {
  const tableState = useTableCrud<WorkType>({
    fetchUrl: URL_API_WORKS_TYPE.toString(),
    deleteUrl: new URL('delete', URL_API_WORKS_TYPE).toString(),
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

  const columns = useMemo<TableProps<WorkType>['columns']>(
    () => [
      getRowNumberColumn<WorkType>(current, pageSize),
      {
        key: 'title',
        dataIndex: 'title',
        title: 'Наименование',
        align: 'center',
      },
      {
        key: 'unit',
        dataIndex: 'unit',
        title: 'Единицы измерения',
        align: 'center',
        render: (value: keyof typeof UNIT_LABELS) => UNIT_LABELS[value],
      },
      {
        key: 'color',
        dataIndex: 'color',
        title: 'Цвет',
        align: 'center',
        render: (value: string) => (
          <Tooltip title={value}>
            <Flex align='center' justify='center'>
              <div
                className={`w-2.5 h-2.5`}
                style={{ backgroundColor: `#${value}` }}
              ></div>
            </Flex>
          </Tooltip>
        ),
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
            Добавить вид работы
          </Button>
        }
      />
      <WorkTypeUpsertModal
        open={isUpsertModalOpen}
        editingRecord={editingRecord}
        onClose={closeUpsertModal}
        onSuccess={refresh}
      />
    </>
  )
}
