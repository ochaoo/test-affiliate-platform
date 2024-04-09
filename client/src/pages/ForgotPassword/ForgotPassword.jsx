import OurButton from '../../components/Button/OurButton'
import { useNavigate } from 'react-router-dom'
import { Input, Form } from 'antd'

import './style.scss'

const ForgotPassword = () => {
    const onFinish = (values) => {
        console.log('Received values of form: ', values)
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
