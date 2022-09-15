import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const { data, error, status } = useQuery(
    ['users', { page, limit }],
    async ({ queryKey }) => {
      // @ts-ignore
      const [_key, { limit, page }] = queryKey
      const response = await fetch(
        `http://localhost:3000/users?_page=${page}&_limit=${limit}`
      )

      if (response.status >= 400 && response.status < 500) {
        return Promise.reject({
          message: 'Client Error',
          status: response.status,
        })
      }

      if (response.status >= 500) {
        return Promise.reject({
          message: 'Servers Error',
          status: response.status,
        })
      }

      const data = await response.json()

      return Promise.resolve(data)
    }
  )
  return (
    <div className="">
      <h1>Dashboard</h1>

      {/* // TODO remove this
// @ts-ignore */}
      {status === 'error' && <h1>{error.message}</h1>}

      {status === 'loading' && <h1>Loading...</h1>}

      {status === 'success' && <pre>{JSON.stringify(data, undefined, 2)}</pre>}

      <button onClick={() => setPage(page + 1)}>Next</button>
      <button onClick={() => setPage(page - 1)}>Previous</button>
    </div>
  )
}
