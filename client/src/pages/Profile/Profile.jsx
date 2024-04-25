import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './style.scss'

const Profile = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    return <div className="profile"></div>
}

export default Profile
