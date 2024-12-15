import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { useApi } from '../../contexts/Api'
import { ApiMeta } from '../../lib/interfaces/api-meta.interface'
import GenericPaginatedResponse from '../../lib/interfaces/generic-paginated-response.interface'

/**
 * Hook to process api get requests in a paginated manner
 * will handle state management of request while request is being made
 * @author Lynda
 * @version 1.0
 */
function usePaginatedQuery<T>(): GenericPaginatedResponse<T> {
  /** Api request states */
  const api = useApi() // api context value
  const [query, setQuery] = useState<string>() // query hook
  const [error, setError] = useState<string>() // on error hook
  const [page, setPage] = useState<number>(1) // page hook used for paging requests
  const [isLoading, setIsLoading] = useState<boolean>(false) // on loading hook
  const [canFetch, setCanFetch] = useState<boolean>(false) // hook to set if api can fetch more data
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false) // hook when api loading more data
  const [hasReachedEnd, setHasReachedEnd] = useState<boolean>(false) // hook when no more data is available
  const [items, setItems] = useState<T[]>([]) // hook for array of items/data retrieved
  const [meta, setMeta] = useState<ApiMeta>({
    currentPage: 0,
    itemCount: 0,
    itemsPerPage: 0,
    totalItems: 0,
    totalPages: 1,
  }) // hook for api pagination metadata

  const handleRequest = (q: string): void => {
    setPage(1)
    setQuery(q)
    setCanFetch(true)
    fetchData({ handleLoading: setIsLoading, pageNo: 1, q })
  }

  /**
   * Increments page hook state to go to next of the api
   */
  const goToNextPage = (): void => {
    if (canFetch) {
      setPage((p) => {
        fetchData({ handleLoading: setIsLoading, pageNo: p + 1 })
        return p + 1
      })
    }
  }
  const goToPreviousPage = (): void => {
    if (canFetch) {
      setPage((p) => {
        fetchData({ handleLoading: setIsLoading, pageNo: p - 1 })
        return p - 1
      })
    }
  }
  const changePage = (page: number): void => {
    setPage((p) => {
      p = page
      fetchData({ handleLoading: setIsLoadingMore, pageNo: p })
      return p
    })
  }

  /**
   * Resets page hook state to 1 to get 1st page from api
   */
  const refetch = (): void => {
    setPage(0)
  }

  const fetchData = useCallback(
    async ({
      handleLoading,
      pageNo,
      q,
    }: {
      handleLoading: Dispatch<SetStateAction<boolean>>
      pageNo?: number
      q?: string
    }) => {
      handleLoading(true)
      try {
        const response = await api.instance.get(`${q || query}&page=${pageNo}`)
        handleLoading(false)

        const responseData: [] = response?.data?.payload?.data
        const responseMeta: ApiMeta = response?.data?.payload?.meta

        setMeta((prevMeta) => {
          prevMeta = responseMeta
          return prevMeta
        })
        if (pageNo !== undefined && pageNo > 1) {
          setItems(() => {
            return [...responseData]
          })
        } else {
          setItems(responseData)
        }
      } catch (e) {
        // Set request state as ended and failed
        const error = e?.response?.data?.message || e?.message || e
        handleLoading(false)
        setError(error)
      }
    },
    [api, query],
  )

  /**
   * Checks if current page is last page
   * to notify hook that api can not fetch more items
   */
  useEffect(() => {
    if (page >= meta?.totalPages) {
      setCanFetch(false)
    }
  }, [meta, page])

  /**
   * Checks if current page is last page
   * to notify hook that api has reached end of items
   */
  useEffect(() => {
    if (page >= meta?.totalPages) {
      setHasReachedEnd(true)
    }
  }, [meta, page])

  /**
   * Checks if page is not undefined
   * to notify hook that api can fetch and has not reached end
   */
  useEffect(() => {
    if (page) {
      setCanFetch(true)
      setHasReachedEnd(false)
    }
  }, [page])

  /**
   * Hook to process api request
   * Handles on loading, on successful request & on error
   */
  // useEffect(() => {
  //   if (canFetch) {
  //     fetchData();
  //   }
  // }, [api, canFetch, fetchData, handleLoading, page, query]);

  return {
    items,
    isLoading,
    error,
    isLoadingMore,
    page,
    setPage,
    goToNextPage,
    goToPreviousPage,
    changePage,
    hasReachedEnd,
    refetch,
    handleRequest,
    meta,
  }
}

export default usePaginatedQuery
