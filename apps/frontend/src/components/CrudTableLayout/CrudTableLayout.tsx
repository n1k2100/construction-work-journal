import { useMemo, type ReactNode } from 'react'
import { Table, Button, Modal, type TableProps } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import type { useTableCrud } from '../../hooks'

interface CrudTableLayoutProps<T extends { id: React.Key }> {
  tableState: ReturnType<typeof useTableCrud<T>>
  columns: TableProps<T>['columns']
  extraHeaderActions?: ReactNode
  rowKey?: TableProps<T>['rowKey']
  tableClassName?: string
}

export function CrudTableLayout<T extends { id: React.Key }>({
  tableState,
  columns,
  extraHeaderActions,
  rowKey = (record) => record.id,
  tableClassName = 'w-full',
}: CrudTableLayoutProps<T>) {
  const {
    data,
    loading,
    total,
    current,
    pageSize,
    selectedRowKeys,
    setSelectedRowKeys,
    isDeleteModalOpen,
    idsToDelete,
    openDeleteModal,
    closeDeleteModal,
    handleDelete,
    handleTableChange,
  } = tableState

  const confirmMessage = useMemo(() => {
    if (idsToDelete.length > 1) {
      return `Вы действительно хотите удалить выбранные записи в количестве ${idsToDelete.length} шт.?`
    }
    return 'Вы действительно хотите удалить выбранную запись?'
  }, [idsToDelete])

  return (
    <div className='w-full h-full p-2 flex flex-col gap-2'>
      <div className='flex justify-between h-10 items-center'>
        <div className='flex gap-2 items-center'>
          {selectedRowKeys.length > 0 && (
            <Button
              type='primary'
              danger
              icon={<DeleteOutlined />}
              onClick={() => openDeleteModal(selectedRowKeys)}
            >
              Удалить выбранные ({selectedRowKeys.length})
            </Button>
          )}
        </div>
        {extraHeaderActions && (
          <div className='flex gap-2 items-center'>{extraHeaderActions}</div>
        )}
      </div>

      <div className='h-[80vh] overflow-auto border border-gray-100 rounded-lg'>
        <Table
          size='small'
          bordered
          sticky
          scroll={{ x: 'max-content' }}
          className={tableClassName}
          loading={loading}
          columns={columns}
          dataSource={data}
          rowKey={rowKey}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys) => setSelectedRowKeys(keys),
          }}
          pagination={{
            placement: ['bottomCenter'],
            current,
            pageSize,
            total,
            showSizeChanger: true,
          }}
          onChange={handleTableChange}
        />
      </div>

      <Modal
        title='Подтверждение удаления'
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText='Да, удалить'
        cancelText='Отмена'
        okButtonProps={{ danger: true }}
        centered
      >
        <p className='py-4 text-base'>{confirmMessage}</p>
      </Modal>
    </div>
  )
}
