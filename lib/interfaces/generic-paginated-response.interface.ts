import { Dispatch, SetStateAction } from 'react'
import { ApiMeta } from './api-meta.interface'

export default interface GenericPaginatedResponse<T> {
  items: T[]
  isLoading: boolean
  error?: string
  isLoadingMore: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
  goToNextPage: () => void
  goToPreviousPage: () => void
  changePage: (page: number) => void
  hasReachedEnd: boolean
  refetch: () => void
  handleRequest: (q: string) => void
  meta: ApiMeta
}
