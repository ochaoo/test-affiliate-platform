import OurButton from '../../components/Button/OurButton'
import { useNavigate } from 'react-router-dom'
import { MANAGER_REGISTRATION_ROUTE, BRAND_REGISTRATION_ROUTE, AFFILIATE_REGISTRATION_ROUTE } from '../../utils/constRoutes'

import './style.scss'

const Main = () => {
    const navigate = useNavigate()

    return (
        <div className="main-page">
            <h1>Links for convenience</h1>
            <OurButton variant={'primary'} onClick={() => navigate(MANAGER_REGISTRATION_ROUTE)}>
                Manager
            </OurButton>
            <OurButton variant={'primary'} onClick={() => navigate(BRAND_REGISTRATION_ROUTE)}>
                Brand
            </OurButton>
            <OurButton variant={'primary'} onClick={() => navigate(AFFILIATE_REGISTRATION_ROUTE)}>
                Affiliate
            </OurButton>
        </div>
    )
}

export default Main
