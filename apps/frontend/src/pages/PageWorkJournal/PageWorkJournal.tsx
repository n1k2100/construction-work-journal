import { useMemo } from 'react'
import { Button, Space, Tag, type TableProps } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import type { Work } from 'shared'
import { useTableCrud } from '../../hooks'
import { CrudTableLayout, WorkUpsertModal } from '../../components'
import { getRowNumberColumn } from '../../utils'
import { POSITION_LABELS, UNIT_LABELS } from '../../constants'

export function PageWorkJournal() {
  const tableState = useTableCrud<Work>({
    fetchUrl: 'http://localhost:3990/api/works',
    deleteUrl: 'http://localhost:3990/api/works/delete',
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

  const columns = useMemo<TableProps<Work>['columns']>(
    () => [
      getRowNumberColumn<Work>(current, pageSize),
      {
        align: 'center',
        title: 'Тип работ',
        dataIndex: 'type',
        key: 'work',
        render: (type: Work['type']) => (
          <Tag
            color={type.color}
            className='whitespace-normal h-auto py-1 text-left leading-normal'
            style={{ whiteSpace: 'normal', height: 'auto' }}
          >
            {type.title}
          </Tag>
        ),
      },
      {
        align: 'center',
        title: 'Объем',
        key: 'volume',
        render: (_, record) => {
          const unit = UNIT_LABELS[record.type.unit] || record.type.unit
          return `${record.volume} ${unit}`
        },
      },
      {
        title: 'Исполнитель',
        children: [
          {
            align: 'center',
            title: 'Должность',
            dataIndex: ['employee', 'position'],
            key: 'position',
            render: (pos: Work['employee']['position']) =>
              POSITION_LABELS[pos] || pos,
          },
          {
            align: 'center',
            title: 'ФИО',
            dataIndex: ['employee', 'fullName'],
            key: 'fullName',
          },
        ],
      },
      {
        align: 'center',
        title: 'Дата выполнения',
        sorter: true,
        dataIndex: 'date',
        key: 'date',
        render: (v) => dayjs(v).format('DD.MM.YYYY'),
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
    [current, pageSize, openDeleteModal, openUpsertModal],
  )

  return (
    <>
      <CrudTableLayout
        tableState={tableState}
        columns={columns}
        extraHeaderActions={
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={() => openUpsertModal()}
          >
            Добавить работу
          </Button>
        }
      />
      <WorkUpsertModal
        open={isUpsertModalOpen}
        editingRecord={editingRecord}
        onClose={closeUpsertModal}
        onSuccess={refresh}
      />
    </>
  )
}
