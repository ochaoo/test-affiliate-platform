import './style.scss'
import Avatar from '../../assets/img/user-avatar.svg'

const Profile = () => {
    return (
        <div className="profile">
            <div className="user">
                <img src={Avatar} alt="Avatar"></img>
                <div className="name">
                    <h1>Your Profile</h1>
                </div>
            </div>
        </div>
    )
}

export default Profile
