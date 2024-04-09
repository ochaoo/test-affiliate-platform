import { useSelector } from 'react-redux'

import './style.scss'

const Sidebar = () => {
    const isAuth = useSelector((state) => state.users.isAuth)

    return <></>
}

export default Sidebar
