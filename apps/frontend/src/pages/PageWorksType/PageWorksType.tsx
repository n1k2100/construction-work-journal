import { useMemo } from 'react'
import { Button, Flex, Space, Tooltip, type TableProps } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import type { WorkType } from 'shared'
import { useTableCrud } from '../../hooks'
import { CrudTableLayout } from '../../components/CrudTableLayout/CrudTableLayout'
import { getRowNumberColumn } from '../../utils'
import { UNIT_LABELS } from '../../constants'
import { WorkTypeUpsertModal } from '../../components'

export function PageWorksType() {
  const tableState = useTableCrud<WorkType>({
    fetchUrl: 'http://localhost:3990/api/works-type',
    deleteUrl: 'http://localhost:3990/api/works-type/delete',
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
