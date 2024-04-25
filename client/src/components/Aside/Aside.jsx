import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style.scss'

const Aside = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const divisions = []

    return (
        <div className="aside">
            {/* {divisions.map((division) => (
                <div className="auth-container"></div>
            ))} */}
        </div>
    )
}

export default Aside
