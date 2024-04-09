import OurButton from '../../components/Button/OurButton'
import { Input, Form } from 'antd'
import { allowResetPassword } from '../../store/usersSlice'
import { useDispatch } from 'react-redux'

import './style.scss'

const ResetPassword = () => {
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        const allow = await dispatch(allowResetPassword(values.email))
    }

    return (
        <div className="forgot-password-page">
            <h3>Please enter your email address below and we'll send you a link to reset your password</h3>
            <Form onFinish={onFinish}>
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

                <Form.Item>
                    <OurButton variant={'primary'} htmltype="submit">
                        Send
                    </OurButton>
                </Form.Item>
            </Form>
        </div>
    )
}

export default ResetPassword
