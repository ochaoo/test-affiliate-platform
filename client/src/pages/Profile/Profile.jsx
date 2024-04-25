import { useLocation } from 'react-router-dom'
import Aside from '../../components/Aside/Aside'
import { useDispatch } from 'react-redux'

import './style.scss'

const Profile = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    return (
        <div className="profile">
            <Aside />
            {/* <div className="auth-container">Profile</div> */}
        </div>
    )
}

export default Profile
