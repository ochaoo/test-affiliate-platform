import { useLocation, Link } from 'react-router-dom'
import {
    BRAND_REGISTRATION_ROUTE,
    BRAND_LOGIN_ROUTE,
    AFFILIATE_LOGIN_ROUTE,
    FORGOT_PASSWORD_ROUTE
} from '../../utils/constRoutes'
import SideAuth from '../../components/SideAuth/SideAuth'
import FooterAuth from '../../components/FooterAuth/FooterAuth'
import { Checkbox, Form, Input } from 'antd'
import OurButton from '../../components/Button/OurButton'

import './style.scss'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === BRAND_LOGIN_ROUTE || location.pathname === AFFILIATE_LOGIN_ROUTE
    const isBrand = location.pathname === BRAND_REGISTRATION_ROUTE || location.pathname === BRAND_LOGIN_ROUTE

    const onFinish = (values) => {
        values.role = isBrand ? 'brand' : 'affiliate'
        console.log('Received values of form: ', values)
    }

    return (
        <div className="auth">
            <div className="auth-container">
                <div className="auth-block">
                    <h2>{isLogin ? 'Login' : 'Registration'}</h2>
                    <hr className="line" />
                    <div className="input-wrapper">
                        <Form onFinish={onFinish}>
                            <p>Email</p>
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!'
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!'
                                    }
                                ]}
                            >
                                <Input style={{ borderRadius: '15px' }} placeholder="E-mail" size="large" />
                            </Form.Item>

                            <p>Password</p>
                            <Form.Item
                                name="password"
                                rules={[
                                    { required: true, message: 'Please input your Password!' },
                                    { min: 8, message: 'Password must be at least 8 characters' },
                                    { max: 20, message: 'Password must be less than 20 characters' }
                                ]}
                                style={{ marginBottom: '5px' }}
                            >
                                <Input.Password style={{ borderRadius: '15px' }} placeholder="Password" size="large" />
                            </Form.Item>

                            {isLogin && (
                                <div className="link">
                                    <a href={FORGOT_PASSWORD_ROUTE}>Forgot password?</a>
                                </div>
                            )}
                            <br />
                            <Checkbox style={{ marginBottom: '39px' }}>Remember me</Checkbox>

                            <Form.Item>
                                <OurButton variant={'primary'} htmltype="submit">
                                    {isLogin ? 'Login' : 'Registration'}
                                </OurButton>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <FooterAuth className="footer-auth" />
            </div>
            <SideAuth />
        </div>
    )
}

export default Auth
