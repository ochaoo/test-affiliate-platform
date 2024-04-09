import OurButton from '../../components/Button/OurButton'
import { Input, Form } from 'antd'
import { allowResetPassword } from '../../store/usersSlice'
import { useDispatch } from 'react-redux'

import './style.scss'

const ForgotPassword = () => {
    const dispatch = useDispatch()

    const onFinish = async (values) => {
        const allow = await dispatch(allowResetPassword(values.email))
    }

    return (
        <div className="forgot-password-page">
            <h3>Please enter your email address below and we'll send you a link to reset your password</h3>
            <Form name="login" onFinish={onFinish}>
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
                    <Input style={{ borderRadius: '15px', width: '300px' }} placeholder="E-mail" size="large" />
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

export default ForgotPassword
