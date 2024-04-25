import AppRouter from './AppRouter'
import Aside from './components/Aside/Aside'
// import Header from './components/Header/Header'
import { useSelector } from 'react-redux'
import './app.scss'

const App = () => {
    const isAuth = useSelector((state) => state.users.isAuth)

    if (isAuth) {
        return (
            <div className="app">
                <Aside />
                {/* <Header /> */}
                <div className="page-container">
                    <AppRouter />
                </div>
            </div>
        )
    }

    return (
        <>
            <AppRouter />
        </>
    )
}

export default App
