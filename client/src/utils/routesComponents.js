import {
    MAIN_ROUTE,
    MANAGER_LOGIN_ROUTE,
    MANAGER_REGISTRATION_ROUTE,
    MANAGER_PROFILE_ROUTE,
    MANAGER_OFFERS_ROUTE,
    MANAGER_USERS_ROUTE,
    MANAGER_BALANCE_ROUTE,
    MANAGER_SUPPORT_ROUTE,
    MANAGER_PAYMENTS_ROUTE,
    BRAND_LOGIN_ROUTE,
    BRAND_REGISTRATION_ROUTE,
    BRAND_PROFILE_ROUTE,
    BRAND_OFFERS_ROUTE,
    BRAND_AFFILIATES_ROUTE,
    BRAND_SUPPORT_ROUTE,
    AFFILIATE_LOGIN_ROUTE,
    AFFILIATE_REGISTRATION_ROUTE,
    AFFILIATE_PROFILE_ROUTE,
    AFFILIATE_OFFERS_ROUTE,
    AFFILIATE_OFFERS_IN_THE_WORKS_ROUTE,
    AFFILIATE_SUPPORT_ROUTE,
    FORGOT_PASSWORD_ROUTE
} from './constRoutes'
import Main from '../pages/Main/Main'
import ManagerAuth from '../pages/ManagerAuth/ManagerAuth'
import Auth from '../pages/Auth/Auth'
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword'

export const authRoutes = [
    {
        // path: MY_WEDDING_ROUTE,
        // Component: MyWedding
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: MANAGER_REGISTRATION_ROUTE,
        Component: ManagerAuth
    },
    {
        path: MANAGER_LOGIN_ROUTE,
        Component: ManagerAuth
    },
    {
        path: AFFILIATE_REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: AFFILIATE_LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: BRAND_REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: BRAND_LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: FORGOT_PASSWORD_ROUTE,
        Component: ForgotPassword
    }
]
