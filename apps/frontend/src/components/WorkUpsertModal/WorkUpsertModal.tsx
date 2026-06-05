import { useEffect, useState } from 'react'
import {
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Select,
  message,
  Space,
} from 'antd'
import dayjs from 'dayjs'

import {
  UNIT_LABELS,
  URL_API_EMPLOYEE,
  URL_API_WORKS,
  URL_API_WORKS_TYPE,
} from '../../constants'

import type { Work, Employee, WorkType } from 'shared'

interface WorkUpsertModalProps {
  open: boolean
  editingRecord: Work | null
  onClose: () => void
  onSuccess: () => void
}

export function WorkUpsertModal({
  open,
  editingRecord,
  onClose,
  onSuccess,
}: WorkUpsertModalProps) {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<Employee[]>([])
  const [workTypes, setWorkTypes] = useState<WorkType[]>([])
  const selectedTypeId = Form.useWatch('typeId', form)
  const selectedWorkType = workTypes.find((type) => type.id === selectedTypeId)
  const unitLabel = selectedWorkType
    ? UNIT_LABELS[selectedWorkType.unit] || selectedWorkType.unit
    : null

  useEffect(() => {
    if (!open) return

    Promise.all([
      fetch(new URL('?take=1000', URL_API_EMPLOYEE)).then((r) => r.json()),
      fetch(new URL('?take=1000', URL_API_WORKS_TYPE)).then((r) => r.json()),
    ])
      .then(([empRes, typeRes]) => {
        setEmployees(empRes.data || [])
        setWorkTypes(typeRes.data || [])
      })
      .catch((err) => {
        console.error('Ошибка загрузки справочников:', err)
        message.error('Не удалось загрузить списки сотрудников или типов работ')
      })
  }, [open])

  useEffect(() => {
    if (open) {
      if (editingRecord) {
        form.setFieldsValue({
          date: dayjs(editingRecord.date),
          employeeId: editingRecord.employee.id,
          typeId: editingRecord.type.id,
          volume: editingRecord.volume,
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

      const payload = {
        ...values,
        date: values.date.toISOString(),
      }

      const url = new URL(
        editingRecord ? 'edit' : 'create',
        URL_API_WORKS,
      ).toString()

      const method = editingRecord ? 'PATCH' : 'POST'
      const body = editingRecord
        ? { ...payload, id: editingRecord.id }
        : payload

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        message.success(
          editingRecord ? 'Запись успешно обновлена' : 'Запись успешно создана',
        )
        onSuccess()
        onClose()
      } else {
        throw new Error('Ошибка сохранения')
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
      title={
        editingRecord ? 'Редактировать работу' : 'Добавить запись о работе'
      }
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
          name='date'
          label='Дата выполнения'
          rules={[{ required: true, message: 'Выберите дату' }]}
        >
          <DatePicker className='w-full' format='DD.MM.YYYY' />
        </Form.Item>

        <Form.Item
          name='employeeId'
          label='Исполнитель'
          rules={[{ required: true, message: 'Выберите исполнителя' }]}
        >
          <Select
            placeholder='Выберите сотрудника'
            showSearch
            optionFilterProp='label'
            options={employees.map((emp) => ({
              value: emp.id,
              label: emp.fullName,
            }))}
          />
        </Form.Item>

        <Form.Item
          name='typeId'
          label='Тип работ'
          rules={[{ required: true, message: 'Выберите тип работ' }]}
        >
          <Select
            placeholder='Выберите тип работ'
            showSearch={{
              optionFilterProp: 'label',
            }}
            options={workTypes.map((t) => ({
              value: t.id,
              label: t.title,
            }))}
          />
        </Form.Item>

        <Form.Item label='Объем работ'>
          <Space.Compact className='w-full'>
            {unitLabel && <Space.Addon>{unitLabel}</Space.Addon>}
            <Form.Item
              name='volume'
              noStyle
              rules={[{ required: true, message: 'Введите объем' }]}
            >
              <InputNumber min={0} className='w-full' placeholder='0' />
            </Form.Item>
          </Space.Compact>
        </Form.Item>
      </Form>
    </Modal>
  )
}
