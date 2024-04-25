import { useLocation, useNavigate } from 'react-router-dom'
import { MANAGER_LOGIN_ROUTE, FORGOT_PASSWORD_ROUTE, MANAGER_PROFILE_ROUTE } from '../../utils/constRoutes'
import SideAuth from '../../components/SideAuth/SideAuth'
import FooterAuth from '../../components/FooterAuth/FooterAuth'
import { Checkbox, Form, Input } from 'antd'
import OurButton from '../../components/Button/OurButton'
import { registration, login } from '../../store/usersSlice'
import { useDispatch, useSelector } from 'react-redux'

import './style.scss'
import { useEffect } from 'react'

const ManagerAuth = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const isLogin = location.pathname === MANAGER_LOGIN_ROUTE

    const isAuth = useSelector((state) => state.users.isAuth)

    useEffect(() => {
        if (isAuth) navigate(MANAGER_PROFILE_ROUTE)
    }, [isAuth])
    const onFinish = async (values) => {
        if (isLogin) {
            return await dispatch(login({ email: values.email, password: values.password })).unwrap()
        }

        await dispatch(registration({ email: values.email, role: 'manager', password: values.password })).unwrap()
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

                            {!isLogin && (
                                <>
                                    <p>Confirm password</p>
                                    <Form.Item
                                        name="confirm"
                                        dependencies={['password']}
                                        hasFeedback
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please confirm your password!'
                                            },
                                            ({ getFieldValue }) => ({
                                                validator(_, value) {
                                                    if (!value || getFieldValue('password') === value) {
                                                        return Promise.resolve()
                                                    }
                                                    return Promise.reject(
                                                        new Error('The new password that you entered do not match!')
                                                    )
                                                }
                                            })
                                        ]}
                                    >
                                        <Input.Password style={{ borderRadius: '15px' }} placeholder="Password" size="large" />
                                    </Form.Item>
                                </>
                            )}

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

export default ManagerAuth
