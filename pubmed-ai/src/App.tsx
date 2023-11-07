import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import { useLocalStorage } from '@uidotdev/usehooks'

function App() {
    const [token] = useLocalStorage('token')

    const routes = token
        ? [
              { path: '/home', element: <Home /> },
              { path: '*', element: <Navigate to="/home" replace /> },
          ]
        : [
              { path: '/login', element: <Login /> },
              { path: '*', element: <Navigate to="/login" replace /> },
          ]

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => (
                    <Route
                        path={route.path}
                        element={route.element}
                        key={route.path}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default App
