import OurButton from '../../components/Button/OurButton'
import { useNavigate } from 'react-router-dom'
import {
    MANAGER_REGISTRATION_ROUTE,
    BRAND_REGISTRATION_ROUTE,
    AFFILIATE_REGISTRATION_ROUTE,
    MANAGER_LOGIN_ROUTE,
    AFFILIATE_LOGIN_ROUTE,
    BRAND_LOGIN_ROUTE
} from '../../utils/constRoutes'

import './style.scss'

const Main = () => {
    const navigate = useNavigate()

    return (
        <div className="main-page">
            <h1>Links for convenience</h1>
            <div className="but">
                <OurButton variant={'primary'} onClick={() => navigate(MANAGER_REGISTRATION_ROUTE)}>
                    Manager Registration
                </OurButton>
                <OurButton variant={'primary'} onClick={() => navigate(MANAGER_LOGIN_ROUTE)}>
                    Manager Login
                </OurButton>
            </div>
            <div className="but">
                <OurButton variant={'primary'} onClick={() => navigate(BRAND_REGISTRATION_ROUTE)}>
                    Brand Registration
                </OurButton>
                <OurButton variant={'primary'} onClick={() => navigate(BRAND_LOGIN_ROUTE)}>
                    Brand Login
                </OurButton>
            </div>
            <div className="but">
                <OurButton variant={'primary'} onClick={() => navigate(AFFILIATE_REGISTRATION_ROUTE)}>
                    Affiliate Registration
                </OurButton>
                <OurButton variant={'primary'} onClick={() => navigate(AFFILIATE_LOGIN_ROUTE)}>
                    Affiliate Login
                </OurButton>
            </div>
        </div>
    )
}

export default Main
