import { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, message } from 'antd'
import type { Employee } from 'shared'
import { POSITION_LABELS } from '../../constants'

interface EmployeeUpsertModalProps {
  open: boolean
  editingRecord: Employee | null
  onClose: () => void
  onSuccess: () => void
}

export function EmployeeUpsertModal({
  open,
  editingRecord,
  onClose,
  onSuccess,
}: EmployeeUpsertModalProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      if (editingRecord) {
        form.setFieldsValue({
          fullName: editingRecord.fullName,
          position: editingRecord.position,
        })
      } else {
        form.resetFields()
      }
    }
  }, [open, editingRecord, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      const url = editingRecord
        ? 'http://localhost:3990/api/employees/edit'
        : 'http://localhost:3990/api/employees/create'

      const method = editingRecord ? 'PATCH' : 'POST'
      const body = editingRecord ? { ...values, id: editingRecord.id } : values

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        message.success(
          editingRecord ? 'Сотрудник обновлен' : 'Сотрудник успешно добавлен',
        )
        onSuccess()
        onClose()
      } else {
        throw new Error('Ошибка')
      }
    } catch (error) {
      console.error(error)
      message.error('Не удалось сохранить изменения')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={editingRecord ? 'Редактировать сотрудника' : 'Добавить сотрудника'}
      open={open}
      onOk={handleSubmit}
      onCancel={onClose}
      confirmLoading={loading}
      okText='Сохранить'
      cancelText='Отмена'
      centered
    >
      <Form form={form} layout='vertical' className='pt-4'>
        <Form.Item
          name='fullName'
          label='ФИО сотрудника'
          rules={[{ required: true, message: 'Введите ФИО' }]}
        >
          <Input placeholder='Иванов Иван Иванович' />
        </Form.Item>

        <Form.Item
          name='position'
          label='Должность'
          rules={[{ required: true, message: 'Выберите должность' }]}
        >
          <Select
            placeholder='Выберите должность'
            options={Object.entries(POSITION_LABELS).map(([value, label]) => ({
              value,
              label,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}
