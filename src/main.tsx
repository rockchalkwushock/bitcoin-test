import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './pages'
import Dashboard from './pages/dashboard'
import Registration from './pages/registration'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/registration',
        element: <Registration />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)
