import type { FilterValue } from 'antd/es/table/interface'
import type { TablePaginationConfig } from 'antd/lib/table'
import { useState, useEffect, useCallback } from 'react'

type Sorter = {
  field: string
  order: 'asc' | 'desc' | 'ascend'
}

type OrderBy = Record<string, 'asc' | 'desc'>

function appendNestedParams(
  params: URLSearchParams,
  prefix: string,
  value: object,
) {
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, val]) => {
      appendNestedParams(params, `${prefix}[${key}]`, val)
    })
  } else {
    params.append(prefix, String(value))
  }
}

function buildOrderBy(field: string | string[], order: 'asc' | 'desc') {
  if (Array.isArray(field)) {
    return field.reduceRight((acc, key, index) => {
      if (index === field.length - 1) {
        return { [key]: order } as OrderBy
      }
      return { [key]: acc } as unknown as OrderBy
    }, {} as OrderBy)
  }
  return { [field]: order } as Record<string, 'asc' | 'desc'>
}

interface UseTableCrudOptions {
  fetchUrl: string
  deleteUrl?: string
}

export function useTableCrud<T extends { id: React.Key }>({
  fetchUrl,
  deleteUrl,
}: UseTableCrudOptions) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [idsToDelete, setIdsToDelete] = useState<React.Key[]>([])

  const [isUpsertModalOpen, setIsUpsertModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState<T | null>(null)

  const [orderBy, setOrderBy] = useState<OrderBy | undefined>(undefined)

  const loadData = useCallback(
    (page: number, size: number) => {
      const skip = (page - 1) * size
      const take = size

      const url = new URL(fetchUrl, window.location.origin)
      url.searchParams.append('skip', String(skip))
      url.searchParams.append('take', String(take))

      if (orderBy) {
        appendNestedParams(url.searchParams, 'orderBy', orderBy)
      }

      fetch(url.toString())
        .then((response) => response.json())
        .then((resData) => {
          if (resData && typeof resData === 'object' && 'data' in resData) {
            setData(resData.data)
            setTotal(resData.total ?? 0)
          } else if (Array.isArray(resData)) {
            setData(resData)
            setTotal(resData.length)
          }
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [fetchUrl, orderBy],
  )

  useEffect(() => {
    loadData(current, pageSize)
  }, [current, pageSize, orderBy, loadData])

  const handleTableChange = useCallback(
    (
      pagination: TablePaginationConfig,
      _fields: Record<string, FilterValue | null>,
      sorter: Sorter,
    ) => {
      setLoading(true)

      if (pagination.current && pagination.pageSize) {
        setCurrent(pagination.current)
        setPageSize(pagination.pageSize)
        setSelectedRowKeys([])
      }

      if (sorter && sorter.field && sorter.order) {
        const order = sorter.order === 'ascend' ? 'asc' : 'desc'
        const orderObj = buildOrderBy(sorter.field, order)
        setOrderBy(orderObj)
      } else {
        setOrderBy(undefined)
      }
    },
    [],
  )

  const openDeleteModal = useCallback((ids: React.Key[]) => {
    setIdsToDelete(ids)
    setIsDeleteModalOpen(true)
  }, [])

  const closeDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false)
    setIdsToDelete([])
  }, [])

  const handleDelete = useCallback(() => {
    if (!deleteUrl || idsToDelete.length === 0) return

    setLoading(true)
    setIsDeleteModalOpen(false)

    fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ids: idsToDelete }),
    })
      .then((response) => {
        if (response.ok) {
          setSelectedRowKeys((prev) =>
            prev.filter((key) => !idsToDelete.includes(key)),
          )
          loadData(current, pageSize)
        } else {
          console.error('Не удалось удалить записи')
          setLoading(false)
        }
      })
      .catch((error) => {
        console.error('Ошибка при удалении:', error)
        setLoading(false)
      })
      .finally(() => {
        setIdsToDelete([])
      })
  }, [deleteUrl, idsToDelete, current, pageSize, loadData])

  const openUpsertModal = useCallback((record?: T) => {
    setEditingRecord(record || null)
    setIsUpsertModalOpen(true)
  }, [])

  const closeUpsertModal = useCallback(() => {
    setEditingRecord(null)
    setIsUpsertModalOpen(false)
  }, [])

  const refresh = useCallback(() => {
    setLoading(true)
    loadData(current, pageSize)
  }, [current, pageSize, loadData])

  return {
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
    isUpsertModalOpen,
    editingRecord,
    openUpsertModal,
    closeUpsertModal,
    refresh,
  }
}
