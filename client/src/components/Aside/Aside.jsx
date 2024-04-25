import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style.scss'

const Aside = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const divisions = [
        <div className="aside-container">Manager</div>,
        <div className="aside-container">Users</div>,
        <div className="aside-container">Offers</div>,
        <div className="aside-container">Balance</div>,
        <div className="aside-container">Technical Support</div>
    ]

    return <div className="aside">{divisions}</div>
}

export default Aside
