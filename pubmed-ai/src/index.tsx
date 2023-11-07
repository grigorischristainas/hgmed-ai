import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const queryClient = new QueryClient()

root.render(
    <QueryClientProvider client={queryClient}>
        <SkeletonTheme>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </SkeletonTheme>
    </QueryClientProvider>
)
