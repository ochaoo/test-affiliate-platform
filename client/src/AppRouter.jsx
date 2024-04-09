import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { authRoutes, publicRoutes } from './utils/routesComponents'
import { MAIN_ROUTE } from './utils/constRoutes'

const AppRouter = () => {
    const isAuth = useSelector((state) => state.users.isAuth)

    return (
        <Routes>
            {isAuth && authRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)}

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}

            <Route path="*" element={<Navigate to={MAIN_ROUTE} replace />} />
        </Routes>
    )
}

export default AppRouter
