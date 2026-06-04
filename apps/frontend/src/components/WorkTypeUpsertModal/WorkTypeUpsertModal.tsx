import { useEffect, useState } from 'react'
import { Modal, Form, Input, Select, ColorPicker, message } from 'antd'
import type { WorkType } from 'shared'
import { UNIT_LABELS } from '../../constants'

interface WorkTypeUpsertModalProps {
  open: boolean
  editingRecord: WorkType | null
  onClose: () => void
  onSuccess: () => void
}

export function WorkTypeUpsertModal({
  open,
  editingRecord,
  onClose,
  onSuccess,
}: WorkTypeUpsertModalProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      if (editingRecord) {
        form.setFieldsValue({
          title: editingRecord.title,
          color: editingRecord.color,
          unit: editingRecord.unit,
        })
      } else {
        form.resetFields()
        form.setFieldValue('color', '#1677FF')
      }
    }
  }, [open, editingRecord, form])

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)

      const url = editingRecord
        ? 'http://localhost:3990/api/works-type/edit'
        : 'http://localhost:3990/api/works-type/create'

      const method = editingRecord ? 'PATCH' : 'POST'
      const body = editingRecord ? { ...values, id: editingRecord.id } : values

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        message.success(
          editingRecord
            ? 'Вид работы успешно обновлен'
            : 'Вид работы успешно создан',
        )
        onSuccess()
        onClose()
      } else {
        throw new Error('Ошибка при отправке запроса')
      }
    } catch (error) {
      console.error(error)
      message.error('Произошла ошибка при сохранении записи')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal
      title={editingRecord ? 'Редактировать вид работы' : 'Добавить вид работы'}
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
          name='title'
          label='Наименование типа работы'
          rules={[{ required: true, message: 'Введите наименование' }]}
        >
          <Input placeholder='Например: Разработка грунта' />
        </Form.Item>

        <Form.Item
          name='unit'
          label='Единица измерения'
          rules={[{ required: true, message: 'Выберите единицу измерения' }]}
        >
          <Select
            placeholder='Выберите единицу измерения'
            options={Object.entries(UNIT_LABELS).map(([value, label]) => ({
              value,
              label: `${label} (${value})`,
            }))}
          />
        </Form.Item>

        <Form.Item
          name='color'
          label='Цвет отображения'
          rules={[{ required: true, message: 'Выберите цвет' }]}
          getValueFromEvent={(color) =>
            typeof color === 'string' ? color : color.toHexString()
          }
        >
          <ColorPicker showText />
        </Form.Item>
      </Form>
    </Modal>
  )
}
