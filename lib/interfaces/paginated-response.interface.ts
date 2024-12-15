import { Dispatch, SetStateAction } from 'react'
import { ApiMeta } from './api-meta.interface'

export default interface PaginatedResponse<T> {
  changePage(page: number): void
  goToPreviousPage(): void
  items: T[]
  isLoading: boolean
  error?: string
  isLoadingMore: boolean
  page: number
  setPage: Dispatch<SetStateAction<number>>
  goToNextPage: () => void
  hasReachedEnd: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendRequest: (params?: any) => void
  refetch: () => void
  meta: ApiMeta
}
