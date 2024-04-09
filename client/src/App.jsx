import AppRouter from './AppRouter'
// import Header from './components/Header/Header'
import { useSelector } from 'react-redux'

const App = () => {
    const isAuth = useSelector((state) => state.users.isAuth)

    if (isAuth) {
        return (
            <>
                {/* <Header /> */}
                <AppRouter />
            </>
        )
    }

    return (
        <>
            <AppRouter />
        </>
    )
}

export default App
